import {UserType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";
import {ResultCodesEnum} from "../api/api";

const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'FOLLOW':
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                       return {...u, followed: true}  /// иммутабельность, все что изменяем делаем глубокую копию
                    }
                    return u
                })
            }

        case 'UNFOLLOW':
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case "SET_USERS":
            return {...state, users: [...action.users]}     /// если не сделать глубокую копию mapStateToProps не увидит изменение массива users

        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.pageNumber }

        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalUsersCount }

        case "TOOGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching }

        case "TOOGLE_IS_FOLLOWING_PROGRESS":
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
     toggleIsFetching: (isFetching: boolean)=> ({type: 'TOOGLE_IS_FETCHING', isFetching} as const),
     setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
     setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
     followSuccess: (userID: number) => ({type: 'FOLLOW', userID} as const),
     unFollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),
     toggleIsFollowingProgress: (progress: boolean, disabledId: number) => ({type: 'TOOGLE_IS_FOLLOWING_PROGRESS', progress, disabledId} as const),
     setCurrentPage: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))

        const data = await usersAPI.getUsers(page, pageSize)
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
            dispatch(actions.toggleIsFetching(false))
}

export const onPageChanged = (p: number, pageSize: number): ThunkAction<void, AppStateType, unknown, ActionsType> => (dispatch) => {
    dispatch(actions.setCurrentPage(p))
    dispatch(requestUsers(p, pageSize))
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

export default usersReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>