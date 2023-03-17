import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import Pages from "../pages/Pages";
import Loader from "../pages/Loader";
import Auth from "./Auth";

const AppRouter = () => {
    return (
        <Routes >

            <Route path={'/'} element={<Main/>}/>
            <Route path={`/character/:id`} element={<Pages/>}/>
            <Route path={'*'} element={<Loader/>}/>
        </Routes>
    );
};

export default AppRouter;