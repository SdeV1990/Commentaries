import React from 'react';

// Components
import CommentariesLink from './CommentariesLink'

const CommentariesLinks = ( { linksArray, getComments } ) => {
    return(
        <div className='commentary_pagination_links'>
            {linksArray.map((link, linkIndex)=> {

                // Raquo issues decision
                // https://www.oreilly.com/library/view/react-up/9781491931813/ch04.html
                link.label = link.label.toString().replace('&raquo;', ' \u00bb').replace('&laquo;','\u00ab')

                return (
                        link.active === true || link.url === null
                    ?
                        <span key={`pagination_link${linkIndex}`} >{link.label}</span>  
                    :
                        <CommentariesLink 
                            link={link} 
                            key={`pagination_link${linkIndex}`} 
                            getComments={getComments}
                        />
                )
            })}
        </div>
    );
};

export default CommentariesLinks;