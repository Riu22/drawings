document.addEventListener('DOMContentLoaded', (event) => {
    const password_input = document.getElementById('password');
    const submit_button = document.getElementById('registerButton');
    const password_error_div = document.getElementById('passwordError');

    if (password_input && submit_button && password_error_div) {
        submit_button.disabled = true;

        password_input.addEventListener('input', () => {
            const password = password_input.value;
            const min_length = 5;
            const is_password_valid = password.length >= min_length;

            submit_button.disabled = !is_password_valid;

            if (is_password_valid) {
                password_error_div.textContent = '';
            } else {
                password_error_div.textContent = 'La contraseña debe tener al menos 5 caracteres.';
            }
        });
    }
});
