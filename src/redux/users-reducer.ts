import {usersAPI} from "../api/api";
import {UserType} from "../types/types";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'social-network/users/TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOOGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 5,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case FOLLOW:
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                       return {...u, followed: true}  /// иммутабельность, все что изменяем делаем глубокую копию
                    }
                    return u
                })
            }

        case UNFOLLOW:
            return  {...state,
                users: state.users.map( u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case SET_USERS:
            return {...state, users: [...action.users]}     /// если не сделать глубокую копию mapStateToProps не увидит изменение массива users

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber }

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount }

        case TOOGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching }

        case TOOGLE_IS_FOLLOWING_PROGRESS:
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

type ToggleIsFetchingActionType  = {
    type: typeof TOOGLE_IS_FETCHING
    isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOOGLE_IS_FETCHING, isFetching})
type SetUsersActionType  = {
    type: typeof SET_USERS
    users: Array<UserType>
}
const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
type FollowSuccesActionType = {
    type: typeof FOLLOW
    userID: number
}
const followSuccess = (userID: number): FollowSuccesActionType => ({type: FOLLOW, userID});
type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
const unFollowSuccess = (userID: number): UnFollowSuccessActionType => ({type: UNFOLLOW, userID});
type ToogleIsFollowingProgressActionType = {
    type: typeof TOOGLE_IS_FOLLOWING_PROGRESS
    progress: boolean
    disabledId: number
}
const toggleIsFollowingProgress = (progress: boolean, disabledId: number): ToogleIsFollowingProgressActionType => ({type: TOOGLE_IS_FOLLOWING_PROGRESS, progress, disabledId})

export const setCurrentPage = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber})


export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
        dispatch(toggleIsFetching(true))

        const data = await usersAPI.getUsers(page, pageSize)
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))
}

export const onPageChanged = (p: number, pageSize: number) => (dispatch: any) => {
    dispatch(setCurrentPage(p))
    dispatch(requestUsers(p, pageSize))
}

export const unfollow = (userID: number) => async (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userID))

        const response = await usersAPI.unFollow(userID)
            if (response.data.resultCode === 0) {
                dispatch(unFollowSuccess(userID))
            }
            dispatch(toggleIsFollowingProgress(false, userID))
}

export const follow = (userID: number) => async (dispatch: any) => {
        dispatch(toggleIsFollowingProgress(true, userID))

        const response = await usersAPI.follow(userID)
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userID))
            }
            dispatch(toggleIsFollowingProgress(false, userID))

}

export default usersReducer;