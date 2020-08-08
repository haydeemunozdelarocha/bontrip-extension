import {useState} from "react";

export const useUnderlyingPageImages = () => {
    const [images, setImages] = useState([]);


    return images;
};
