reittiopas = {
	REITTIOPAS : '/ropb',
	USER : 'matnel',
	PASS : 'tchrb6ch',
	COORDINATES : 'wgs84', // by default always use this format

	_http_get : function( parameters, success ) {
    		// add default parameters
    		parameters.epsg_in = reittiopas.COORDINATES;
    		parameters.epsg_out = reittiopas.COORDINATES;
		parameters.user = reittiopas.USER;
		parameters.pass = reittiopas.PASS;
		$.ajax( {
			url : reittiopas.REITTIOPAS,
			data: parameters,
			dataType : 'json',
			success : function( data ) { success( data ); },
			error : function() { error('I did something bad! Try to refresh the window.'); }
		} );
	},


	location_to_address : function( latitude, longitude, success ) {
		var parameters = {};
		parameters.request = 'reverse_geocode';
		parameters.coordinate = longitude + ',' + latitude;
		reittiopas._http_get(parameters, function(json) {
			success( json );
		} );

	},

	address_to_location : function(term, success) {
		var parameters = {};
		parameters.request = 'geocode';
		parameters.key = term;
		reittiopas._http_get(parameters, success );
	},

	route : function(from, to, time, mode, success) {
		var parameters = {};
		parameters.request = 'route';
		parameters.from = from;
		parameters.to = to;
		// TODO may be broken
		parameters.date = time.year() + time.month()  + time.date();
		parameters.time = time.hours() + time.minutes();
		parameters.timetype = mode;
		parameters.show = 5;
		reittiopas._http_get( parameters, success );
	}
}
