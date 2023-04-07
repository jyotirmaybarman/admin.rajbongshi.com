import mitt from 'mitt'
const event = mitt()

export function useNotification(){
    return {
        event,
        notify(data = { type: "error", message: "No message" }, callback = null){
            event.emit('notify', { data , callback })
        }
    }
}