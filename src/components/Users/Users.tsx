import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsAuth,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(1, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followFriend = (userId: number) => {
        dispatch(follow(userId));
    }

    const unfollowFriend = (userID: number) => {
        dispatch(unfollow(userID))
    }

        return <div>
                  <UsersSearchForm onFilterChanged={onFilterChanged}/>
                  <Paginator totalUsersCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
                  <div>
                    {users.map(u => <User user={u} key={u.id} isAuth={isAuth}
                                        followingInProgress={followingInProgress}
                                        unfollow={unfollowFriend} follow={followFriend}/>)}
                  </div>
               </div>
}



