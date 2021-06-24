import React from 'react';
import s from './Post.module.css';
import userDefPhoto from "../../../../assets/images/defaultAvatar.jpg"

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src={userDefPhoto}/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;