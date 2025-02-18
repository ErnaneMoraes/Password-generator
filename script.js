function generatePassword() {
    let length = parseInt(document.getElementById('length').value, 10);

    // Verificar se o tamanho está dentro do limite permitido
    if (length < 8 || length > 10) {
        alert('A senha deve ter entre 8 e 10 caracteres.');
        return;
    }

    const specialCharacters = ['@', '#', '*'];
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyz';

    let password = '';
    let usedChars = new Set();

    // 1º Caractere: Uma letra maiúscula
    let firstChar;
    do {
        firstChar = letters.charAt(Math.floor(Math.random() * letters.length)).toUpperCase();
    } while (usedChars.has(firstChar));
    password += firstChar;
    usedChars.add(firstChar);

    // Próximos caracteres: Letras minúsculas
    for (let i = 1; i < length - 3; i++) { // Excluindo os 3 últimos caracteres
        let lowerChar;
        do {
            lowerChar = letters.charAt(Math.floor(Math.random() * letters.length));
        } while (usedChars.has(lowerChar));
        password += lowerChar;
        usedChars.add(lowerChar);
    }

    // Penúltimo e antipenúltimo: Números distintos
    let numPart = '';
    for (let i = 0; i < 2; i++) {
        let randomNumber;
        do {
            randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        } while (usedChars.has(randomNumber)); // Garantir que os números sejam distintos
        numPart += randomNumber;
        usedChars.add(randomNumber);
    }
    password += numPart;

    // Último caractere: Um símbolo especial
    let lastChar;
    do {
        lastChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    } while (usedChars.has(lastChar)); // Garantir que o caractere especial não seja repetido
    password += lastChar;

    // Exibir a senha gerada
    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.value = password;
    passwordOutput.style.display = 'block';

    document.getElementById('copyButton').style.display = 'flex';
    document.getElementById('clearButton').style.display = 'flex';
}


function copyPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
    const password = passwordOutput.value; // Pega o valor do campo de entrada
    if (!password) return;

    navigator.clipboard.writeText(password)
        .then(() => alert('Senha copiada para a área de transferência!'))
        .catch(() => alert('Erro ao copiar a senha.'));
}

function clearPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.value = ''; // Limpa o valor do campo de entrada
    passwordOutput.style.display = 'none';
    document.getElementById('copyButton').style.display = 'none';
    document.getElementById('clearButton').style.display = 'none';
}
