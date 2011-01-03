reittiopas = {
	REITTIOPAS : '/ropb',
	USER : 'matnel',
	PASS : 'tchrb6ch',
	COORDINATES : 'wgs84', // by default always use this format

	_http_get : function( parameters, success ) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == XMLHttpRequest.DONE) {
				var json = eval( req.responseText );
				success( json );
			}
		}
    		// add default parameters
    		parameters.epsg_in = reittiopas.COORDINATES;
    		parameters.epsg_out = reittiopas.COORDINATES;
		parameters.user = reittiopas.USER;
		parameters.pass = reittiopas.PASS;
		// encode parameters to a query string
		// TODO: can this be made nicer
		var query = [];
		for(var p in parameters) {
			query.push(p + "=" + parameters[p] );
		}
    		console.log( reittiopas.REITTIOPAS + '?' + query.join('&')  );
    		req.open("GET", reittiopas.REITTIOPAS + '?' + query.join('&') );
    		req.send();
	},


	location_to_address : function( latitude, longitude ) {
		var parameters = {};
		parameters.request = 'reverse_geocode';
		parameters.coordinate = longitude + ',' + latitude;
		_http_get(parameters, function(json) {
			console.log(json[0].city)
		} );

	},

	address_to_location : function(term, success) {
		var parameters = {};
		parameters.request = 'geocode';
		parameters.key = term;
		_http_get(parameters, success );
	},

	route : function(from, to, time, mode, success) {
		var parameters = {};
		parameters.request = 'route';
		parameters.from = from;
		parameters.to = to;
		// TODO may be broken
		parameters.date = '' + time.getFullYear() + (time.getMonth() + 1) + time.getDate();
		parameters.time = '' + time.getHours() + time.getMinutes();
		parameters.timetype = mode;
		parameters.show = 5;
		parameters.detail = 'limited';
		_http_get( parameters, success );
	}
}
