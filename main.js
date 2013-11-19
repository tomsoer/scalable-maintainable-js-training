;(function ( $, window, document, undefined ) {
 
var pluginName = "quiz",
	defaults = {
		score: 0,
		currentIndex: 0,
		callBack: function(){console.info('callback')}
	};
 
function Plugin( element, options ) {
	this.element = element;
	this.options = $.extend( {}, defaults, options) ;
	this._defaults = defaults;
	this._name = pluginName;
	this.init();
}
 
Plugin.prototype.init = function () {
	//Init
	this.getData();
};

Plugin.prototype.getData = function () {
	//getData
	var p = this;	
	$.getJSON( "questions.json", function( data ) {
		var items = [];		
		$.each( data, function( key, val ) {
			items[key] = val;
		});
		p.data = items;
		p.data_lenght = p.data.length; 
		p.drowData(p.options.currentIndex)
	});
	
};

Plugin.prototype.drowData = function (index) {
	//drowData
	var p = this;
	var html = '<h3>'+p.data[index].question+'</h3>',
		n = index;
		p.data[index].answers.forEach(print_qestions);
		
		
		function print_qestions(element, index, array) {
			html = html + '<label><input type="radio" name="'+p.element.id+'" value="'+p.data[n].points[index]+'">' + element+'</label>'; 
		}
		html = html + '<div class="counter">'+(index+1) + '/' + p.data_lenght +'</div>'
	$(p.element).html(html);
	
	p.bindEvents(index);
	
};

Plugin.prototype.bindEvents = function (index) {
	//bindEvents
	var p = this;
	$(p.element).find('input').click(function(){
		p.options.score = parseInt(p.options.score) + parseInt($(this).val());
		
		if (index < p.data_lenght-1) {
			p.drowData(++p.options.currentIndex)
		} else {
			p.options.callBack();
		}
	})
};


$.fn[pluginName] = function ( options ) {
	return this.each(function () {
		if ( !$.data(this, "plugin_" + pluginName )) {
			$.data( this, "plugin_" + pluginName,
			new Plugin( this, options ));
		}
	});
}

$.fn.results = function(score) {
	var el = this;		
	$.getJSON( "results.json", function( data ) {
		data.some(function(d) {
			if (parseInt(d.to)>=parseInt(score)){
				$(el).html(d.status);
			}
			return parseInt(d.to) >= parseInt(score);
		});
	});
};
 
})( jQuery, window, document );

(function ($) {	
	var s = $('#content').quiz({'callBack':function(){$('#content').results(this.score)}});	
}(jQuery));
