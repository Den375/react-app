import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {ResultCodesEnum} from "../api/api";

const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'SN/USERS/FOLLOW':
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                       return {...u, followed: true}  /// иммутабельность, данные приходящие в чистую ф-ю делаем глубокую копию
                                                /// если меняется объект делаем его глубокую копию
                    }
                    return u
                })
            }

        case 'SN/USERS/UNFOLLOW':
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case 'SN/USERS/SET_USERS':
            return {...state, users: [...action.users]}     /// если не сделать глубокую копию mapStateToProps не увидит изменение массива users

        case 'SN/USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.pageNumber }

        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount }

        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching }

        case 'SN/USERS/SET_FILTER': {
            return {...state, filter: {...action.payload}}
        }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.progress
                                     ? [...state.followingInProgress, action.disabledId]         // добавляем в массив
                                     : state.followingInProgress.filter(id => id != action.disabledId) // достаем из массива
            }

        default:
            return state
    }
}

export const actions = {
     toggleIsFetching: (isFetching: boolean)=> ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
     setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
     setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
     followSuccess: (userID: number) => ({type: 'SN/USERS/FOLLOW', userID} as const),
     unFollowSuccess: (userID: number) => ({type: 'SN/USERS/UNFOLLOW', userID} as const),
     toggleIsFollowingProgress: (progress: boolean, disabledId: number) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', progress, disabledId} as const),
     setCurrentPage: (pageNumber: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', pageNumber} as const),
     setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const)
}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
            dispatch(actions.toggleIsFetching(false))
}

export const unfollow = (userID: number): ThunkType => async (dispatch) => {
        dispatch(actions.toggleIsFollowingProgress(true, userID))

        const response = await usersAPI.unFollow(userID)
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.unFollowSuccess(userID))
            }
            dispatch(actions.toggleIsFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType => async (dispatch) => {
        dispatch(actions.toggleIsFollowingProgress(true, userID))

        const response = await usersAPI.follow(userID)
            if (response.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.followSuccess(userID))
            }
            dispatch(actions.toggleIsFollowingProgress(false, userID))

}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>