import React, {FC, useEffect, useState} from "react"
import {Button} from "antd";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
            console.log('close')
        }
    },[])

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        setMessages([])
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        } /*setMessages в слушателе будет брать переменную messages из 1го рендера через замыкание
               которая будет всегда пустой массив, используем другой синтаксис*/

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }
        const closeHandler = () => {
            console.log('close WS')
            setReadyStatus('pending')
        }
        wsChannel?.addEventListener('open', openHandler)
        wsChannel?.addEventListener('close', closeHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
            wsChannel?.removeEventListener('close', closeHandler)
        }
    },[wsChannel])

    const sendMessage = () => {
        if(!message) return

        wsChannel?.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <Button disabled={wsChannel === null || readyStatus === 'pending'}  onClick={sendMessage}>Send</Button>
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