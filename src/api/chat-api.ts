let ws: WebSocket | null = null

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChannel, 3000)
}

function createChannel() {
    ws?.close()
    ws?.removeEventListener('message', closeHandler)
    ws?.removeEventListener('close', closeHandler)

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('close', closeHandler)
}

let subscribers = [] as SubscriberType[]

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.close()
        ws?.removeEventListener('message', closeHandler)
        ws?.removeEventListener('close', closeHandler)
    },

    subscribe(callback: SubscriberType) {
        subscribers.push(callback)

        /*return () => {
            subscribers = subscribers.filter(s => s !== callback)
        } дополнительная реализация*/
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
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

type SubscriberType = (messages: ChatMessageType[]) => void