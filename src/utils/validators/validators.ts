type FieldValidatorType = (value: string) => string | undefined


export const required: FieldValidatorType = value => value ? undefined : 'This field is required'

export const maxLengthCreator = (max: number):FieldValidatorType => value =>
    value && value.length > max ? `Max length is ${max} symbols` : undefined


