import React from 'react';
import '../style/ui.scss'
import Vector from '../store/Vector.png'
const Form = ({onSearchQueryChange}) => {
    return (
        <div className={"Form_main"}>
            <img src={Vector} width={17} height={17}/>
            <input className='Form_input' onChange={onSearchQueryChange } type='name' placeholder='Filter by name...'/>
        </div>
       
    );
};

export default Form;