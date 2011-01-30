hsl = {

	_types : [],

	init : function() {
		hsl._types[1] = hsl.busData;
		hsl._types[2] = hsl.tramData;
		hsl._types[3] = hsl.busData;
		hsl._types[4] = hsl.busData;
		hsl._types[5] = hsl.busData;
		hsl._types[6] = hsl.metroData;
		hsl._types[7] = hsl.ferryData;
		hsl._types[8] = hsl.busData;
		hsl._types[12] = hsl.trainData;
		hsl._types[21] = hsl.busData;
		hsl._types[22] = hsl.busData;
		hsl._types[23] = hsl.busData;
		hsl._types[24] = hsl.busData;
		hsl._types[25] = hsl.busData;
	},

	// takes in a single leg and extaxts start/end times of that + type
	decode : function( legData ) {
		var leg = {};
		var firstLeg = legData.locs[0];
		var lastLeg = legData.locs[ legData.locs.length -1 ];
		leg.firstLocation = firstLeg.coord;
		leg.firstLocation.name = firstLeg.name ? firstLeg.name : '';
		leg.firstTime = hsl._parseTime( firstLeg.arrTime );
		leg.lastLocation = lastLeg.coord;
		leg.lastLocation.name = lastLeg.name ? lastLeg.name : '';
		leg.lastTime = hsl._parseTime( lastLeg.depTime );
		leg.type = hsl.decode_code( legData.type, legData.code ).type
		leg.code = hsl.decode_code( legData.type, legData.code ).code;
		return leg;
	},

	decode_code : function(type, code) {
		if( type == 'walk' ) return { code: '', type : 'walk' };
		return hsl._types[type](code);
	},

	busData: function(code) {
		var line = code.slice(1,5);
		line = hsl._removeZeros(line);
		return { type: 'bus', code: line };
	},

	trainData: function(code) {
		return { type: 'train', code: ''}
	},

	tramData: function(code) {
                return { type: 'tram', code: ''}
	},

	metroData: function(code){
                return { type: 'metro', code: ''}
	},

	ferryData: function(code) {
                return { type: 'ferry', code: ''}
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
