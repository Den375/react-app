import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import s from './ProfileDataForm.module.css'
import {ProfileType} from "../../../types/types";

type ProfileFormFormOwnProps = {
    profile: ProfileType
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileFormFormOwnProps> & ProfileFormFormOwnProps> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        <div className={s.commonError}>
            {error}
        </div>
        <div>
            <b>Full name</b>: <Field name="fullName" placeholder='Введите ваше имя' component={Input}/>
        </div>
        <div>
            <b>Looking for a job</b>:  <Field name="lookingForAJob" component={Input} type='checkbox'/>
        </div>
        <div>
            <b>My professional skills</b>:  <Field name="lookingForAJobDescription" placeholder='Что вы умеете?' component={Textarea} />
        </div>
        <div>
            <b>About me</b>:  <Field name="aboutMe" placeholder='Немного о вас' component={Textarea}/>
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div className={s.contact}>
                       <b>{key}: <Field name={'contacts.' + key} placeholder={key} component={Input}/></b>
                   </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileFormFormOwnProps>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;