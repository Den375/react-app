import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from  "./Login.module.css"

const maxLength50 = maxLengthCreator(50)

const Login = props => {
    const submit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={submit} captchaUrl={props.captchaUrl}/>
    </div>
}

const LoginForm = props => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email" placeholder='Введите email' component={Input} validate={[required, maxLength50 ]} type="text" />
            </div>
            <div>
                <Field name="password" placeholder='Введите пароль' component={Input} validate={[required, maxLength50 ]} type="password" />
            </div>
            <div>
                <Field name="rememberMe" component={Input} type="checkbox" /> Запомнить меня
            </div>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && <Field name="captcha" placeholder='Введите символы' component={Input} validate={[required, maxLength50 ]} type="text" />}
            <div className={s.commonError}>
                {props.error}
            </div>
            <div>
                <button>Войти</button>
            </div>
           </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(Login);

