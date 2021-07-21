import React, {useState, useEffect, ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
// Исходное значение аргумента используется только при первом рендере.
//  В последующие же рендеринги useState возвращает текущее состояние
//  Если статус придет позже profile , то props.status будет отличаться от status локального
// Нужно синхронизировать используем для этого useEffect

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


        return <>
            {!editMode &&
            <div>
             <b>Status</b>: <span onClick={activateEditMode}>{props.status || '-----'}</span>
            </div>}
            {editMode &&
            <div>
              <input onChange={onStatusChange} autoFocus={true}
                     onBlur={deactivateEditMode} value={status}/>
            </div>}
               </>
}

export default ProfileStatusWithHooks;