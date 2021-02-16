import React from "react";
import s from "./Users.module.css"
import userDefPhoto from '../../assets/images/defaultAvatar.jpg'
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

let Users = (props) => {

        let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
        if (pagesCount > 20) {pagesCount = 20}
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map( p => {
                    return <span className={props.currentPage === p ? s.currentPage : null}
                                 onClick={() => props.onPageChanged(p)}> {p} </span>
                })}
            </div>

            {props.users.map(u => <div className={s.userContainer} key={u.id}>
                <div className={s.class1}>
                    <div>
                        <NavLink to={'/profile/' + u.id} >
                           <img src={u.photos.small != null ? u.photos.small : userDefPhoto} alt="image"/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button  disabled={props.isFollowingProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id)
                                usersAPI.unFollow(u.id).then( response => {
                                    if (response.resultCode === 0) {
                                        props.unFollow(u.id)
                                    }
                                    props.toggleIsFollowingProgress(false, u.id)
                                })
                              }
                            }>Unfollow</button>
                            : <button disabled={props.isFollowingProgress.some(id => id === u.id)}  onClick={() => {
                                props.toggleIsFollowingProgress(true, u.id)
                                usersAPI.follow(u.id).then( response => {
                                    if (response.resultCode === 0) {
                                        props.follow(u.id)
                                    }
                                    props.toggleIsFollowingProgress(false, u.id)
                                })
                              }
                            }>Follow</button>}
                    </div>
                </div>
                <div className={s.class2}>
                    <div>{u.name}</div>
                    <div>{'u.location.city'}</div>
                    <div></div>
                    <div></div>
                    <div>{'u.status'}</div>
                    <div>{'u.location.country'}</div>
                </div>
            </div>)}
        </div>
}

export default Users;

