import React, { useEffect, useState } from 'react';
import Box from '../UI/Box';
import logo from '../store/logo.png';
import Form from '../UI/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Main = () => {
    const [characters, setCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <div className={'Main'}>
            <img className={`logo`} src={logo} />
            <Form onSearchQueryChange={handleSearchQueryChange} />
            <div className={'Box_div'}>
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
};

export default Main;

