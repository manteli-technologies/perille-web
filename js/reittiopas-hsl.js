hsl = {


	decode_code : function(type, code) {
		if( type == 'walk' ) return;
		var datatype = code.charAt(0);
	},

	busData: function(code) {
		var line = code.slice(1,5);
		line = hsl._removeZeros(line);
		return line;
	},

	trainData: function(code) {

	},

	_removeZeros: function( line ) {
		while( line[0] == '0' ) {
			line = line.slice(1);
		}
		return line;
	}
}
