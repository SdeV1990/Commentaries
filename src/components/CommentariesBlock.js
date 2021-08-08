import React, { useEffect, useState } from 'react';

// Components
import CommentaryForm from './CommentaryForm/CommentaryForm';
import CommentariesList from './CommentariesList/CommentariesList';

const getHTTPRequest = (url, callBackFucntion ) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = callBackFucntion;
}

const  deletePreviousOrNextLinks = (state) => {
    if ( state.current_page === 1) state.links.shift(0);
    if ( state.last_page === state.current_page) state.links.splice(state.links.length-1);
    return state
}

const CommentariesBlock = ({ initialURL }) => {

    const [commentariesState, setCommentariesState] = useState(null)

    // Initalizing
    useEffect( () => {
        getHTTPRequest(initialURL,
            (event) => {
                //console.log(JSON.parse(event.target.response));
                let response = JSON.parse(event.target.response);
                response = deletePreviousOrNextLinks(response);
                setCommentariesState(response);
            }
        )
    }, [initialURL])

    const getComments = async (url) => {
        await getHTTPRequest(url,
            (event) => {
                //console.log(JSON.parse(event.target.response));
                let response = JSON.parse(event.target.response)
                response = deletePreviousOrNextLinks(response);
                setCommentariesState(response);
            }
        )
    }

    const handleShowMoreClick = async () => {

        // Get next url to upload
        let url = `${initialURL}?page=${commentariesState.current_page + (commentariesState.to - commentariesState.from + 1) / commentariesState.per_page }`
        
        await getHTTPRequest(url,
            (event) => {
                //console.log(JSON.parse(event.target.response));

                // Get new array of links
                let pageFrom = commentariesState.links.findIndex(link => link.active);
                let pageTo = JSON.parse(event.target.response).links.findIndex( link => link.active);
                let currentLinks = commentariesState.links.slice(0, pageFrom + 1 );
                currentLinks[currentLinks.length-1].label = `${commentariesState.current_page}-${JSON.parse(event.target.response).current_page}`;
                let nextLinks = deletePreviousOrNextLinks(JSON.parse(event.target.response)).links.slice(pageTo + 1);
                let newArrayOfLinks = currentLinks.concat(nextLinks);

                // Don't understand, why this link is used for, but change it for maintaining integrity of data
                let newNextPageUrl = newArrayOfLinks[newArrayOfLinks.length - 1].url;

                // Mutate state
                setCommentariesState({
                    ...commentariesState, 
                    data: [...commentariesState.data].concat(JSON.parse(event.target.response).data), 
                    to: Math.min(commentariesState.to + commentariesState.per_page, commentariesState.total),
                    links: newArrayOfLinks,
                    next_page_url: newNextPageUrl,
                });
            }
        )
    }

    console.log(commentariesState);

    return ( 
            commentariesState === null ?
            <h1>Loading...</h1>
        :
            <div>
            <CommentaryForm 
                titleText='Enter commentary'
                getComments={ getComments }
                initialURL={ initialURL }
                lastPageUrl={ commentariesState.last_page_url }
            />
            <CommentariesList 
                commentariesState={commentariesState}
                getComments={ getComments }
                handleShowMoreClick={handleShowMoreClick}
            />
            </div>
    );
}

export default CommentariesBlock;