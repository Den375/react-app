import s from "./User.module.css";
import {NavLink} from "react-router-dom";
import userDefPhoto from "../../assets/images/defaultAvatar.jpg";
import React from "react";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    isAuth: boolean
    followingInProgress: Array<number>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
}

const User: React.FC<PropsType> = ({user, isAuth, followingInProgress, unfollow, follow}) => {
    return <div className={s.userContainer} >
        <div className={s.class1}>
            <div>
                <NavLink to={'/profile/' + user.id} >
                    <img src={user.photos.small || userDefPhoto} alt="photo"/>
                </NavLink>
            </div>
            <div>
                {!isAuth ? null  :
                    user.followed
                        ? <button  disabled={followingInProgress.some(id => id === user.id)}
                                   onClick={() => {unfollow(user.id)}}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {follow(user.id)}}>Follow</button>}
            </div>
        </div>
        <div className={s.class2}>
            <div>{user.name}</div>
            <div>{'user.location.city'}</div>
            <div></div>
            <div></div>
            <div>{user.status}</div>
            <div>{'user.location.country'}</div>
        </div>
    </div>
}

export default User;