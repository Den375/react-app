/*import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";*/

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

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._subscriber()
    }
}

/*export default store;
window.store = store;*/



