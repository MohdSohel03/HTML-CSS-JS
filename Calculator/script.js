function appendCharacter(char) {
    document.getElementById('display').value += char;
}
function clearDisplay() {
    document.getElementById('display').value = '';
}
function calculateResult() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (e) {
        alert('Invalid Expression');
    }
}
function toggleSign() {
    let display = document.getElementById('display');
    if (display.value) {
        display.value = display.value.startsWith('-') ? display.value.substring(1) : '-' + display.value;
    }
}