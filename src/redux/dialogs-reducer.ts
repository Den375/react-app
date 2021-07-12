const ADD_MESSAGE = 'social-network/dialogs/ADD-MESSAGE';

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Привет'},
        {id: 2, message: 'Как дела?'},
        {id: 3, message: '?'},
        {id: 4, message: 'Ты там точно реакт учишь?'},
        {id: 5, message: 'Или ерундой страдаешь'}] as Array<MessageType>,
}

type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return  {
                ...state,
                dialogs: [...state.dialogs],
                messages: [...state.messages, {id: 99, message: action.newMessageBody}],
            }
        default:
            return state
    }
}

type SendMessageCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export const addMessage = (newMessageBody:string):SendMessageCreatorActionType => ({type: ADD_MESSAGE, newMessageBody});
export default dialogsReducer;