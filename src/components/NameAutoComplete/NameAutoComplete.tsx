import React from 'react';

export const NameAutoComplete = () => {
    return (
        <div className="autocomplete">
            <input id="name" type="text" placeholder="Name"/>
            <datalist id="name-list" style={{display: 'none'}}>
            </datalist>
        </div>
    );
}
