import {useEffect, useState} from "react";

export const useUnderlyingPageImages = () => {
    const [images, setImages] = useState<HTMLElement[]>([]);

    useEffect(() => {
        setImages([...document.querySelectorAll('img')]);
    }, []);
    return images;
};
