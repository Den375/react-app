import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";
// зависимость
const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)  // если не использовать наш селектор, при каждом dispatch будет вызов mapState и в памяти будет создаваться новый массив
})                                  // что ухудшит производительность. filter здесь излишний, для примера


export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}