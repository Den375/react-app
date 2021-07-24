import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SocialNetwork from './App';

ReactDOM.render(<SocialNetwork/>, document.getElementById('root'));

/*store.subscribe(rerenderEntireTree);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


