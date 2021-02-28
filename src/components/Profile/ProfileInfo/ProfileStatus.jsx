import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }
     /*!!!
     Oбъект создается при первой отрисовке.
     Когда приходит новый статус в пропсах сам по себе он не обновиться в local state.
     Когда приходит новый статус
     в пропсах, локальный state сам не изменится, сonnect запустит render(), но не
     изменит локальный state.
     статус в span изменится на новый т.к. он в рендере и из пропсов, а в input нет т.к. он берет state
     локальный.
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

    onStatusChange = (e) => {
       this.setState({
           status: e.currentTarget.value
       })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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