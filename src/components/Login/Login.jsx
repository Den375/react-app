import React from 'react'
import {Field, reduxForm} from "redux-form";

const LoginForm = props => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="login" placeholder='Введите login' component="input" type="text" />
            </div>
            <div>
                <Field name="password" placeholder='Введите пароль' component="input" type="text" />
            </div>
            <div>
                <Field name="rememberMe" component="input" type="checkbox" /> Запомнить меня
            </div>
            <div>
                <button>Войти</button>
            </div>
           </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = props => {
    const submit = (formData) => {
        console.log(formData)
    }
    return <div>
             <h1>Login</h1>
             <LoginReduxForm onSubmit={submit}/>
           </div>
}
// formData приходит , но в консоль не выводится, что-то с консолью
export default Login;

