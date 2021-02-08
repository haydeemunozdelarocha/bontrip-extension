import React, {useEffect, useState} from "react";
import {AddressDropdown} from "../../components/AddressDropdown/AddressDropdown";
import {ImageGrid} from "../../components/ImageGrid/ImageGrid";
import {NameAutoComplete} from "../../components/NameAutoComplete/NameAutoComplete";
import {CategoryDropdown} from "../../components/CategoryDropdown/CategoryDropdown";
import {useUnderlyingPageImages} from "../../hooks/useUnderlyingPageImages";
import {PlaceCategories, PlaceData} from "../../../models/Place";
import {useUnderlyingPageHeadings} from "../../hooks/useUnderlyingPageHeadings";
import {useUnderlyingPageAddresses} from "../../hooks/useUnderlyingPageAddresses";
import {Logger} from "../../../tools/Logger";

const initialPlaceData: PlaceData = {
    name: '',
    address: null,
    images: [],
    category: PlaceCategories.FUN
};

export const AddPage = () => {
    const [newPlace, setNewPlace] = useState<PlaceData>(initialPlaceData);

    const images = useUnderlyingPageImages();
    const headings = useUnderlyingPageHeadings();
    const addresses = useUnderlyingPageAddresses({placeName: newPlace ? newPlace.name : ''});

    const getImageUrl = (e: MouseEvent) => {
        const url = (e.target as HTMLDivElement).getAttribute('data-src');

        if (url) {
            setNewPlace({
                ...newPlace,
                images: [url]
            });
        }
    };
    const chooseCategory = (category: PlaceCategories) => {
        setNewPlace({
            ...newPlace,
            category
        });
    }

    const setName = (name: string) => {
        setNewPlace({
            ...newPlace,
            name
        });
    };

    useEffect(() => Logger.log('place set to', newPlace),  [newPlace]);

    return (
        <div className="content">
            <h1>Save for later!</h1>
            <div>
                <CategoryDropdown onSelect={chooseCategory}/>
                <NameAutoComplete autoCompleteOptions={headings} onChange={setName}/>
                <AddressDropdown addresses={addresses}/>
                <input id="url" type="hidden"/>
            </div>
            <ImageGrid onSelect={getImageUrl} selectedImageUrl={newPlace.images ? newPlace.images[0] : ''} images={images}/>
            <button>Save for later</button>
        </div>
    );
};
