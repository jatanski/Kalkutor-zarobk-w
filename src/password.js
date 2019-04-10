const passwordSection = document.querySelector('.password')
const passwordInput = document.querySelector('.password-input')
export const passwordButton = document.querySelector('.password-button')
const passwordInfo = document.querySelector('.password-info')

export const checkPassword = (e) => {
    e.preventDefault()
    const password = passwordInput.value
    if (password == 'Dupa1') {
        passwordSection.style.display = 'none'
    } else {
        passwordInfo.innerText = 'Błędne hasło. Spróbuj ponownie.'
        passwordInput.value = ''
    }
}