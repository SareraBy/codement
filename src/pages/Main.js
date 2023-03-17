import React, { useEffect, useState } from 'react';
import Box from '../UI/Box';
import logo from '../store/logo.png';
import Form from '../UI/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from "../component/Auth";

const Main = () => {
    const [characters, setCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
    const [isLogged, setIsLogged] = useState(null);    console.log(isLogged)
    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await axios.get(
                    'https://rickandmortyapi.com/api/character'
                );
                setCharacters(response.data.results);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCharacters();
    }, []);

    useEffect(() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery]);

    function compareNames(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    const sortedCharacters = characters.sort(compareNames).filter((character) => {
        if (searchQuery) {
            return character.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    function handleSearchQueryChange(event) {
        setSearchQuery(event.target.value);
    }
    function handleLogout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('isLogged');
        setIsLogged(false);
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            setIsLogged(true);
            localStorage.setItem('isLogged', true);
        } else {
            setIsLogged(false);
            localStorage.removeItem('isLogged');
        }
    }, []);

    if (isLogged === null) {
        return <div>Loading...</div>;
    } else if (isLogged) {    return (
        <div className={'Main'} >
            <div data-aos="fade-down-left"  data-aos-duration="1200" className={'Div_exit'} >
                <button className={'buttonsimple-exit'} onClick={handleLogout}>Log out</button>
            </div>
            <img  data-aos-duration="1000" data-aos="fade-down-right" className={`logo`} src={logo} />
            <Form  onSearchQueryChange={handleSearchQueryChange} initialValue={searchQuery} />
            <div  data-aos-duration="1000" data-aos="fade-left" className={'Box_div'}>
                {sortedCharacters.map((character) => (
                    <Box
                        key={character.id}
                        id={character.id}
                        image={character['image']}
                        name={character.name}
                        description={character.species}
                    />
                ))}
            </div>
        </div>
    );
    } else {
        return (
            <div
                 className={'login'}>
                <h1>Login In</h1>
                <Auth setIsLogged={setIsLogged} />
            </div>
        );
    }
};

export default Main;
