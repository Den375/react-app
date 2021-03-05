import React from 'react';
import s from './FormsControls.module.css'

const FormControl = ({input, meta,  ...restProps}) => {
    const hasError = meta.touched && meta.error
    return <div className={s.formControl + " " + (hasError && s.error) }>
        <div>
            {restProps.children}
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>

}

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}


