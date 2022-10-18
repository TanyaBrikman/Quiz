$(document).ready(function(){
let btnStart = $('#btnStart');
let containerStart = $('#containerStart');
let containerQuestion1 = $('#containerQuestion1');
let containerQuestion2 = $('#containerQuestion2');
let containerQuestion3 = $('#containerQuestion3');
let containerQuestion4 = $('#containerQuestion4');
let containerQuestion5 = $('#containerQuestion5');
let btnNext = $('.btn-success');
let modalBody = $('.modal-body');
let btnClose = $('.btn-close');
let modalFooter = $('.modal-footer');
let modal = $('.modal');


let count = 0;

btnStart.click( e => {
    containerStart.toggle();
});

function getQuestion1 () {

    function showQuestion2() {
        btnNext.click(() => {
           containerQuestion1.hide();
           containerQuestion2.show();
        })
    }

    let ask1 = $('#ask1-1');
    let ask2 = $('#ask1-2');
    let ask3 = $('#ask1-3');
    let ask4 = $('#ask1-4');

        ask1.click(() => {
            ask1.removeClass('btn btn-outline-secondary');
            ask1.addClass('btn btn-danger');
            ask2.prop("disabled", true);
            ask3.prop("disabled", true);
            ask4.prop("disabled", true);
            showQuestion2();
        })

        ask2.click(() => {
            ask2.removeClass('btn btn-outline-secondary')
            ask2.addClass('btn btn-danger');
            ask1.prop("disabled", true);
            ask3.prop("disabled", true);
            ask4.prop("disabled", true);
            showQuestion2();
        })
        ask3.click(() => {
            ask3.removeClass('btn btn-outline-secondary')
            ask3.addClass('btn btn-success');
            ask2.prop("disabled", true);
            ask1.prop("disabled", true);
            ask4.prop("disabled", true);
            count++;
            showQuestion2();
        })
        ask4.click(() => {
            ask4.removeClass('btn btn-outline-secondary')
            ask4.addClass('btn btn-danger');
            ask2.prop("disabled", true);
            ask3.prop("disabled", true);
            ask1.prop("disabled", true);
            showQuestion2();
        })
}
getQuestion1();

function getQuestion2 () {

    function showQuestion3() {
        btnNext.click(() => {
            containerQuestion2.hide();
            containerQuestion3.show();
        })
    }

    let ask1 = $('#ask2-1');
    let ask2 = $('#ask2-2');
    let ask3 = $('#ask2-3');
    let ask4 = $('#ask2-4');

    ask1.click(() => {
        ask1.removeClass('btn btn-outline-secondary');
        ask1.addClass('btn btn-success');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        count++;
        showQuestion3();
    })

    ask2.click(() => {
        ask2.removeClass('btn btn-outline-secondary')
        ask2.addClass('btn btn-danger');
        ask1.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion3();
    })
    ask3.click(() => {
        ask3.removeClass('btn btn-outline-secondary')
        ask3.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask1.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion3();

    })
    ask4.click(e => {
        ask4.removeClass('btn btn-outline-secondary')
        ask4.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask1.prop("disabled", true);
        showQuestion3();
    })
}
getQuestion2();

function getQuestion3 () {

    function showQuestion4() {
        btnNext.click(() => {
            containerQuestion3.hide();
            containerQuestion4.show();
        });
    }

    let ask1 = $('#ask3-1');
    let ask2 = $('#ask3-2');
    let ask3 = $('#ask3-3');
    let ask4 = $('#ask3-4');

    ask1.click(e => {
        ask1.removeClass('btn btn-outline-secondary');
        ask1.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion4();

    })

    ask2.click(e => {
        ask2.removeClass('btn btn-outline-secondary')
        ask2.addClass('btn btn-danger');
        ask1.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion4();
    })
    ask3.click(e => {
        ask3.removeClass('btn btn-outline-secondary')
        ask3.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask1.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion4();
    })
    ask4.click(e => {
        ask4.removeClass('btn btn-outline-secondary')
        ask4.addClass('btn btn-success');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask1.prop("disabled", true);
        count++;
        showQuestion4();
    })
}
getQuestion3();

function getQuestion4 () {

    function showQuestion5() {
        btnNext.click(() => {
            containerQuestion4.hide();
            containerQuestion5.show();
        });
    }

    let ask1 = $('#ask4-1');
    let ask2 = $('#ask4-2');
    let ask3 = $('#ask4-3');
    let ask4 = $('#ask4-4');

    ask1.click(e => {
        ask1.removeClass('btn btn-outline-secondary');
        ask1.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion5();
    })

    ask2.click(e => {
        ask2.removeClass('btn btn-outline-secondary')
        ask2.addClass('btn btn-danger');
        ask1.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion5();
    })
    ask3.click(e => {
        ask3.removeClass('btn btn-outline-secondary')
        ask3.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask1.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuestion5();

    })
    ask4.click(e => {
        ask4.removeClass('btn btn-outline-secondary')
        ask4.addClass('btn btn-success');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask1.prop("disabled", true);
        count++;
        showQuestion5();
    })
}
getQuestion4();

function getQuestion5 () {

    function showQuizIsOver() {
        btnNext.click(() => {
            containerQuestion5.hide();
        });
    }

    let ask1 = $('#ask5-1');
    let ask2 = $('#ask5-2');
    let ask3 = $('#ask5-3');
    let ask4 = $('#ask5-4');

    ask1.click(e => {
        ask1.removeClass('btn btn-outline-secondary');
        ask1.addClass('btn btn-success');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        count++;
        showQuizIsOver();
    })

    ask2.click(e => {
        ask2.removeClass('btn btn-outline-secondary')
        ask2.addClass('btn btn-danger');
        ask1.prop("disabled", true);
        ask3.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuizIsOver();

    })
    ask3.click(e => {
        ask3.removeClass('btn btn-outline-secondary')
        ask3.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask1.prop("disabled", true);
        ask4.prop("disabled", true);
        showQuizIsOver();
    })
    ask4.click(e => {
        ask4.removeClass('btn btn-outline-secondary')
        ask4.addClass('btn btn-danger');
        ask2.prop("disabled", true);
        ask3.prop("disabled", true);
        ask1.prop("disabled", true);
        showQuizIsOver();
    })
}
getQuestion5();

function getResult () {
    $('#btnResult').click(e => {
        if (count === 0) {
            modalBody.html('0 баллов');
            modalFooter.html('Ты можешь лучше!');
        } else if (count === 1) {
            modalBody.html('1 балл');
            modalFooter.html('Ты можешь лучше!')
        } else if (count === 2) {
            modalBody.html('2 балла');
            modalFooter.html('Ты можешь лучше!')
        } else if (count === 3) {
            modalBody.html('3 балла');
            modalFooter.html('Неплохо!')
        } else if (count === 4) {
            modalBody.html('4 балла');
            modalFooter.html('Хороший результат!')
        } else if (count === 5) {
            modalBody.html('5 баллов');
            modalFooter.html('Ты истинный гений!')
        }
    })
}
getResult();

btnClose.click(e => {
    modal.hide();
    $('#btnResult').hide();
    window.location.reload();
})

})







