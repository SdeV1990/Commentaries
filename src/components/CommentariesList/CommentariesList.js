import React from 'react';

// Components
import LinksList from './Links/LinksList';
import Commentary from './Commentary';

const CommentariesList = ({ commentariesState, getComments, handleShowMoreClick }) => {
    return (
        commentariesState.data.lenght === 0 ?
        <span>No comments...</span>
        :
        <div className='commentaries_list_wrapper'>
            <ul className='commentaries_list'>
                { commentariesState.data.map( commentary => {
                    return(
                        <Commentary commentary={commentary} key={ 'commentaryKey-' + commentary.id } />
                    );
                })}
            </ul>
            <p className='commentaries_pagination_description'>{ `Messages from ${commentariesState.from} to ${commentariesState.to}` }</p>
            { 
                commentariesState.to === commentariesState.total ? 
                    null : 
                    <button className='showMoreButton' onClick={ () => handleShowMoreClick() }>
                        Show more...
                    </button>
            }
            <LinksList linksArray={commentariesState.links} getComments={getComments} />
        </div>
    );
};

export default CommentariesList;








