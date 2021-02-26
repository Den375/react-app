import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: ''
    }

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

//setState() запускает перерисовку, включая все дочерние. асинхронен

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