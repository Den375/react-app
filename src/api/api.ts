import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers:   {
                 'API-KEY': '4c50052f-9e57-4c8d-8df3-b1216d8578e6'
    }
})

export const usersAPI = {
    getUsers(page = 1, pageSize = 10) {
        return instance.get(`users?page=${page}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    unFollow(id: number) {
        return instance.delete(`follow/${id}`)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
    }
}

export const profileAPI = {
    getUserProfile(id: number) {
        return instance.get(`profile/${id}`)
    },
    getStatus(id: number) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCapctha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {id: number, email: string, login: string}
}

type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodeForCapctha
    messages: Array<string>
    data: {userId: number}
}

export const authAPI = {
    me() {
       return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
           return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data)
    },

    logout() {
           return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
       return instance.get(`/security/get-captcha-url`)
    }
}



