const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';

const initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
           return {
               ...state,
               newMessageText: action.newText
           }
        case ADD_MESSAGE:
            let newMessage = {
                id: 99,
                message: state.newMessageText
            }
            return  {
                ...state,
                dialogs: [...state.dialogs],
                messages: [...state.messages, newMessage],
                newMessageText: ''
            }
        default:
            return state
    }
}

export const updateNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: text});
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export default dialogsReducer;