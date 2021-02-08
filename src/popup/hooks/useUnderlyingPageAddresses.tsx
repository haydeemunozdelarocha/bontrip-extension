import {useCallback, useEffect, useState} from "react";
import {BrowserService} from "../../services/BrowserService";
import {Logger} from "../../tools/Logger";

interface UnderlyingPageAddressProps {
    placeName: string;
}

export const useUnderlyingPageAddresses = ({placeName}: UnderlyingPageAddressProps) => {
    const [headings, setHeadings] = useState<string[]>([]);

    useEffect(() => {
        Logger.log('placeName?????', placeName);
        // const getSiblings = function (elem: HTMLElement, condition: any) {
        //     if (!elem || !elem.parentNode) {
        //         return;
        //     }
        //     // Setup siblings array and get the first sibling
        //     const siblings = [];
        //     const sibling = elem.parentNode.firstChild;
        //     console.log(sibling);
        //     // Loop through each sibling and push to the array
        //     while (sibling) {
        //         const shouldAdd = condition(sibling);
        //
        //         if (shouldAdd) {
        //             siblings.push(sibling);
        //         }
        //     }
        //
        //     return siblings;
        //
        // };

        const getHeadings = (placeName: string) => {
            console.log(placeName);
            if (placeName) {
                const headings = document.evaluate('//h2[text()="'+placeName+'"]', document, null, XPathResult.ANY_TYPE, null );
                const headingsArr = [].slice.call(headings);
                console.log('matches', headings)
                const thisHeading = headings.iterateNext() as HTMLElement;
                console.log('thisHeading', thisHeading)

                if (thisHeading) {
                    // const siblings = getSiblings(thisHeading, (sibling: any) => sibling.href && sibling.href.includes('maps.google'))
                    console.log(thisHeading);
                    console.log(thisHeading.closest('[class*="address"]:not([class*="mobile"]), [id*="address"]'));
                    if (thisHeading.parentNode) {
                        const linkAddressElements = thisHeading.parentNode.querySelectorAll('a')
                        let linkAddressArr = [].slice.call(linkAddressElements);
                        linkAddressArr = linkAddressArr.filter(function(x: HTMLAnchorElement){ return x.href.includes('mapbox') || x.href.includes('maps') && x.href.includes('google')});
                        console.log(linkAddressArr);
                        return linkAddressArr.map((x: HTMLElement) => x.innerText);
                    }
                }

                return [];

                // const linkAddressElements = document.querySelectorAll('a');
                // const addressArr = [].slice.call(linkAddressElements).filter(function(x: HTMLAnchorElement){ return x.href.includes('maps.google')});
                //
                // const divAddressElements = document.querySelectorAll('[class*="address"]:not([class*="mobile"]), [id*="address"]');
                // const divAddressArray = [].slice.call(divAddressElements);
                //
                // return addressArr.concat(divAddressArray).map((x: HTMLElement) => x.innerText).filter(function(x, i , self)  {return self.indexOf(x) === i});
            } else {
                const linkAddressElements = document.querySelectorAll('a');

                let linkAddressArr = [].slice.call(linkAddressElements);
                linkAddressArr = linkAddressArr.filter(function(x: HTMLAnchorElement){ return x.href.includes('maps.google')});
                console.log('he?',linkAddressArr)

                const addressElements = document.querySelectorAll('[class*="address"]:not([class*="mobile"]), [id*="address"]');
                const addressArray = [].slice.call(addressElements);
                console.log('getting links',linkAddressArr.concat(addressArray))

                return linkAddressArr.concat(addressArray).map((x: HTMLElement) => x.innerText).filter(function(x, i , self)  {return self.indexOf(x) === i});
            }
        };

        BrowserService.getCurrentTabId((tabId: number | undefined) => {
            if (tabId) {
                BrowserService.executeCodeInTab(tabId,  getHeadings, (addresses: any) => {
                    Logger.log('addresses', addresses);
                    setHeadings(addresses[0]);
                }, [placeName]);
            }
        });
    }, [placeName]);

    return headings;
};
