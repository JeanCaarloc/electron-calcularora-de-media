function fecharApp() {
    document.getElementById('input-nome').value = '';
    document.getElementById('input').value = '';
    document.getElementById('nome-display').innerText = '';
    document.getElementById('media-display').innerText = '';
    window.close();
}

function updateDisplay() {
    const nome = document.getElementById('input-nome').value;
    const input = document.getElementById('input').value;
    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== ''); // Adicionada a verificação para evitar notas vazias
    const display = numbers.join(' + ');
    document.getElementById('nome-display').innerText = nome;
    document.getElementById('media-display').innerText = display;
}

function calculate() {
    const nome = document.getElementById('input-nome').value;
    const input = document.getElementById('input').value;
    const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num) && num >= 0 && num <= 10); // Adicionada a verificação para notas entre 0 e 10
    
    if (numbers.length === 0) {
        document.getElementById('media-display').innerText = 'Por favor, insira números válidos entre 0 e 10.';
        return;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    const status = average >= 7 ? 'Aprovado(a)' : 'Reprovado(a)';
    
    document.getElementById('media-display').innerText = `Sua média é: ${average.toFixed(2)}. ${status}`;
}

function reiniciar() {
    document.getElementById('input-nome').value = '';
    document.getElementById('input').value = '';
    document.getElementById('nome-display').innerText = '';
    document.getElementById('media-display').innerText = '';
}

// Adicione um event listener para validar as notas conforme o usuário digita
document.getElementById('input').addEventListener('input', function() {
    const input = this.value;
    const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    const invalidNumbers = numbers.some(num => num < 0 || num > 10); // Verifica se há notas fora do intervalo 0-10
    
    if (invalidNumbers) {
        this.value = numbers.filter(num => num >= 0 && num <= 10).join(', '); // Remove notas inválidas
        updateDisplay();
    }
});
