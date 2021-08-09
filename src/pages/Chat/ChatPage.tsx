import React, {FC, useEffect, useState} from "react"
import {Button} from "antd";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const dispatch = useDispatch()

    const send = () => {
        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <Button disabled={false} onClick={send}>Send</Button>
        </div>
    </div>
}

export default ChatPage

/*    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages([...messages, ...newMessages])
        })
    }, [])

     Такой вариант будет с багом, т.к. useEffect вызывается при первом рендере только.
     setMessages([...messages      будет всегда пустой массив, который берется из замыкания только в первом вызове,
     но в след рендерах нету доступа к новому замыканию

     Используем другой синтаксис setState в useState -
     setMessages((prevMessages) => [...prevMessages,...
     Здесь messages берется реактом из предыдущего вызова, а не из замыкания.
     */

/*type PropsType = {
    message: ChatMessageType
}*/