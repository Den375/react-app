import s from "./User.module.css";
import {NavLink} from "react-router-dom";
import userDefPhoto from "../../assets/images/defaultAvatar.jpg";
import React from "react";

const User = ({user, isAuth, followingInProgress, unfollow, follow}) => {
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
            <div>{'u.location.city'}</div>
            <div></div>
            <div></div>
            <div>{'u.status'}</div>
            <div>{'u.location.country'}</div>
        </div>
    </div>
}

export default User;