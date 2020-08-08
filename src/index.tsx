import React from 'react';
import { render } from 'react-dom';
import {AddPage} from "./containers/AddPage/AddPage";
import {Header} from "./components/Header/Header";
import './style/index.scss';
console.log('WHERE ARE YOU?');
const App = () => {
    return (
        <div className="App">
            <Header title={"bontrip"}/>
            <AddPage/>
        </div>
    );
};

const root = document.getElementById('root');
render(<App />, root);
