import React from 'react';

const Commentary = ({ commentary }) => {
    return(
        <li className='commentary_item_wrapper'>  
            <div className='commentary_name'>{commentary.name}</div>
            <div className='commentary_text'>{commentary.text}</div>
            <div className='commentary_date'>{
                commentary.created_at === commentary.updated_at ? 
                    new Date(commentary.created_at).toLocaleDateString() + ' ' + new Date(commentary.created_at).toLocaleTimeString() 
                    :
                    new Date(commentary.updated_at).toLocaleDateString() + ' ' + new Date(commentary.updated_at).toLocaleTimeString()
            }</div>
        </li>
    );
};

export default Commentary;