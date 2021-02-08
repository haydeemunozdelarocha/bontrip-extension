import React, {createRef, useEffect, useState} from 'react';
import {NameAutoCompleteProps} from "./NameAutoComplete.I";
import {Scraper} from "../../../tools/Scraper";

export const NameAutoComplete = ({autoCompleteOptions, onChange}: NameAutoCompleteProps) => {
    const [inputValue, setInputValue] = useState('');
    const [relevantOptions, setRelevantOptions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const resultsList = createRef<HTMLDataListElement>();

    useEffect(() => {
        const updatedOptions = Scraper.filterArrayByText(autoCompleteOptions, inputValue);

        setRelevantOptions(updatedOptions);
        onChange(inputValue);


    }, [inputValue]);

    useEffect(() => {
        const shouldShowDropdown = relevantOptions.length > 0 && (relevantOptions.length !== 1 && relevantOptions[0] !== inputValue);
       setShowDropdown(shouldShowDropdown);
    }, [relevantOptions, resultsList]);

    const selectOption = (e: any) => {
        setInputValue(e.target.value);
        setShowDropdown(false);
    };

    const updateValue = (e: any) => {
        if (e.target.value === inputValue) {
            setShowDropdown(false);
            return;
        }

        setInputValue(e.target.value);
    };

    return (
        <div className="autocomplete">
            <input id="name" type="text" placeholder="Name" value={inputValue} onChange={updateValue}/>
            <datalist ref={resultsList} id="name-list" style={{display: showDropdown ? 'block' : 'none'}}>
                {
                    relevantOptions.map((option: any, i: number) => {
                        return <option onClick={selectOption} key={`name_option_${i}`} value={option}>{option}</option>;
                    })
                }
            </datalist>
        </div>
    );
}
