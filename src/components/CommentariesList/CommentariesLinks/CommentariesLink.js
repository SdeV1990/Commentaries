import React from 'react';

const CommentariesLink = ({ link, getComments }) => {
    return(
        <button 
            className='commentary_link'
            onClick={ event => getComments( link.url ) }
        >
            { link.label }
        </button>
    );
};

export default CommentariesLink;