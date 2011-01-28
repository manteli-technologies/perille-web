hsl = {


	decode_code : function(type, code) {
		if( type == 'walk' ) return 'walk';
		return hsl.busData( code );
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
				 t.slice(4,6) , // mm
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
