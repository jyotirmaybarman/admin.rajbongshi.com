import { reactive } from '@vue/reactivity'

export const usePagination = (data = {currentPage: 1, perPage: 10, totalCount: 1}) => {
    const values = reactive({
        currentPage: data.currentPage || 1,
        perPage: data.perPage || 10,
        totalCount: data.totalCount || 1
    })

    return {
        getData(){
            return {
                ...values
            }
        },
        setData(currentPage = null, perPage = null, totalCount = null) {
            if(currentPage) values.currentPage = currentPage
            if(perPage) values.perPage = perPage
            if(totalCount) values.totalCount = totalCount
        },
        setCount(count){
            if(count >= 0) values.totalCount = count
        },
        setPerPage(perPage){
            if(perPage >= 0) values.perPage = perPage
        },
        setCurrentPage(currentPage){
            if(currentPage >= 0) values.currentPage = currentPage
        }
    }
}