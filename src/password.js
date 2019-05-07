export const passwordSection = document.querySelector('.password')
const passwordInput = document.querySelector('.password-input')
export const passwordButton = document.querySelector('.password-button')
const passwordInfo = document.querySelector('.password-info')

export const checkPassword = (e) => {
    e.preventDefault()
    const password = {
        value: passwordInput.value
    }

    if (password.value == 'Ekipa1') {
        passwordSection.style.display = 'none'
        localStorage.setItem('passwordValue', JSON.stringify(password))
    } else {
        passwordInfo.innerText = 'Błędne hasło. Spróbuj ponownie.'
        passwordInput.value = ''
    }
}