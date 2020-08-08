import React from 'react';
import {ImageGridProps} from "./ImageGrid.I";

export const ImageGrid = ({images}: ImageGridProps) => {
    console.log('IMAGES', images);
    return (
        <div className="image-grid__container">
            {
                images.map((image: HTMLElement) => (
                    <div className={"image-grid__item"} style={{backgroundImage: `url('${image.getAttribute('src')}')`}}></div>
                ))
            }
        </div>
    );
};
