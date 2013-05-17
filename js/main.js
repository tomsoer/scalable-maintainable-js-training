requirejs.config({
    'baseUrl': 'js',
    'paths': {
        'jquery': 'lib/jquery',
        '_': 'lib/underscore'
    }
});

require(['jquery', 'app' ], function ($, APP) {
    "use strict";
    console.log(APP);
    APP.init();
});
