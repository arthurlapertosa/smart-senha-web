import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Establishments from '../components/Establishments';
import Passwords from '../components/Passwords';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Establishments />
                </Route>
                <Route path='/passwords/:id'>
                    <Passwords />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;