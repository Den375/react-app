import {chatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction} from "redux-form";
import {Dispatch} from "redux";
import {v1} from 'uuid'

type ChatMessageType = ChatMessageAPIType & {id: string}

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({ ...m, id: v1()}) ) ]
                    .filter((m, index, array) => index >= array.length - 100)
            }

        case "SN/CHAT/WS_OPENED":
            return {
                ...state,
                messages: []
            }

        case "SN/CHAT/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => (
        {type: 'SN/CHAT/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => (
        {type: 'SN/CHAT/STATUS_CHANGED', payload: {status}} as const),
    webSocketOpened: () => (
        {type: 'SN/CHAT/WS_OPENED'} as const),
}


let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageAPIType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

let _WsOpenedHandler: (() => void) | null = null
const WsOpenedHandlerCreator = (dispatch: Dispatch) => {
    if (_WsOpenedHandler === null) {
        _WsOpenedHandler = () => dispatch(actions.webSocketOpened())
    }

    return _WsOpenedHandler
}

export const startWebSocketListening = (): ThunkType => async (dispatch) => {
            chatApi.start()
            chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
            chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
            chatApi.subscribe('ws-opened', WsOpenedHandlerCreator(dispatch))
}

export const stopWebSocketListening = (): ThunkType => async (dispatch) => {
            chatApi.stop()
            chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
            chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
            chatApi.unsubscribe('ws-opened', WsOpenedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
            chatApi.sendMessage(message)
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>