const validator = {}

/**
 * It checks whether the input string is an email.
 *
 * @param {string} email the email.
 * @returns {boolean} whether the string has an email properties.
 */
validator.isEmail = (email) => {
  const result = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
  return result.test(email)
}

/**
 * It checks whether the input string is a proper password.
 *
 * @param {string} password the given password.
 * @returns {boolean} whether the string has 8 charchters inc. one in upper case, one in lower case and a digit.
 */
validator.isPassword = (password) => {
  let upperCounter = 0
  let lowerCounter = 0
  let digitCounter = 0

  for (let index = 0; index < password.length; index++) {
    var digit = password[index]
    if (password[index] === password[index].toUpperCase()) {
      upperCounter++
    } else if (password[index] === password[index].toLowerCase()) {
      lowerCounter++
    } else if (digit >= 0 || digit <= 9) {
      digitCounter++
    }
  }
  return upperCounter > 0 && lowerCounter > 0 && digitCounter >= 0
}

/**
 * It checks whether the provided input has the characteristics of a name.
 *
 * @param {string} someName the input.
 * @returns {boolean} whether it is a name.
 */
validator.isName = (someName) => {
  if (someName === '') {
    return false
  } else if (someName.length < 2 || /[^a-zA-Z]/.test(someName)) {
    return false
  } else {
    return true
  }
}

module.exports = validator
