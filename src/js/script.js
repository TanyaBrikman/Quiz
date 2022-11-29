$(document).ready(function () {
    //База всех вопросов
    let questions = [

        {
            type: 'multiselect',
            text: 'Как звали двух главных злодеев в фильме «Один дома»? Выберите два варианта ответа',
            options: [
                'Марвин',
                'Джон',
                'Гарри',
                'Стэн'
            ],
            answers: [
                '0',
                '2'
            ]
        },

        {
            type: 'image',
            text: 'Кто изображен на картинке Вупсень или Пупсень?',
            image: 'https://image.mel.fm/i/b/bKMI9CyJ1u/590.jpg',
            answer: 'Пупсень'
        },

        {
            type: 'select',
            text: 'Что на самом деле представляет из себя легендарный зеленый код из «Матрицы»?',
            options: [
                'Рецепт пельменей',
                'Рецепт Пад Тая',
                'Рецепт суши',
                'Рецепт Айдахо'
            ],
            answer: 2
        },

        {
            type: 'select',
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
            type: 'multiselect',
            text: 'Какие фильмы снимал Дени Вильнёв?',
            options: [
                'Клеопатра',
                'Дюна',
                'Убежище',
                'Пленницы'
            ],
            answers: [
                '0',
                '1',
                '3'
            ]
        },

        {
            type: 'select',
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
            type: 'select',
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
            type: 'select',
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
        defineTemplate(questionIndex)
    }
    // Вычисление прогресса
    function calculateProgress(template) {
        let progress = Math.round((1.0 + questionIndex) / questions.length * 100)
        template.find('.progress-bar').css('width', progress + '%')
    }
    // Проверка следущего вопроса
    function checkNextQuestion(nextQuestionButton) {

        let hasNextQuestion = questionIndex < questions.length - 1

        // В зависимости от того, будут ли ещё вопросы, или этот вопрос последний,
        // выводим на кнопке "Далее" соответствующую надпись
        nextQuestionButton.text(hasNextQuestion ? 'Следующий вопрос' : 'Результат')

        // Выключаем кнопку "Далее"
        nextQuestionButton.prop('disabled', true)
        // Кнопке "Далее" на клик назначаем листенер, который:
        nextQuestionButton.click(e => {
            // ... увеличивает счётчик текущего вопроса (переходим на следующий вопрос)
            questionIndex++
            // проверяем: если мы ещё НЕ дошли до конца квиза
            if (hasNextQuestion) {
                // ... показываем следующий вопрос
                defineTemplate(questionIndex)
            } else {
                // ... иначе очищаем контейнер с вопросом
                $questionContainer.empty()
                // и показываем окошко с результатом
                renderResult()
            }
        })
    }
    // Определение типа шаблона
    function defineTemplate(index) {
        let question = questions[index]
        if (!question) return

        if (question.type === 'select') {
            renderQuestionSelect(index)
        } else if (question.type === 'image') {
            renderQuestionImage(index)
        } else if (question.type === 'multiselect') {
            renderQuestionMultiSelect(index)
        }
    }

    // Функция принимает индекс вопроса, который необходимо показать,
    // ищет данный вопрос в базе вопросов и отрисовывает его на экране
    function renderQuestionMultiSelect(index) {
        let question = questions[index]
        // Шаблон вопроса с изображением и вводом ответа в поле
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
        // Внутри шаблона вопроса ищем объект с классом button-next-question - это будет кнопка "Далее"
        let $nextQuestionButton = $questionTemplate.find('.button-next-question')
        // Вставляем текст вопроса в элемент с классом question-text
        $questionText.text(question.text)

        calculateProgress($questionTemplate)

        checkNextQuestion($nextQuestionButton)
        let answerIndexes = []
        //Индексы правильных ответов
        let rightAnswerIndexes = question.answers
        //Рисуем кнопку проверки правильных ответов
        let $buttonCheck = $('<button type="button" class=" check btn btn-success" data-mdb-ripple-color="dark"><i class="fas fa-check" style="color: white"></i></button>')
        //Замораживаем кнопку проверки, пока не будет выбран хотя бы один вариант
        $buttonCheck.prop('disabled', true)

        // Рисуем варианты ответов
        for (let optionIndex in question.options) {
            let optionText = question.options[optionIndex]

            // Шаблон для варианта ответа
            let $optionTemplate = $(
                '<button type="button" class="question-option btn btn-outline-secondary" data-mdb-ripple-color="dark" style="color: black"></button>'
            )
            // Прописываем в него текст варианта ответа
            $optionTemplate.text(optionText)

            // На клик назначаем листенер, который проверяет:
            $optionTemplate.click(e => {
                //...отсутствие похожего искомого элемента в массиве выбранных вариантов ответов:
                let answerIndexOf = answerIndexes.indexOf(optionIndex, 0)
                //...если искомый элемент отсутствует в массиве, то:
                if (answerIndexOf === -1) {
                    // ... добавляем в массив индекс элемента
                    answerIndexes.push(optionIndex)
                    //... добавляем класс selected к шаблону варианта ответа
                    $optionTemplate.addClass('selected')
                    //... добавляем класс btn-secondary
                    $optionTemplate.addClass('btn-secondary')
                } else {
                    // ... иначе, удаляем кликнутый вариант ответа из массива
                    answerIndexes.splice(answerIndexOf, 1)
                    $optionTemplate.removeClass('btn-secondary')
                    $optionTemplate.removeClass('selected')
                }
                //Проверяем условие для разморозки/заморозки кнопки
                if (answerIndexes.length === 0) {
                    $buttonCheck.prop('disabled', true)
                } else {
                    $buttonCheck.prop('disabled', false)
                }
                answerIndexes.sort()
                $(e.target).blur()
            })
            // Добавляем собранную опцию в шаблон вопроса
            $optionsContainer.append($optionTemplate)
            $optionsContainer.append($buttonCheck)
        }
        // На клик назначаем листенер, который:
        $buttonCheck.click(e => {
            //... замораживает варианты ответов, которые не были выбраны,
            $optionsContainer.find('.question-option').not('.selected').prop('disabled', true)
            //... проверяет, если массив с выбранными вариантами ответов совпадает с массивом правильных вариантов, то:
            if (JSON.stringify(answerIndexes) === JSON.stringify(rightAnswerIndexes)) {
                //...помечает кнопки зелёным
                $optionsContainer.find('.question-option').filter('.selected').addClass('btn-success')
                //... увеличивает счётчик правильных ответов
                rightAnswers++
            } else {
                // ... иначе увеличивает счётчик неправильных ответов
                wrongAnswers++
                // и помечает кнопки красным цветом
                $optionsContainer.find('.question-option').filter('.selected').addClass('btn-danger')
            }
            // Размораживаем кнопку "Далее"
            $nextQuestionButton.prop('disabled', false)
            // Удаляем обработчик клика с текущего события
            $(e.target).off("click")
        })
        // ОЧИЩАЕМ КОНТЕЙНЕР С ВОПРОСОМ (там мог быть предыдущий вопрос)
        // и добавляем в него новый собранный вопрос (в этот момент он отобразится в index.html)
        $questionContainer.empty().append($questionTemplate)
    }
    // Функция принимает индекс вопроса, который необходимо показать,
    // ищет данный вопрос в базе вопросов и отрисовывает его на экране
    function renderQuestionImage(index) {
        let question = questions[index]
        // Шаблон вопроса с изображением и вводом ответа в поле
        let $questionTemplate = $(
            '<div class="container">' +
            '  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">' +
            '    <div class="card" data-mdb-toggle="animation" data-mdb-animation-start="onHover" data-mdb-animation="fade-in-right">' +
            '      <div class="progress" style="height: 6px;">' +
            '        <div class="progress-bar bg-success" role="progressbar" style="width: 0;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>' +
            '      </div>' +
            '      <h5 class="question-text card-header"></h5>' +
            '      <div class="card-body">' +
            '        <div class="question-image d-grid gap-2"></div>' +
            '      </div>' +
            '      <div class="card text-center">' +
            '      <div class="question-answer" style ="display: flex; justify-content: center">' +
            '       </div>' +
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
        // Внутри шаблона ищем объект с классом текст вопроса question-text - текст вопроса
        let $questionText = $questionTemplate.find('.question-text')
        // Внутри шаблона ищем объект с классом question-image - изображение вопроса
        let $questionImg = $questionTemplate.find('.question-image')
        // Внутри шаблона ищем объект с классом question-answer - ответ
        let $answer = $questionTemplate.find('.question-answer')
        // Внутри шаблона вопроса ищем объект с классом button-next-question - это будет кнопка "Далее"
        let $nextQuestionButton = $questionTemplate.find('.button-next-question')
        // Вставляем текс вопроса в элемент с классом .question-text
        $questionText.text(question.text)

        // Добавляем изображение в шаблон класса question-image
        let $imageTemplate = $('<img src="" class="img-thumbnail" alt="" />')
        $imageTemplate.attr('src', question.image)
        $questionImg.append($imageTemplate)

        calculateProgress($questionTemplate)

        checkNextQuestion($nextQuestionButton)

        let $inputAnswer = $('<input type="text" class="form-outline" placeholder="Введите ответ" aria-label="Введите ответ" style="right: 10px" />')

        let $buttonCheck = $('<button type="button" class="btn btn-success" id="btnCheck" data-mdb-ripple-color="dark"><i class="fas fa-check" style="color: white"></i></button>')

        $answer.append($inputAnswer).append($buttonCheck)

        let rightAnswer = question.answer.toLowerCase()

        $buttonCheck.click(e => {
            let answer = $inputAnswer.val().toLowerCase()
            if(answer === '') {
                $inputAnswer.prop('disabled', false)
            } else if (answer == rightAnswer) {
                    $inputAnswer.prop('disabled', true)
                    rightAnswers++
                    $inputAnswer.addClass('btn-success')
                    $nextQuestionButton.prop('disabled', false)
                    $(e.target).off("click")
            } else if (answer !== rightAnswer) {
                    wrongAnswers++
                    $inputAnswer.addClass('btn-danger')
                    $nextQuestionButton.prop('disabled', false)
                    $(e.target).off("click")
            }
        })
        // ОЧИЩАЕМ КОНТЕЙНЕР С ВОПРОСОМ (там мог быть предыдущий вопрос)
        // и добавляем в него новый собранный вопрос (в этот момент он отобразится в index.html)
        $questionContainer.empty().append($questionTemplate)
    }

    // Функция принимает индекс вопроса, который необходимо показать,
    // ищет данный вопрос в базе вопросов и отрисовывает его на экране
    function renderQuestionSelect(index) {
        let question = questions[index]
        // Шаблон вопроса с изображением и вводом ответа в поле
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
        // Внутри шаблона вопроса ищем объект с классом button-next-question - это будет кнопка "Далее"
        let $nextQuestionButton = $questionTemplate.find('.button-next-question')
        // Вставляем текст вопроса в элемент с классом question-text
        $questionText.text(question.text)

        // Вычисляем и отображаем прогресс
        calculateProgress($questionTemplate)

        checkNextQuestion($nextQuestionButton)

        let rightAnswer = question.answer

        // Рисуем варианты ответов
        for (let optionIndex in question.options) {
            let optionText = question.options[optionIndex]

            // Это шаблон для варианта ответа
            let $optionTemplate = $('<button type="button" class="question-option btn btn-outline-secondary" data-mdb-ripple-color="dark" style="color: black"></button>')
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
                $optionsContainer.find('.question-option').not($optionTemplate).prop('disabled', true)
                // Размораживаем кнопку "Далее"
                $nextQuestionButton.prop('disabled', false)
                $(e.target).blur()
                $(e.target).off("click")
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
