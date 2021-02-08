import React from 'react';
import { render } from 'react-dom';
import {AddPage} from "./containers/AddPage/AddPage";
import {Header} from "./components/Header/Header";
import './style/index.scss';

const App = () => {
    console.log('rendering');

    return (
        <div className="App">
            <Header title={"bontrip"}/>
            <AddPage/>
        </div>
    );
};
console.log('huh?', document, document.getElementById('root'));

const root = document.getElementById('root');
render(<App />, root);
