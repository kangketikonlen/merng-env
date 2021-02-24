module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Kolom username tidak boleh kosong.'
    }
    if (email.trim() === '') {
        errors.email = 'Kolom email tidak boleh kosong.'
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!email.match(regEx)) {
            errors.email = 'Email tidak valid.'
        }
    }
    if (password === '') {
        errors.password = 'Kolom password tidak boleh kosong.'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Kolom password dengan konfirmasi password harus sama.'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (
    username,
    password
) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Kolom username tidak boleh kosong.'
    }
    if (password === '') {
        errors.password = 'Kolom password tidak boleh kosong.'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}