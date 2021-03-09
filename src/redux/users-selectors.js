import {createSelector} from "reselect";
// зависимость
const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})


export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getIsFollowingProgress = (state) => {
    return state.usersPage.isFollowingProgress
}