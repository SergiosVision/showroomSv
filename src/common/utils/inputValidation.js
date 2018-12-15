export const required = value => {
    if (typeof value === 'string') {
        value = value.trim()
    }

    if (!value) {
        return 'Required'
    }
}

export const maxLength = max => value => value && value.length > max ? `Max ${max} characters` : undefined
export const maxLength3 = maxLength(3)
export const maxLength10 = maxLength(10)
export const maxLength20 = maxLength(20)
export const maxLength30 = maxLength(30)
export const maxLength35 = maxLength(35)
export const maxLength50 = maxLength(50)
export const maxLength100 = maxLength(100)
export const maxLength120 = maxLength(120)