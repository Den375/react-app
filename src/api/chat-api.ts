let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[] ,
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const closeHandler = () => {
    console.log('CLOSE WS')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function cleanUp() {
    ws?.close()
    ws?.removeEventListener('message', closeHandler)
    ws?.removeEventListener('close', closeHandler)
}

function createChannel() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('open', openHandler)
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)

        /*return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        } дополнительная реализация*/
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type EventsNamesType = 'messages-received' | 'status-changed'
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready'