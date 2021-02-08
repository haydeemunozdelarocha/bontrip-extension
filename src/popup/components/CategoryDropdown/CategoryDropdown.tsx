import React from "react";
import {PlaceCategories} from "../../../models/Place";
import {CategoryDropdownProps} from "./CategoryDropdown.I";

export const CategoryDropdown = ({onSelect}: CategoryDropdownProps) => {
    return (
        <select onChange={(e: any) => onSelect(e.target.value)}>
            <option value={PlaceCategories.FUN}>Fun</option>
            <option value={PlaceCategories.FOOD}>Food</option>
            <option value={PlaceCategories.TRANSPORTATION}>Transportation</option>
            <option value={PlaceCategories.SLEEP}>Sleep</option>
            <option value={PlaceCategories.INFO}>Info</option>
        </select>
    );
}
