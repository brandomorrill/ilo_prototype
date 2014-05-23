(function(){
    "use strict";
    var ilo = window.ilo || {};

    $.Velocity.Sequences.enterFromLeft = function(element, options, index, size) {
        var animationOptions = $.extend({
            'duration': 750,
            'easing': 'easeOutBack'
        }, options);
        animationOptions.delay = animationOptions.delay || index * Math.floor(animationOptions.duration / size);

        $.Velocity.animate(element, {
            'opacity': [1,0],
            'translateX': ['0%', '-100%']
        }, animationOptions);
    };

    $.Velocity.Sequences.enterFromBottom = function(element, options, index, size) {
        
        var animationOptions = $.extend({
            'duration': 500,
            'easing': 'easeOutBack'
        }, options);
        animationOptions.delay = animationOptions.delay || index * Math.floor(animationOptions.duration / size);

        $.Velocity.animate(element, {
            'translateY': ['-150%', '100%']
        }, animationOptions);
    };

    $.Velocity.Sequences.exitToBottom = function(element, options, index, size) {
        
        var animationOptions = $.extend({
            'duration': 500,
            'easing': 'easeInBack'
        }, options);
        animationOptions.delay = animationOptions.delay || index * Math.floor(animationOptions.duration / size);

        $.Velocity.animate(element, {
            'translateY': '100%'
        }, animationOptions);
    };

    $.Velocity.Sequences.showSelectedAnswer = function(element, options) {
        var $notSelected = $('li', element).not('.selected'),
            $selected = $('.selected', element),
            calls = [
                {
                    'element': $notSelected,
                    'animation': {
                        'translateX': ['-100%', '0'],
                    },
                    'options': {
                        'duration': 500,
                        'easing': 'easeInBack'
                    }
                },
                {
                    'element': $selected,
                    'animation': {
                        'translateY': [-$selected.position().top, 0]
                    },
                    'options': {
                        'duration': 500,
                        'delay': 250,
                        'easing': 'easeOutBack'
                    }
                }
            ];

        $.each(calls, function (i, call) {
            $.Velocity.animate(call.element, call.animation, call.options);
        });
    };

    var animations = {
        hideIntro: function () {
            return $('.intro').velocity('fadeOut');
        },
        showQuestion: function () {
            return $.when($('.course').velocity('fadeIn'), $('.answers li').velocity('enterFromLeft'))
        },
        resetAnswer: function () {
            return $('.answers .selected').velocity(
                {
                    'opacity': 0,
                    'translateY': [0,0]
                },
                {
                    'duration': 0
                }
            );
        },
        noWindCastOff: function() {
            return $('.boat').velocity({
                translateX: 100
            });
        }
    };

    ilo.animations = animations;
    window.ilo = ilo;
}());