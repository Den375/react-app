import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userDefPhoto from "../../../assets/images/defaultAvatar.jpg"
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

export type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData: ProfileType) => {
      //  todo: remove then
        props.saveProfile(formData).then(() => {
            setEditMode(false)
        }).catch(() => {})
        // в идеале убрать асинхронность в бизнес уровень, я так понимаю нужно создать флаг в state и
            // использовать useEffect
    }

    return (
        <div>
            <div>
                <img width='700 px' height='120 px'
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userDefPhoto} alt="photo" max-width='200px'/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                            <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={goToEditMode}/>}

                <ProfileStatusWithHooks status={props.status}
                                updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
    <div>
        {isOwner ? <button onClick={goToEditMode}>edit</button> : null}
    </div>
    <div>
        <b>Full name</b>: {profile.fullName}
    </div>
    <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
    </div>
    {profile.lookingForAJob &&
    <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
    </div>}
    <div>
        <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>
        <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>)}
    </div>
           </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;