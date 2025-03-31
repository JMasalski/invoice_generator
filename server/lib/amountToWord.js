function amountToWords(amount) {
    if (typeof amount !== 'number') {
        throw new Error('Wartość musi być liczbą');
    }

    // Rozdzielamy część całkowitą i dziesiętną
    const parts = amount.toFixed(2).split('.');
    const wholePart = parseInt(parts[0]);
    const decimalPart = parts[1];

    // Tablica z nazwami jednostek
    const units = [
        '', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć',
        'sześć', 'siedem', 'osiem', 'dziewięć', 'dziesięć',
        'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście',
        'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście'
    ];

    // Tablica z nazwami dziesiątek
    const tens = [
        '', '', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt',
        'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt'
    ];

    // Tablica z nazwami setek
    const hundreds = [
        '', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset',
        'sześćset', 'siedemset', 'osiemset', 'dziewięćset'
    ];

    // Funkcja konwertująca trzycyfrowy blok liczby na słowa
    function convertThreeDigits(number) {
        if (number === 0) return '';

        const h = Math.floor(number / 100);
        const t = Math.floor((number % 100) / 10);
        const u = number % 10;

        let result = h > 0 ? hundreds[h] + ' ' : '';

        if (t === 1) {
            // Dla liczb od 10 do 19
            result += units[10 + u]; // Poprawka uwzględniająca "dziesięć" (gdy u=0)
        } else if (t > 0 || u > 0) {
            result += t > 0 ? tens[t] + ' ' : '';
            result += u > 0 ? units[u] : '';
        }

        return result.trim();
    }

    // Wybór odpowiedniej formy dla liczby (np. tysiąc/tysiące/tysięcy)
    function getNumberForm(number, forms) {
        if (number === 1) {
            return forms[0]; // np. tysiąc
        }

        const lastDigit = number % 10;
        const lastTwoDigits = number % 100;

        if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
            return forms[1]; // np. tysiące
        }

        return forms[2]; // np. tysięcy
    }

    // Forma słowa "złoty" w zależności od liczby
    function getZlotyForm(num) {
        if (num === 1) return 'PLN';

        const lastDigit = num % 10;
        const lastTwoDigits = num % 100;

        if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
            return 'PLN';
        }

        return 'PLN';
    }

    // Jeśli liczba to zero
    if (wholePart === 0) {
        return 'zero PLN ' + decimalPart + '/100';
    }

    // Rozdzielamy liczbę na bloki po 3 cyfry
    const blocks = [];
    let tempWhole = wholePart;

    while (tempWhole > 0) {
        blocks.push(tempWhole % 1000);
        tempWhole = Math.floor(tempWhole / 1000);
    }

    // Formy dla różnych wielkości
    const forms = [
        ['', '', ''], // jedności
        ['tysiąc', 'tysiące', 'tysięcy'], // tysiące
        ['milion', 'miliony', 'milionów'], // miliony
        ['miliard', 'miliardy', 'miliardów'] // miliardy
    ];

    // Budujemy wynik
    let result = '';

    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i] === 0) continue;

        const blockText = convertThreeDigits(blocks[i]);

        if (blockText) {
            if (result) result += ' ';
            result += blockText;

            // Dodajemy nazwę wielkości (tysiąc, milion, itp.) jeśli nie jest to ostatni blok
            if (i > 0) {
                result += ' ' + getNumberForm(blocks[i], forms[i]);
            }
        }
    }

    return result + ' ' + getZlotyForm(wholePart) + ' ' + decimalPart + '/100';
}

export default amountToWords;
// console.log(amountToWords(12.23)); // "dziesięć złotych 23/100"
// console.log(amountToWords(123.45)); // "sto dwadzieścia trzy złote 45/100"
// console.log(amountToWords(1234.56)); // "tysiąc dwieście trzydzieści cztery złote 56/100"
// console.log(amountToWords(1000000.00)); // "milion złotych 00/100"