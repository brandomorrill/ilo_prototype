(function(){
    "use strict";
    var ilo = window.ilo || {};

    var course = new ilo.CourseController(ilo.getCourse());
    var view = undefined;

    course.getCourseTemplate('no-wind-cast-off').then(function (template) {
        $('#ilo').html(template);
        view = rivets.bind($('#ilo'), course);
        console.log(view);
    });

    radio('answerSelected').subscribe(function (evt, ele) {
        var $ele = $(ele);

        $ele.siblings('li').removeClass('selected');
        $ele.addClass('selected');
        $('.answers ul').velocity('showSelectedAnswer');
        $('.check-answer').velocity('fadeIn', {
            'delay': 250
        });
    });

    radio('courseReady').subscribe(function () {
        ilo.animations.hideIntro().promise()
        .then(function () {
            ilo.animations.showQuestion();
        });
    });

    radio('nextQuestion').subscribe(function () {
        var resetAnswer = ilo.animations.resetAnswer();
        var resetModal = $('.answer-correct').velocity('exitToBottom');

        $.when(resetAnswer, resetModal).then(function () {
            ilo.animations.showQuestion();
        });
    });

    radio('tryAgain').subscribe(function () {
        var resetAnswer = ilo.animations.resetAnswer();
        var resetModal = $('.answer-incorrect').velocity('exitToBottom');

        $.when(resetAnswer, resetModal).then(function () {
            ilo.animations.showQuestion();
        });
    });

    radio('checkAnswer').subscribe(function () {
        $('.check-answer').velocity('reverse');
    });

    radio('answerCorrect').subscribe(function (evt, ele, animation) {
        $('.answer-correct').velocity('enterFromBottom')
        .delay(2000)
        .promise()
        .then(function () {
            $('.answer-correct').velocity('reverse')
            .promise()
            .then(function() {
                if (animation) {
                    ilo.animations[animation]()
                    .promise()
                    .then(function () {
                        return $('.answer-correct').velocity('enterFromBottom');
                    });
                } else {
                    return $('.answer-correct').velocity('enterFromBottom')
                }
            })
        });
    });

    radio('answerIncorrect').subscribe(function () {
        $('.answer-incorrect').velocity('enterFromBottom');
    });
    
    //course.startCourse();
    window.ilo = ilo;
}());