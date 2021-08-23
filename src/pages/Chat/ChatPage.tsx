import React, {FC, useEffect, useRef, useState} from "react"
import {Button} from "antd";
import {ChatMessageAPIType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startWebSocketListening, stopWebSocketListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: FC = () => {

    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startWebSocketListening())
        return () => {
            dispatch(stopWebSocketListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const element = e.currentTarget
        if ( (element.scrollHeight - element.scrollTop - element.clientHeight ) < 300) {
                !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }

/*       console.log(`scrollHeight: ${element.scrollHeight}, scrollTop: ${element.scrollTop}, clientHeight:  ${element.clientHeight}.
       Calculated = ${element.scrollHeight - element.scrollTop - element.clientHeight}` )*/

    }

    useEffect(() => {
        if (isAutoScroll) messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])


    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    console.log('<<<Message')
    return <div>
        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

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
            <Button disabled={status !== 'ready'} onClick={send}>Send</Button>
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