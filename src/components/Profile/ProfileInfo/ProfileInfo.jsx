import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userDefPhoto from "../../../assets/images/defaultAvatar.jpg"

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img width='500 px' height='200 px'
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userDefPhoto} alt="photo" max-width='200px'/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                 <div>{props.profile.fullName} </div>
                 <div>{props.profile.aboutMe} </div>
                 <ProfileStatusWithHooks status={props.status}
                                updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;