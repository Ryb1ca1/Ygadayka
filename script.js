// Функция для преобразования числа в текстовую форму
function numberToWords(number) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const sotki = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    const numToWords = (num) => {
        if (num === 0) return 'ноль';
        if (num < 10) return units[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
        if (num < 1000) return sotki[Math.floor(num / 100)] + (num % 100 !== 0 ? ' ' + numToWords(num % 100) : '');
        return 'Число слишком большое для данной функции';
    };

    const words = numToWords(Math.abs(number));

    return (number < 0) ? `минус ${words}` : words;
}

document.getElementById('btnSetup').addEventListener('click', function() {
    document.getElementById('orderNumberField').innerText = '0';
    document.getElementById('answerField').innerText = 'Настройте параметры и я попробую угадать число, которое вы загадали';
});

document.getElementById('btnApply').addEventListener('click', function() {

    let minValue, maxValue, orderNumber, answerNumber, gameRun;

    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');
    const toastBody = document.getElementById('toastBody');

    function setGameParameters() {

        minValue = parseInt(document.getElementById('minValueInput').value);
        maxValue = parseInt(document.getElementById('maxValueInput').value);

        // Проверка и коррекция ввода на предельные значения
        minValue = Math.max(-999, isNaN(minValue) ? 0 : minValue);
        maxValue = (maxValue < -999 || isNaN(maxValue)) ? 100 : (maxValue > 999) ? 999 : maxValue;

        if (minValue > maxValue) {
            showNotification('Некорректные значения. Минимальное значение не может быть больше максимального.');
            return;
        }

        orderNumber = 1;
        gameRun = true;
        answerNumber = Math.floor((minValue + maxValue) / 2);

        orderNumberField.innerText = orderNumber;
        answerField.innerText = `Вы загадали число ${numberToWords(answerNumber)}?`;
        $('#gameSettingsCollapse').collapse('hide'); // Закрыть коллапс после установки параметров
    }

    function showNotification(message) {
        toastBody.innerText = message;
        $('.toast').toast('show');
    }

    // Кнопка "Применить" для установки параметров игры
    document.getElementById('btnApply').addEventListener('click', setGameParameters());
    // Кнопка "Заново" для сброса игры
    // document.getElementById('btnRetry').addEventListener('click', ()=> {
    //     $('#gameSettingsCollapse').collapse('show'); // Показать коллапс для ввода параметров
    // });

    // Кнопка "Загадали больше" для угадывания числа
    document.getElementById('btnOver').addEventListener('click', ()=> {
        if (gameRun) {
            console.log(answerNumber)
            if (minValue === maxValue) {
                answerField.innerText = `Вы загадали неправильное число!`;
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
    });

    // Кнопка "Загадали меньше" для угадывания числа
    document.getElementById('btnLess').addEventListener('click', ()=> {
        if (gameRun) {
            if (minValue >= answerNumber) {
                answerField.innerText = `Вы загадали неправильное число!`;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phrases = [
                    `Да это легко! Ты загадал ${numberToWords(answerNumber)}!`,
                    `Наверное, это число ${numberToWords(answerNumber)}.`,
                    `Может быть, ты думаешь о ${numberToWords(answerNumber)}?`
                ];
                const randomIndex = Math.floor(Math.random() * phrases.length);
                answerField.innerText = phrases[randomIndex];
            }
        }
    });

    // Кнопка "Верно!" для завершения игры
    document.getElementById('btnEqual').addEventListener('click', ()=> {
        if (gameRun) {
            const phrases = [
                `Я всегда угадываю!`,
                `Невероятно! Ты загадал ${numberToWords(answerNumber)}!`,
                `Это было легко, загаданное число - ${numberToWords(answerNumber)}.`
            ];
            const randomIndex = Math.floor(Math.random() * phrases.length);
                        answerField.innerText = phrases[randomIndex];
            gameRun = false;
        }
    });
});
