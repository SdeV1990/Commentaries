import React from 'react';

// Components
import Link from './Link'

const LinksList = ( { linksArray, getComments } ) => {
    return(
        <div className='commentary_pagination_links'>
            {linksArray.map((link, linkIndex)=> {

                // Raquo issues decision
                // https://www.oreilly.com/library/view/react-up/9781491931813/ch04.html
                link.label = link.label.toString().replace('&raquo;', ' \u00bb').replace('&laquo;','\u00ab')

                return (
                        link.active === true || link.url === null
                    ?
                        <span className='commentary_link' key={`pagination_link${linkIndex}`} >{link.label}</span>  
                    :
                        <Link 
                            link={link} 
                            key={`pagination_link${linkIndex}`} 
                            getComments={getComments}
                        />
                )
            })}
        </div>
    );
};

export default LinksList;