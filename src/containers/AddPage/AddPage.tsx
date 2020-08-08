import React from "react";
import {AddressDropdown} from "../../components/AddressDropdown/AddressDropdown";
import {ImageGrid} from "../../components/ImageGrid/ImageGrid";
import {useUnderlyingPageImages} from "../../hooks/useUnderlyingPageImages";
import {NameAutoComplete} from "../../components/NameAutoComplete/NameAutoComplete";
import {CategoryDropdown} from "../../components/CategoryDropdown/CategoryDropdown";

export const AddPage = () => {
    const images = useUnderlyingPageImages();

    return (
        <div className="content">
            <h1>Save for later!</h1>
            <div>
                <CategoryDropdown/>
                <NameAutoComplete/>
                <input id="url" type="hidden"/>
            </div>
            <AddressDropdown addresses={[]}/>
            <ImageGrid images={images}/>
            <button>Save for later</button>
        </div>
    );
};
