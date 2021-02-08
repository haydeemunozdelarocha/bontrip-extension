import React from 'react';
import {ImageGridProps} from "./ImageGrid.I";

export const ImageGrid = ({images, onSelect, selectedImageUrl}: ImageGridProps) => {
    const selectImage = (e: any) => {
        if (onSelect) {
            onSelect(e);
        }
    };

    return (
        <div className="image-grid__container">
            {
                images.map((imageSrc: string, i: number) => (
                    <div onClick={selectImage} className={`image-grid__item ${selectedImageUrl === imageSrc ? 'selected' : ''}`} data-src={imageSrc} key={`image${i}`} style={{backgroundImage: `url('${imageSrc}')`}}></div>
                ))
            }
        </div>
    );
};
