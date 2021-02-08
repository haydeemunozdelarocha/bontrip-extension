import {useEffect, useState} from "react";
import {BrowserService} from "../../services/BrowserService";

export const useUnderlyingPageImages = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const getImages = function() {
            const imageElements = document.querySelectorAll('img');
            const imageArr = [].slice.call(imageElements);
            const srcImageArr = imageArr.map(function(x: HTMLImageElement) { return x.naturalHeight > 120 && x.naturalWidth > 120 && x.src });

            const divElements = document.querySelectorAll('div');
            const divArr = [].slice.call(divElements);
            const srcDivArr = divArr.map(function(x: HTMLDivElement) {
                const style = window.getComputedStyle(x);

                if (style.backgroundImage) {
                    return style.backgroundImage.split(/"/)[1] || '';
                }

                return false;
            });

            return srcImageArr.concat(srcDivArr).filter(function(x) { return x; }).filter(function(x, i , self)  {return self.indexOf(x) === i});
        };

        BrowserService.getCurrentTabId((tabId: number | undefined) => {
            if (tabId) {
                BrowserService.executeCodeInTab(tabId, getImages, (images: any) => {
                    setImages([...images[0]]);
                });
            }
        });
    }, []);

    return images;
};
