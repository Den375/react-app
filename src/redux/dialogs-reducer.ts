import {InferActionsTypes} from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "SN/DIALOGS/ADD-MESSAGE":
            return  {
                ...state,
                dialogs: [...state.dialogs],
                messages: [...state.messages, {id: 99, message: action.newMessageBody}],
            }
        default:
            return state
    }
}

export const actions = {
    addMessage: (newMessageBody:string) => ({type: 'SN/DIALOGS/ADD-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>