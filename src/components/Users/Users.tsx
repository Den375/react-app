import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    onPageChanged: (p: number) => void
    onFilterChanged: (filter: FilterType) => void
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<number>
    isAuth: boolean
}

let Users: React.FC<PropsType> = (props) => {
        return <div>
                  <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
                  <Paginator totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>
                  <div>
                    {props.users.map(u => <User user={u} key={u.id} isAuth={props.isAuth}
                                        followingInProgress={props.followingInProgress}
                                        unfollow={props.unfollow} follow={props.follow}/>)}
                  </div>
               </div>
}

export default Users

