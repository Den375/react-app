import React, {FC} from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from  "./Login.module.css"
import {AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";

type LoginFormValuesType = {
    captcha: string;
    rememberMe: boolean;
    password: string;
    email: string;
}

const LoginPage: FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch()

    const submit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={submit} captchaUrl={captchaUrl}/>
    </div>
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const maxLength50 = maxLengthCreator(50)

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = props => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email" placeholder='Введите email' component={Input} validate={[required, maxLength50 ]} type="text" />
            </div>
            <div>
                <Field name="password" placeholder='Введите пароль' component={Input} validate={[required, maxLength50 ]} type="password" />
            </div>
            <div>
                <Field name="rememberMe" component={Input} type="checkbox" />  Запомнить меня
            </div>
            {props.captchaUrl && <img src={props.captchaUrl} alt='captcha'/>}
            {props.captchaUrl && <Field name="captcha" placeholder='Введите символы' component={Input} validate={[required, maxLength50 ]} type="text" />}
            <div className={s.commonError}>
                {props.error}
            </div>
            <div>
                <button>Войти</button>
            </div>
           </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export default LoginPage

