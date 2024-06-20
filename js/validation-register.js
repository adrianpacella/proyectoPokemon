document.getElementById('formRegister').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario para validar

    let isValid = true;

    const fields = [
        'firstname',
        'lastname',
        'direccion',
        'email',
        'password',
        'interests',
        'terms',
        'profile-pic'
    ];

    fields.forEach(field => {
        const input = document.getElementById(field);
        const errorDiv = document.getElementById(`error-${field}`);
        if (input.type === 'file') {
            if (input.files.length === 0) {
                errorDiv.textContent = 'Este campo es obligatorio.';
                isValid = false;
            } else {
                errorDiv.textContent = '';
            }
        } else if (!input.value.trim()) {
            errorDiv.textContent = 'Este campo es obligatorio.';
            isValid = false;
        } else {
            errorDiv.textContent = '';
        }
    });

    // Validar género
    const genderInputs = document.getElementsByName('gender');
    const genderErrorDiv = document.getElementById('error-gender');
    if (![...genderInputs].some(input => input.checked)) {
        genderErrorDiv.textContent = 'Este campo es obligatorio.';
        isValid = false;
    } else {
        genderErrorDiv.textContent = '';
    }

    if (isValid) {
        alert('Formulario enviado correctamente');
        // Puedes enviar el formulario aquí si es necesario
        // this.submit();
    }
});
