import React from 'react';
import s from './FormsControls.module.css'

const FormControl = (props) => {
    const hasError = props.meta.touched && props.meta.error
    //debugger
    return <div className={s.formControl + " " + (hasError && s.error) }>
        <div>
            {props.children}
        </div>
        {hasError && <span>{props.meta.error}</span>}
    </div>
}

export const Input = ({input, meta, ...restProps}) => {
    return <FormControl meta={meta}><input {...input} {...restProps}/></FormControl>
}

export const Textarea = ({input, meta, ...restProps}) => {
    return <FormControl meta={meta}><textarea {...input} {...restProps}/></FormControl>
}

///<FormControl meta={meta}><textarea {...input} {...restProps}/></FormControl> textarea закидывается в
// пропсы формконтрол props = {meta:{...}, children{...}}