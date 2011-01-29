hsl = {

	// takes in a single leg and extaxts start/end times of that + type
	decode : function( legData ) {
		var leg = {};
		var firstLeg = legData.locs[0];
		var lastLeg = legData.locs[ legData.locs.length -1 ];
		leg.firstLocation = firstLeg.coord;
		leg.firstTime = hsl._parseTime( firstLeg.arrTime );
		leg.lastLocation = lastLeg.coord;
		leg.lastTime = hsl._parseTime( lastLeg.depTime );
		leg.type = hsl.decode_code( legData.type, legData.code ).type
		leg.code = hsl.decode_code( legData.type, legData.code ).code;
		return leg;
	},

	decode_code : function(type, code) {
		if( type == 'walk' ) return { code: '', type : 'walk' };
		return { type: 'transport_type', code: hsl.busData( code ) };
	},

	busData: function(code) {
		var line = code.slice(1,5);
		line = hsl._removeZeros(line);
		return line;
	},

	trainData: function(code) {

	},

	_parseTime: function(timeString){
		// HSL returns dates as yyyymmddhhmm -string
		var t = timeString;
		return new Date( t.slice(0,4) , // yyyy
				 parseInt( t.slice(4,6) ) - 1 , // mm, starst from 0
				 t.slice(6,8) , // dd
				 t.slice(8,10)  , // hh
				 t.slice(10,12) , // mm
				00, 00 ); // secs, ms:
	},

	_removeZeros: function( line ) {
		while( line[0] == '0' ) {
			line = line.slice(1);
		}
		return line;
	}
}
