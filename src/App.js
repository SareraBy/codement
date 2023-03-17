import React from 'react';
import AppRouter from "./component/AppRouter";
import {GoogleOAuthProvider} from "@react-oauth/google";

const App = () => {

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_TOKEN}>
          <AppRouter/>
        </GoogleOAuthProvider>
    );
};

export default App;