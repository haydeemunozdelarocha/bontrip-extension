import React from "react";
import {HeaderProps} from "./Header.I";

export const Header = ({title}: HeaderProps) => {
    return (
        <header className="app-header">
            <h1 className="title">{title}</h1>
        </header>
    );
};
