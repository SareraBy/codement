import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "../style/pages.scss"
import arrow from "../store/arrow_back_24px.png"
import Line from "../UI/Line";
const Pages = () => {
    const { id } = useParams();

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await axios.get(
                    'https://rickandmortyapi.com/api/character/'+id
                );
                setCharacters(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCharacters();
    }, []);


    return (
        <div data-aos="fade-up"
             data-aos-duration="1000"
             className={"Page"}
        >
            <div  className={"Go_back_div"}>

            <Link  className={"Go_back"} to={'/'}><img className={"Go_back_img"} width={10} height={10} src={arrow}/> GO BACK</Link>
            </div>
            <img className={'pg_img'} src={characters.image}   />
            <p className={"text_page"}>{characters.name}</p>
            <p className={"under_line"} >Informations</p>
            <Line id={id}/>
        </div>
    );
};

export default Pages;