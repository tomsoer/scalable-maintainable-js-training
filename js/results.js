define(["jquery", "app"/*, "_"*/], function ($, APP/*, _*/) {
    "use strict";

    return {
        element: null,
        results: null,

        init: function (options) {
            this.element = options.element;
            this.results = options.results;
            this.bindEvents();
        },

        bindEvents: function () {
            console.log(APP);
            APP.EventBus.bind('quiz:result', this.process, this);
        },

        process: function (points) {
            var i = 0;
            for (; i < this.results.length; i++) {
                if (points <= this.results[i].to) {
                    $(this.element).html(_.template(APP.getTemplate('template-result'), {
                        result: this.results[i].status,
                        points: points
                    }));
                    break;
                }
            }
        }
    };
});