export const required = value => value ? undefined : 'This field is required'

export const maxLengthCreator = max => value =>
    value && value.length > max ? `Max length is ${max} symbols` : undefined


