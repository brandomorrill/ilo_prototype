(function(){
    "use strict";
    var ilo = window.ilo || {};

    var courseModel = {
        template: 'no-wind-cast-off',
        intro: {
            heading: 'You’re ready to cast off.',
            info: 'There is no wind.'
        },
        intro2: {
            info: 'There is no wind.'
        },
        questions: [
            {
                q: 'How should you approach the dock?',
                info: 'There is no wind.',
                answers: [
                    {
                        a: 'at a 90 degree angle, bow first',
                        correct: false
                    },
                    {
                        a: 'at a 90 degree angle, stern first',
                        correct: false
                    },
                    {
                        a: 'at a narrow angle',
                        correct: false
                    },
                    {
                        a: 'at planing speed',
                        correct: true
                    }
                ],
                selectedAnswer: null,
                animation: 'noWindCastOff'
            },
            {
                q: 'How should you approach the dock2?',
                info: 'There is no wind.',
                answers: [
                    {
                        a: 'at a 90 degree angle, bow first2',
                        correct: true
                    },
                    {
                        a: 'at a 90 degree angle, stern first2',
                        correct: false
                    },
                    {
                        a: 'at a narrow angle2',
                        correct: false
                    },
                    {
                        a: 'at planing speed2',
                        correct: false
                    }
                ],
                selectedAnswer: null,
                animation: 'noWindCastOff'
            }
        ],
    };

    ilo.getCourse = function() {
        return courseModel;
    }

    window.ilo = ilo;
}());