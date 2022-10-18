$(document).ready(function() {

    // Здесь у нас хранится база всех вопросов.
    // 
    // Теперь всё, что тебе нужно сделать, чтобы отредактировать вопрос, добавить в него
    // новые варианты ответов (любое количество, хоть 5, хоть 10) или удалить старые варианты, 
    // или добавить новый вопрос, или удалить старый ->
    //
    // нужно просто отредактировать данную "базу вопросов"
    let questions = [
        {   
            // Текст вопроса
            text: 'Что на самом деле представляет из себя легендарный зеленый код из «Матрицы»?',
            // Варианты ответов
            options: [
                'Рецепт пельменей',
                'Рецепт Пад Тая',
                'Рецепт суши',
                'Рецепт Айдахо'
            ],
            // Индекс правильного ответа (именно индекс! отсчёт с нуля, так проще в коде)
            answer: 2
        },
        {
            text: 'Чего боятся люди, которые страдают алекторофобией?',
            options: [
                'Кур',
                'Бороды',
                'Автомобилей',
                'Грозы'
            ],
            answer: 0
        },
        {
            text: 'Этот предмет используют повара на своих показательных выступлениях, чтобы убедить зрителей в мастерстве аккуратной нарезки продуктов. Настоящие профи используют еще и гвозди! Что это за предмет?',
            options: [
                'Масло',
                'Лист бумаги',
                'Деревянный нож',
                'Воздушный шарик'
            ],
            answer: 3
        },
        {
            text: 'Из какого дерева получают сырье для аспирина?',
            options: [
                'Пихта',
                'Акация',
                'Граб',
                'Ива'
            ],
            answer: 3
        },
        {
            text: 'Основное сырье, из которого делают алкогольный напиток Бурбон?',
            options: [
                'Кукуруза',
                'Просо',
                'Ячмень',
                'Овес'
            ],
            answer: 0
        }
    ]

    let $containerStart = $('#containerStart')
    let $questionContainer = $('#questionContainer')
    let $modalResult = $('#modalResult')

    // Индекс текущего вопроса
    let questionIndex = 0
    // Счётчик правильных ответов
    let rightAnswers = 0
    // Счётчик неправильных ответов
    let wrongAnswers = 0

    // На обе кнопки - "Старт" и "Попробовать ещё раз" - вешаем листенер, который перезапускает квиз
    $containerStart.find('button').click(reset)
    $modalResult.find('button').click(reset)

    // Сброс счётчиков и перезапуск теста
    function reset() {
        // Скрываем начальную страницу
        $containerStart.hide()
        // Скрываем конечную модалку с результатом
        $modalResult.modal('hide')
        questionIndex = 0
        rightAnswers = 0
        wrongAnswers = 0
        renderQuestion(questionIndex)
    }

    // Функция принимает индекс вопроса, который необходимо показать,
    // ищет данный вопрос в базе вопросов и отрисовывает его на экране
    function renderQuestion(index) {

        // Ищем вопрос в базе
        let question = questions[index]
        if (!question) return

        // Это шаблон вопроса. В jquery можно создать кусок html, 
        // который потом можно будет вставить в index.html
        let $questionTemplate = $(
            '<div class="container">' +
            '  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">' +
            '    <div class="card" data-mdb-toggle="animation" data-mdb-animation-start="onHover" data-mdb-animation="fade-in-right">' +
            '      <div class="progress" style="height: 6px;">' +
            '        <div class="progress-bar bg-success" role="progressbar" style="width: 0;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>' +
            '      </div>' +
            '      <h5 class="question-text card-header"></h5>' +
            '      <div class="card-body">' +
            '        <div class="question-options d-grid gap-2"></div>' +
            '      </div>' +
            '      <div class="card text-center">' +
            '        <div class="d-flex justify-content-center align-items-center">' +
            '          <div class="card-footer text-muted">' +
            '            <button type="button" class="button-next-question btn btn-success btn-rounded"></button>' +
            '          </div>' +
            '        </div>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
        )

        // Внутри шаблона вопроса ищем объект с классом question-text - это будет текст вопроса
        let $questionText = $questionTemplate.find('.question-text')
        // Внутри шаблона вопроса ищем объект с классом question-options - это будет контейнер с вариантами ответов
        let $optionsContainer = $questionTemplate.find('.question-options')
        // Внутри шаблона вопроса ищем объект с классом question-text - это будет кнопка "Далее"
        let $nextQuestionButton = $questionTemplate.find('.button-next-question')

        // Вставляем текст вопроса в элемент с классом question-text
        $questionText.text(question.text)

        // Вычисляем и отображаем прогресс
        let progress = Math.round((1.0 + questionIndex) / questions.length * 100)
        $questionTemplate.find('.progress-bar').css('width', progress + '%')

        let hasNextQuestion = questionIndex < questions.length - 1

        // В зависимости от того, будут ли ещё вопросы, или этот вопрос последний,
        // выводим на кнопке "Далее" соответствующую надпись
        $nextQuestionButton.text(hasNextQuestion ? 'Следующий вопрос' : 'Результат')

        // Выключаем кнопку "Далее"
        $nextQuestionButton.prop('disabled', true)
        // Кнопке "Далее" на клик назначаем листенер, который:
        $nextQuestionButton.click(e => {
            // ... увеличивает счётчик текущего вопроса (переходим на следующий вопрос)
            questionIndex++
            // проверяем: если мы ещё НЕ дошли до конца квиза
            if (hasNextQuestion) {
                // ... показываем следующий вопрос
                renderQuestion(questionIndex)
            } else {
                // ... иначе очищаем контейнер с вопросом
                $questionContainer.empty()
                // и показываем окошко с результатом
                renderResult()
            }
        })

        let rightAnswer = question.answer

        // Рисуем варианты ответов
        for (let optionIndex in question.options) {
            let optionText = question.options[optionIndex]

            // Это шаблон для варианта ответа
            let $optionTemplate = $('<button type="button" class="question-option btn btn-outline-secondary" data-mdb-ripple-color="dark"></button>')
            // Прописываем в него текст варианта ответа
            $optionTemplate.text(optionText)

            // На клик назначаем листенер, который:
            $optionTemplate.click(e => {
                // ... проверяет, если был кликнут правильный вариант ответа:
                if (optionIndex == rightAnswer) {
                    // ... увеличивает счётчик правильных ответов
                    rightAnswers++
                    // и помечает кнопку зелёным цветом
                    $optionTemplate.addClass('btn-success')
                } else {
                    // ... иначе увеличивает счётчик неправильных ответов
                    wrongAnswers++
                    // и помечает кнопку красным цветом
                    $optionTemplate.addClass('btn-danger')
                }
                // В контейнере СО ВСЕМИ ВАРИАНТАМИ ОТВЕТОВ находим все варианты и выключаем их
                $optionsContainer.find('.question-option').prop('disabled', true)
                // Размораживаем кнопку "Далее"
                $nextQuestionButton.prop('disabled', false)
            })

            // Добавляем собранную опцию в шаблон вопроса
            $optionsContainer.append($optionTemplate)
        }

        // ОЧИЩАЕМ КОНТЕЙНЕР С ВОПРОСОМ (там мог быть предыдущий вопрос) 
        // и добавляем в него новый собранный вопрос (в этот момент он отобразится в index.html)
        $questionContainer.empty().append($questionTemplate)
    }

    function renderResult() {
        let result

        // Вычисляем "оценку" на основании ДОЛИ правильных ответов
        if (rightAnswers < questions.length * 0.2) {
             // 20% правильных ответов
            result = 'Ужасно!'
        } else if (rightAnswers < questions.length * 0.5) {
            // 50% правильных ответов
            result = 'Такое соби...'
        } else if (rightAnswers < questions.length * 0.7) {
            // 70% правильных ответов
            result = 'Неплохо!'
        } else if (rightAnswers < questions.length * 0.9) {
            // 90% правильных ответов
            result = 'Хороший результат!'
        } else {
            // > 90% правильных ответов
            result = 'Ты истинный гений!'
        }

        $modalResult.find('.modal-header').text(result)
        $modalResult.find('.modal-body').text('Правильных ответов: ' + rightAnswers + ' / ' + questions.length)

        // Показываем модалку с результатом
        $modalResult.modal('show')
    }
})
