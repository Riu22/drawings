const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('registerButton');
const passwordErrorDiv = document.getElementById('passwordError');

passwordInput.addEventListener('input', () => {
    // 1. Validamos la contraseña una sola vez y guardamos el resultado.
    const isPasswordValid = validatePassword(passwordInput.value);
    // 2. Usamos el resultado para actualizar el estado del botón.
    updateSubmitButtonState(isPasswordValid);
});

function validatePassword(password) {
    const minLength = 5;
    const isValid = password.length >= minLength;
    console.log('Password:', password, 'Is valid?', isValid);
    return isValid;
}

function updateSubmitButtonState(isValid) {
    submitButton.disabled = !isValid; // Deshabilita el botón si la contraseña no es válida.
    submitButton.innerHTML = 'Register'; // El texto del botón ya no cambia.

    if (isValid) {
        passwordErrorDiv.innerHTML = ''; // Si es válida, borra el mensaje de error.
    } else {
        passwordErrorDiv.innerHTML = 'Password must be at least 5 characters long'; // Si es falsa, muestra el error en el div.
    }
}
