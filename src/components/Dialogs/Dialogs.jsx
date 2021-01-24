import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements =  props.dialogsPage.dialogs.map( d => <DialogItem name={d.name} id={d.id} />  );
    let messagesElements = props.dialogsPage.messages.map( m => <Message message={m.message}/> );

    let newMessage = React.createRef();

    let onMessageChange = () => {
        let text = newMessage.current.value;
        let action = {type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text};
        props.dispatch(action)
    }
    let addMessage = () => {
        props.dispatch({type: 'ADD-MESSAGE'})
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
                <div className={s.sendMessage}>
                <textarea onChange={onMessageChange} ref={newMessage} value={props.dialogsPage.newMessageText}/>
                </div>
                <div>
                <button onClick={addMessage}>send message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;