(function(){
    "use strict";
    var ilo = window.ilo || {};

    var CourseController = function (course) {
        var currentQuestionIndex = 0;

        this.intro = course.intro;
        this.questions = course.questions;
        this.currentQuestion = this.questions[currentQuestionIndex];
        this.templatePath = course.template;
        this.template = undefined;
        this.view = undefined;

        this.currentQuestionIndex = function() {
            var setQuestionIndex = [].slice.call(arguments).pop();
            currentQuestionIndex  = setQuestionIndex ? setQuestionIndex : currentQuestionIndex;
            return currentQuestionIndex;
        };
    };

    CourseController.prototype.getCourseTemplate = function(templateName) {
        return this.template = $.get('../templates/' + templateName + '.html');
    };

    CourseController.prototype.nextQuestion = function (evt, model) {
        model.currentQuestionIndex(model.currentQuestionIndex() + 1);
        model.currentQuestion = model.questions[model.currentQuestionIndex()];
        radio('nextQuestion').broadcast();
    };

    CourseController.prototype.tryAgain = function (evt, model) {
        radio('tryAgain').broadcast();
    };

    CourseController.prototype.prevQuestion = function () {
        this.currentQuestionIndex(this.currentQuestionIndex() - 1);
        this.currentQuestion = this.questions[this.currentQuestionIndex()];
    };

    CourseController.prototype.setAnswer = function (evt, model) {
        model.currentQuestion.selectedAnswer = model.index;
        radio('answerSelected').broadcast(evt, this);
    };

    CourseController.prototype.checkAnswer = function (evt, model) {
        var selectedAnswer = model.currentQuestion.selectedAnswer;
        var answers = model.currentQuestion.answers;
        radio('checkAnswer').broadcast(evt, this);
        if (selectedAnswer > -1 && answers[selectedAnswer].correct) {
            radio('answerCorrect').broadcast(evt, this, model.currentQuestion.animation || undefined);
            return true;
        }
        console.log('you got it wrong');
        radio('answerIncorrect').broadcast(evt, this);
        return false;
    };

    CourseController.prototype.startCourse = function () {
        radio('courseReady').broadcast();
    }

    ilo.CourseController = CourseController;
    window.ilo = ilo;
}());