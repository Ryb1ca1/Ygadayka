// Функция для преобразования числа в текстовую форму
function numberToWords(number) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто','сто'];

    const numToWords = (num) => {
        if (num === 0) return 'ноля';
        if (num < 10) return units[num];
        if (num < 20) return teens[num - 10];
        return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
    };

    const words = numToWords(Math.abs(number));

    return (number < 0) ? `минус ${words}` : words;
}

let minValue = parseInt(prompt('Минимальное значение числа для игры', '0'));
let maxValue = parseInt(prompt('Максимальное значение числа для игры', '100'));

// Проверка и коррекция ввода на предельные значения
minValue = (minValue < -999 || isNaN(minValue)) ? 0 : (minValue > 999) ? 999 : minValue;
maxValue = (maxValue < -999 || isNaN(maxValue)) ? 100 : (maxValue > 999) ? 999 : maxValue;

// Если введенные значения не корректны, предложим новый ввод
if (minValue > maxValue) {sa
    alert('Некорректные значения. Минимальное значение не может быть больше максимального.');
    minValue = parseInt(prompt('Введите корректное минимальное значение', '0'));
    maxValue = parseInt(prompt('Введите корректное максимальное значение', '100'));

    // Проверка и коррекция ввода на предельные значения после повторного ввода
    minValue = (minValue < -999 || isNaN(minValue)) ? 0 : (minValue > 999) ? 999 : minValue;
    maxValue = (maxValue < -999 || isNaN(maxValue)) ? 100 : (maxValue > 999) ? 999 : maxValue;
}

alert(`Загадайте любое целое число от ${numberToWords(minValue)} до ${numberToWords(maxValue)}, а я его угадаю`);
let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${numberToWords(answerNumber)}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Минимальное значение числа для игры', '0'));
    maxValue = parseInt(prompt('Максимальное значение числа для игры', '100'));

    // Проверка и коррекция ввода на предельные значения
    minValue = (minValue < -999 || isNaN(minValue)) ? 0 : (minValue > 999) ? 999 : minValue;
    maxValue = (maxValue < -999 || isNaN(maxValue)) ? 100 : (maxValue > 999) ? 999 : maxValue;

    // Если введенные значения не корректны, предложим новый ввод
    if (minValue > maxValue) {
        alert('Некорректные значения. Минимальное значение не может быть больше максимального.');
        minValue = parseInt(prompt('Введите корректное минимальное значение', '0'));
        maxValue = parseInt(prompt('Введите корректное максимальное значение', '100'));

        // Проверка и коррекция ввода на предельные значения после повторного ввода
        minValue = (minValue < -999 || isNaN(minValue)) ? 0 : (minValue > 999) ? 999 : minValue;
        maxValue = (maxValue < -999 || isNaN(maxValue)) ? 100 : (maxValue > 999) ? 999 : maxValue;
    }

    alert(`Загадайте любое целое число от ${numberToWords(minValue)} до ${numberToWords(maxValue)}, а я его угадаю`);
    orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${numberToWords(answerNumber)}?`;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const phrases = [
                `Да это просто! Ты загадал ${numberToWords(answerNumber)}!`,
                `Это, должно быть, число ${numberToWords(answerNumber)}.`,
                `Верно, ты думаешь о ${numberToWords(answerNumber)}?`
            ];

            const randomIndex = Math.floor(Math.random() * phrases.length);
            answerField.innerText = phrases[randomIndex];
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            // Варианты разнообразных сообщений при предположении числа
            const phrases = [
                `Да это легко! Ты загадал ${numberToWords(answerNumber)}!`,
                `Наверное, это число ${numberToWords(answerNumber)}.`,
                `Может быть, ты думаешь о ${numberToWords(answerNumber)}?`
            ];

            const randomIndex = Math.floor(Math.random() * phrases.length);
            answerField.innerText = phrases[randomIndex];
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phrases = [
            `Я всегда угадываю!\n\u{1F60E}`,
            `Невероятно! Ты загадал ${numberToWords(answerNumber)}!`,
            `Это было легко, загаданное число - ${numberToWords(answerNumber)}.`
        ];

        const randomIndex = Math.floor(Math.random() * phrases.length);
        answerField.innerText = phrases[randomIndex];

        gameRun = false;
    }
})
