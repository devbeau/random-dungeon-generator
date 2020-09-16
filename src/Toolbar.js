import React, { useState, useRef, useEffect } from 'react';

export default function Toolbar ({brush, setBrush}){


    let [isDisabled, setDisabled] = useState('');

    function onClick (event){
        let {textContent} = event.target;
        if (textContent === 'clear') return setBrush('');
        setBrush(textContent);
    }

    return (
    <div className='toolbar-container'>
        <button onClick={onClick}>floor</button>
        <button onClick={onClick}>wall</button>
        <button onClick={onClick}>start</button>
        <button onClick={onClick}>end</button>
        <button onClick={onClick}>clear</button>
        <div>current brush: {brush}</div>
    </div>
    )
}