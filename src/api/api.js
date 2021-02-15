import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/',
    withCredentials:true,
    headers:   {
                 'API-KEY': '4c50052f-9e57-4c8d-8df3-b1216d8578e6'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`api/1.0/users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unFollow(id) {
        return instance.delete(`/api/1.0/follow/${id}`)
            .then(response => {
                return response.data
        })
    },
    follow(id) {
            return instance.post(`/api/1.0/follow/${id}`)
                .then(response => {
                    return response.data
            })
    },
    getAuthUserData() {
                return instance.get(`/api/1.0/auth/me`)
                    .then(response => {
                        return response.data
                })
    },
    getUserProfile(id) {
               return instance.get(`/api/1.0/profile/${id}`)
                     .then(response => {
                         return response.data
               })
    }
}


