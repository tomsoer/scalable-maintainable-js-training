define(["jquery", "_"], function ($, _) {
    "use strict";
    var stage = 0;

    return {
        points: 0,
        element: null,
        questions: [],

        renderQuestions: function () {
            "use strict";
            var stageQuestions = [],
                i = 0;
            for (i = 0; i < 3; i++) {
                var index = stage * 3 + i;
                if (this.questions[index] === undefined) {
                    console.log('Quiz ended with score: ' + this.points);
                    APP.EventBus.trigger('quiz:result', this.points);
                    return;
                }

                var q = this.questions[index],
                    answers = [],
                    a = 0;

                q.dataIndex = index;
                for (; a < 3; a++) {
                    answers.push({value: a, label: q.answers[a]});
                }
                q.answers = answers;
                stageQuestions.push(q);
            }
            $(this.element).html(_.template($('template-quiz__form').text(),{questions: stageQuestions}));
        },

        processForm: function () {
            var data = $(this.element).find('form').serializeArray();
            var len = data.length;

            for (var i = 0; i < len; i++) {
                this.points += this.questions[i].points[parseInt(data[i].value)];
            }

            stage++;
            this.renderQuestions();
            return false;
        },

        renderForm: function () {
            $(this.element).html(_.template($('template-quiz__form').text()));

            var $form = $(this.element).find('form'),
                self = this;

            $form.on('submit', function () {
                self.processForm();
                return false;
            });
        },
        init: function (options) {
            this.element = options.element[0];
            this.questions = options.questions || [];

            this.renderForm();
            this.renderQuestions();
        }
    };
});