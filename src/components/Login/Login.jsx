import React from 'react'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength15 = maxLengthCreator(15)

const LoginForm = props => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="login" placeholder='Введите login' component={Input} validate={[required, maxLength15 ]} type="text" />
            </div>
            <div>
                <Field name="password" placeholder='Введите пароль' component={Input} validate={[required, maxLength15 ]} type="text" />
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
        console.log(formData)
    }
    return <div>
             <h1>Login</h1>
             <LoginReduxForm onSubmit={submit}/>
           </div>
}
// formData приходит , но в консоль не выводится, что-то с консолью
export default Login;

