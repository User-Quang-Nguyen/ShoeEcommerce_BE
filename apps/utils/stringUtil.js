function hasSpace(str) {
    return str.indexOf(' ') !== -1;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isWhitespaceOrEmpty(str) {
    const whitespaceRegex = /^\s*$/;
    return whitespaceRegex.test(str);
}

function isValidPhone(number) {
    const phoneNumberRegex = /^(0[1-9][0-9]{8}|84[1-9][0-9]{7})$/;
    return phoneNumberRegex.test(number);
}


module.exports = {
    hasSpace: hasSpace,
    isValidEmail: isValidEmail,
    isWhitespaceOrEmpty: isWhitespaceOrEmpty,
    isValidPhone: isValidPhone,
}