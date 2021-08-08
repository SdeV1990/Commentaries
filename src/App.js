import React from 'react';

// Components
import CommentariesBlock from './components/CommentariesBlock';

const App = () => {
    return (
        <CommentariesBlock initialURL='https://jordan.ashton.fashion/api/goods/30/comments'/>
    );
}

export default App;