var APP = APP || (function ($) {
    "use strict";

    var questions = questionsJson,
        results = resultsJson;

    return {
        init: function () {
            APP.Results.init({element: $('#content'), results: results});
            this.startQuiz();
        },

        startQuiz: function () {
            APP.Quiz.init({questions: questions, element: $('#content')});
        },

        getTemplate: function (name) {
            return $('#' + name).text();
        }
    };
}(jQuery));