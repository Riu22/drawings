document.addEventListener('DOMContentLoaded', (event) => {
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('registerButton');
    const passwordErrorDiv = document.getElementById('passwordError');

    if (passwordInput && submitButton && passwordErrorDiv) {
        submitButton.disabled = true;

        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const minLength = 5;
            const isPasswordValid = password.length >= minLength;

            submitButton.disabled = !isPasswordValid;

            if (isPasswordValid) {
                passwordErrorDiv.textContent = '';
            } else {
                passwordErrorDiv.textContent = 'La contraseña debe tener al menos 5 caracteres.';
            }
        });
    }
});
