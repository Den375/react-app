import React, {useState, useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

// когда придет новый статус хуки уже были вызваны и их результат храниться в реакт, при смене пропсов и новом
//вызове ф-ии они повторно не будут вызываться. В span статус напрямую из пропсов измениться, а в input нет. Нужно синхронизировать
//используем для этого useEffect

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }


        return <>
            {!editMode && <div>
                              <span onClick={activateEditMode}>{props.status || '-----'}</span>
                            </div>}
            {editMode && <div>
                              <input onChange={onStatusChange} autoFocus={true}
                                     onBlur={deactivateEditMode} value={status}/>
                           </div>}
               </>
}

export default ProfileStatusWithHooks;