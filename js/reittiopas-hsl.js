hsl = {

	datatypes : [	hsl.busData,
			hsl.busData, 
			hsl.trainData, 
			hsl.busData,
			hsl.busData
		     ],

	decode_code : function(code) {
		var datatype = code.charAt(0);
	},

	busData: function(code) {
		
	},

	trainData: function(code) {

	},

	_removeZeros: function( line ) {
		while( line[0] == '0' ) {
			line = line.slice(1);
		}
	}
}
