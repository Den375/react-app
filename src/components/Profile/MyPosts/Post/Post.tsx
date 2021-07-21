import React from 'react';
import s from './Post.module.css';
import userDefPhoto from "../../../../assets/images/defaultAvatar.jpg"

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
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