export const sanitize = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
