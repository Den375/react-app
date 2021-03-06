import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../utils/validators/validators";
import {DialogType, MessageType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.messages.map(m => <Message message={m.message}/>);

    const sendMessage = (values: NewMessageFormValuesType) => {
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

export const maxLength40 = maxLengthCreator(40)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = props => {
    return <form onSubmit={props.handleSubmit}>
                <div className={s.sendMessage}>
                    <Field name='newMessageBody' component={Textarea} validate={maxLength40}
                           type="text" placeholder='Введите сообщение'/>
                </div>
                <div>
                    <button>send message</button>
                </div>
           </form>
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;