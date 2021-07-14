import {authAPI, ResultCodeForCapctha, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null// if null, then captcha is not required
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const setAuthUserData = (userId:number | null, login:string | null, email:string | null, isAuth:boolean):SetAuthUserDataActionType => ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

const getCaptchaUrlSuccess = (captchaUrl:string):GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = () => async (dispatch:any) => {
            let meData = await authAPI.me()

            if (meData.resultCode === ResultCodesEnum.Success) {
                let {id, login, email} = meData.data
                dispatch(setAuthUserData(id, login, email, true))
            }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
        let data = await authAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
        } else  {
            if(data.resultCode === ResultCodeForCapctha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }

            let message = data.messages.length > 0 ? data.messages[0] : "Some Error, Sorry"
            dispatch(stopSubmit('login', {_error: message}))
        }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
        let response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch:any) => {
        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}

export default authReducer;