import React, {ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status // по приходу нового статуса локальный статус не синхронизирован со статусом из пропсов, делаем DidUpdate
    }
     /*!!!
     connect апдейтит this.props но не this.state, который после создания объекта не изменится
     DidUpdate срабатывает при изменении пропсов или локального state, используем
     это чтобы синхронизировать state.
     */

    //setState() запускает перерисовку, включая все дочерние. асинхронен

    activateEditMode = () => {
        this.setState({
                editMode: true
            })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement> ) => {
       this.setState({
           status: e.currentTarget.value
       })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        // условие чтобы не зациклился апдейт
        if (prevProps.status !== this.props.status ) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <>
            {!this.state.editMode && <div>
                              <span onClick={this.activateEditMode}>{this.props.status || '-----'}</span>
                            </div>}
            {this.state.editMode && <div>
                              <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status}/>
                           </div>}
               </>
    }
}

export default ProfileStatus;