import React, {useEffect} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const Auth = ({ setIsLogged }) => {
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const details = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                        },
                    }
                );
                setIsLogged((prev) => !prev);

                // Сохраняем токен доступа в localStorage
                localStorage.setItem("access_token", response.access_token);
            } catch (error) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            setIsLogged(true);
        }
    }, [setIsLogged]);

    return (
        <div className="auth">
            <button className={"buttonsimple"} onClick={login}>
                <i>Register</i>
            </button>
        </div>
    );
};

export default Auth;