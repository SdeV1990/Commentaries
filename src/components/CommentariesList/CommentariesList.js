import React from 'react';

// Components
import CommentariesLinks from './CommentariesLinks/CommentariesLinks';
import Commentary from './Commentary';

const CommentariesList = ({ commentariesState, getComments, handleShowMoreClick }) => {
    return (
        <div className='commentaries_list_wrapper'>
            <div className='commentaries_list'>
                { commentariesState.data.map( commentary => {
                    return(
                        <Commentary commentary={commentary} key={ 'commentaryKey-' + commentary.id } />
                    );
                })}
            </div>
            <p>{ `Messages from ${commentariesState.from} to ${commentariesState.to}` }</p>
            { 
                commentariesState.to === commentariesState.total ? 
                    null : 
                    <button className='showMoreButton_active' onClick={ () => handleShowMoreClick() }>
                        Show more...
                    </button>
            }
            <CommentariesLinks linksArray={commentariesState.links} getComments={getComments} />
        </div>
    );
};

export default CommentariesList;








