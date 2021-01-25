const UPDATE_NEW_POST_TEXT  = 'UPDATE-NEW-POST-TEXT';
const ADD_POST  = 'ADD-POST';
const UPDATE_NEW_MESSAGE_TEXT  = 'UPDATE-NEW-MESSAGE-TEXT';
const ADD_MESSAGE  = 'ADD-MESSAGE';

let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}],
            messages: [
                {id: 1, message: 'оооооппаа'},
                {id: 2, message: 'How is your ffa?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'dfdo'},
                {id: 5, message: 'ado'}],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: 'ппппывап?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
                {id: 3, message: 'Blabla', likesCount: 11},
                {id: 4, message: 'Dada', likesCount: 11}
            ],
            newPostText: ''
        }
    },
    _subscriber() {
        alert('no obserber')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._subscriber = observer;
    },

    _updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText
        this._subscriber()
    },
    _addPost() {
        let newPost = {
            id: 8,
            message: this._state.profilePage.newPostText,
            likesCount: 44
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._subscriber()
    },
    _updateNewMessageText(newText) {
        this._state.dialogsPage.newMessageText = newText;
        this._subscriber()
    },
    _addMessage() {
        let newMessage = {
            id: 99,
            message: this._state.dialogsPage.newMessageText
        }
        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = "";
        this._subscriber()
    },

    dispatch(action) {
        switch (action.type) {
            case UPDATE_NEW_POST_TEXT: this._updateNewPostText(action.newText); break;
            case ADD_POST: this._addPost(); break;
            case UPDATE_NEW_MESSAGE_TEXT: this._updateNewMessageText(action.newText); break;
            case ADD_MESSAGE: this._addMessage(); break;
        }
    }
}

export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text});
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});

export default store;
window.store = store;



