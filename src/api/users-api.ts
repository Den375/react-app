import {GetItemsType, instance, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(page = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    unFollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`).then(res => res.data)
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data)
    }
}