function generatePassword() {
    const length = parseInt(document.getElementById('length').value, 10);
    const uppercase = document.getElementById('uppercase').checked;
    const special = document.getElementById('special').checked;
    const noRepeat = document.getElementById('no-repeat').checked;

    if (!length || length <= 0) {
        alert('Por favor, insira um tamanho válido para a senha.');
        return;
    }

    const baseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
    let characters = baseCharacters + baseCharacters.toUpperCase();

    if (noRepeat && length > characters.length) {
        alert('A quantidade de caracteres não pode ser maior que o número possível de caracteres únicos.');
        return;
    }

    let password = '';
    const usedChars = new Set();

    // Gera a senha inicial com ou sem repetição de caracteres
    for (let i = 0; i < length; i++) {
        let randomChar;
        do {
            randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        } while (noRepeat && usedChars.has(randomChar));

        if (noRepeat) usedChars.add(randomChar);
        password += randomChar;
    }

    // Ajusta a primeira letra maiúscula, se necessário
    if (uppercase) {
        password = password.charAt(0).toUpperCase() + password.slice(1).toLowerCase();
    }

    // Ajusta o último caractere para ser especial, se necessário
    if (special) {
        const randomSpecialChar = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
        password = password.slice(0, -1) + randomSpecialChar;
    }

    // Exibe a senha gerada
    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.textContent = password;
    passwordOutput.style.display = 'block'; // Mostra a caixa de senha

    // Exibe os botões
    document.getElementById('actions').style.display = 'block';
}

function copyPassword() {
    const password = document.getElementById('passwordOutput').textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert('Senha copiada para a área de transferência!');
    }).catch(() => {
        alert('Falha ao copiar a senha.');
    });
}

function clearPassword() {
    // Limpa a saída e oculta os elementos
    document.getElementById('passwordOutput').textContent = '';
    document.getElementById('passwordOutput').style.display = 'none';
    document.getElementById('actions').style.display = 'none';
}
