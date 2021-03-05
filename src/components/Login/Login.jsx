import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const maxLength50 = maxLengthCreator(50)

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
            <div>
                <button>Войти</button>
            </div>
           </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = props => {
    const submit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
       return <Redirect to={'/profile'}/>
    }

    return <div>
             <h1>Login</h1>
             <LoginReduxForm onSubmit={submit}/>
           </div>
}
// formData приходит , но в консоль не выводится, что-то с консолью

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);

