import React, {useState} from 'react';
import '../style/ui.scss'
import Vector from '../store/Vector.png'
const Form = ({onSearchQueryChange, initialValue }) => {

    const [searchQuery, setSearchQuery] = useState(initialValue || '');

    function handleInputChange(event) {
        setSearchQuery(event.target.value);
        onSearchQueryChange(event);
    }

    return (
        <div className={"Form_main"}>
            <img src={Vector} width={17} height={17}/>
            <input className='Form_input'  value={searchQuery} onChange={handleInputChange} type='name' placeholder='Filter by name...'/>
        </div>
       
    );
};

export default Form;