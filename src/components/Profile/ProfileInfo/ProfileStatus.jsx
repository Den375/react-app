import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }

//setState() запускает перерисовку, включая все дочерние. асинхронен

    render() {
        return <>
            {!this.state.editMode && <div>
                              <span onClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                            </div>}
            {this.state.editMode && <div>
                              <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                           </div>}
               </>
    }
}

export default ProfileStatus;