import React from 'react';
import {ImageGridProps} from "./ImageGrid.I";

export const ImageGrid = ({images}: ImageGridProps) => {
    return (
        <div className="image-grid__container">
            {
                images.map((image: string) => (
                    <div className={"image-grid__item"} style={{backgroundImage: `url('${image}')`}}></div>
                ))
            }
        </div>
    );
};
