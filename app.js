const diccionarioMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
};

const textoAMorse = (text) => {
    return text.toUpperCase().split(' ').map(palabra =>
        palabra.split('').map(char => diccionarioMorse[char] || '').join(' ')
    ).join(' / '); 
};

const morseATexto = (morse) => {
    const morseToTextMap = Object.entries(diccionarioMorse).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
    return morse.split(' / ').map(palabra =>
        palabra.split(' ').map(code => morseToTextMap[code] || '').join('')
    ).join(' ');
};

const contieneCaracteresEspeciales = (text) => {
    const regex = /[^A-Z0-9 ]/i; 
    return regex.test(text);
};

const convert=()=> {
    const input = document.getElementById("inputText").value;
    const mode = document.getElementById("mode").value;
    const errorOutput = document.getElementById("errorOutput");
    let resultado = '';
    errorOutput.value = ''; 

    if (input.trim() === '') {
        errorOutput.value = 'Ingresa texto o código morse.';
        return;
    }

    if (mode === 'textoAMorse' && contieneCaracteresEspeciales(input)) {
        errorOutput.value = 'Solo se permiten letras, números y espacios ( / ).';
        return;
    }

    if (mode === 'textoAMorse') {
        resultado = textoAMorse(input);
    } else if (mode === 'morseATexto') {
        resultado = morseATexto(input);
    }

    document.getElementById("output").value = resultado;
}