import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img width='1000 px' height='200 px'
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} alt="photo"/>
                 <div>{props.profile.fullName} </div>
                 <div>{props.profile.aboutMe} </div>
                 <ProfileStatus status={'Мой статус захардкодженный'}/>
            </div>
        </div>
    )
}

export default ProfileInfo;