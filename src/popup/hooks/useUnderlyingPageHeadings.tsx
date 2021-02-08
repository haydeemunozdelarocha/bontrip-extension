import {useEffect, useState} from "react";
import {BrowserService} from "../../services/BrowserService";

export const useUnderlyingPageHeadings = () => {
    const [headings, setHeadings] = useState<string[]>([]);

    useEffect(() => {
        const getHeadings = function() {
            const headingElements = document.querySelectorAll('h1, h2, h3, [class*="title"]');
            const headingsArr = [].slice.call(headingElements);

            return headingsArr.map((x: HTMLElement) => x.innerText).filter(function(x, i , self)  {return self.indexOf(x) === i});
        };

        BrowserService.getCurrentTabId((tabId: number | undefined) => {
            if (tabId) {
                BrowserService.executeCodeInTab(tabId, getHeadings, (headings: any) => {
                    setHeadings(headings[0]);
                });
            }
        });
    }, []);

    return headings;
};
