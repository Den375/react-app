import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message}/>);

    const sendMessage = (values) => {
        props.addMessage(values.newMessageBody)
    }

    return <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={sendMessage}/>
            </div>
        </div>
}

const AddMessageForm = props => {
    return <form onSubmit={props.handleSubmit}>
                <div className={s.sendMessage}>
                    <Field name="newMessageBody" component="textarea" type="text" />
                </div>
                <div>
                    <button>send message</button>
                </div>
           </form>
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;