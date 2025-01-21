function generatePassword() {
    const length = document.getElementById('length').value;

    // Verificar se o número de caracteres é maior que 25
    if (length > 25) {
        alert('A senha só pode ter até 25 caracteres.');
        return; // Não prosseguir com a geração da senha
    }

    const uppercase = document.getElementById('uppercase').checked;
    const special = document.getElementById('special').checked;
    const noRepeat = document.getElementById('no-repeat').checked;

    if (!length || length <= 0) {
        alert('Por favor, insira um tamanho válido para a senha.');
        return;
    }

    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (noRepeat && length > characters.length) {
        alert('A quantidade de caracteres não pode ser maior que o número possível de caracteres únicos.');
        return;
    }

    let password = '';
    const usedChars = new Set();

    for (let i = 0; i < length; i++) {
        let randomChar;
        do {
            randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        } while (noRepeat && usedChars.has(randomChar));

        if (noRepeat) usedChars.add(randomChar);
        password += randomChar;
    }

    if (special) {
        password = password.slice(0, -1) + '!'; // Adicionar caractere especial no final
    }
    if (uppercase) {
        password = password.charAt(0).toUpperCase() + password.slice(1).toLowerCase(); // Apenas a primeira letra maiúscula
    }

    document.getElementById('passwordOutput').textContent = password;
    document.getElementById('passwordOutput').style.display = 'block';
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('clearButton').style.display = 'inline-block';
}

function copyPassword() {
    const password = document.getElementById('passwordOutput').textContent;
    if (!password) return;

    navigator.clipboard.writeText(password)
        .then(() => alert('Senha copiada para a área de transferência!'))
        .catch(() => alert('Erro ao copiar a senha.'));
}

function clearPassword() {
    document.getElementById('passwordOutput').textContent = '';
    document.getElementById('passwordOutput').style.display = 'none';
    document.getElementById('copyButton').style.display = 'none';
    document.getElementById('clearButton').style.display = 'none';
}
