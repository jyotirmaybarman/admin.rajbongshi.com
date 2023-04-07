import { reactive } from '@vue/reactivity'

export const useModal = () => {
    const values = reactive({
        mode:"",
        action: "",
        message: "",
        next: "close",
        type: "",
        show: false,
        name: "",
        data: null,
    })

    return {
        getData(){
            return {
                ...values
            }
        },
        setModalData(data = { name:"", show:false, action:"", message:"", type:"", mode:"info",  next:"close", data:null } ){
            values.name = data.name
            values.action = data.action
            values.message = data.message
            values.mode = data.mode
            values.show = data.show
            values.next = data.next
            values.type = data.type
            if(data) values.data = data.data
        }
    }
}