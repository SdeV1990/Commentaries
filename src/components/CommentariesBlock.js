import React, { useEffect, useState } from 'react';

// Components
import CommentaryForm from './CommentaryForm/CommentaryForm';
import CommentariesList from './CommentariesList/CommentariesList';

const CommentariesBlock = ({ initialURL }) => {

    const [commentariesState, setCommentariesState] = useState(null)

    // Delete links depending on current page number
    const  deletePreviousOrNextLinks = (state) => {
        if ( state.current_page === 1) state.links.shift(0);
        if ( state.last_page === state.current_page) state.links.splice(state.links.length-1);
        return state
    };

    const getHTTPRequest = (url, callBackFucntion ) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = callBackFucntion;
    };

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
        );
    };

    const handleShowMoreClick = async () => {

        // Get next url to upload
        let url = `${initialURL}?page=${commentariesState.current_page + (commentariesState.to - commentariesState.from + 1) / commentariesState.per_page }`
        
        await getHTTPRequest(url,
            (event) => {
                //console.log(JSON.parse(event.target.response));

                // Create new array of links

                // Get start page from current links array
                let pageFrom = commentariesState.links.findIndex(link => link.active);

                // Get end page from response links array
                let pageTo = JSON.parse(event.target.response).links.findIndex( link => link.active);

                // Get array of current links
                let currentLinks = commentariesState.links.slice(0, pageFrom + 1 );

                // Replace label of current page on current range pages
                currentLinks[currentLinks.length-1].label = `${commentariesState.current_page}-${JSON.parse(event.target.response).current_page}`;
                
                // Get array of next links
                let nextLinks = deletePreviousOrNextLinks(JSON.parse(event.target.response)).links.slice(pageTo + 1);

                // Merge current and next links arrays
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
        );
    };

    // console.log(commentariesState);

    return ( 
            commentariesState === null ?
            <h1 className='commentaries_block_wrapper'>Loading...</h1>
        :
            <div className='commentaries_block_wrapper'>
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
};

export default CommentariesBlock;