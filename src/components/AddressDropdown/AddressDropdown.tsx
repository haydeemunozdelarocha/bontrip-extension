import React from 'react';
import {IAddressDropdownProps} from "./AddressDropdown.I";

export const AddressDropdown = (props: IAddressDropdownProps) => {
    const { addresses } = props;
    return (
        <div className="address-dropdown__container">
            <select id="address-dropdown">
                {
                    addresses.map((address) => (
                        <option value={address}>{address}</option>
                    ))
                }
            </select>
        </div>
    );
};
