/**
 * Define interface to return a new Interface object
 * @param {JSON Object} implementation Implementations of interface functions.
 * @return 
 */
var iThing = function(implementation) {
    return new Interface({
        doStuff: function(param) {}, 
        doMoreStuff: function(param1, param2) {},
		doStuffWithoutParams: function() {},
        implementation: implementation,
        type: "iThing"
    });
};

var a = new iThing({
    doStuff: function(param) {
		alert("a.doStuff with parameter value ".concat(param));
	}, 
    doMoreStuff: function(param1, param2) {
		alert("a.doMoreStuff with parameter values ".concat(param1)
			.concat(",")
			.concat(param2));
	},
	doStuffWithoutParams: function() {
		return "a.doStuffWithoutParams";
	}
});

a.doStuff("foo"); //alerts "foo"

// Throws error
// "The implementation of iThing.doMoreStuff does not have the correct number of arguments."
var b = new iThing({
    doStuff: function(param) {
		alert("b.doStuff with parameter value ".concat(param));
	}, 
    doMoreStuff: function(param1) {
		alert("b.doMoreStuff with parameter values ".concat(param1)
			.concat(",")
			.concat(param2));
	},
	doStuffWithoutParams: function() {
		return "b.doStuffWithoutParams";
	}
});

// Throws error "iThing.doStuffWithoutParams has not been implemented."
var c = new iThing({
    doStuff: function(param) {
		alert("c.doStuff with parameter value ".concat(param));
	}, 
    doMoreStuff: function(param1, param2) {
		alert("c.doMoreStuff with parameter values ".concat(param1)
			.concat(",")
			.concat(param2));
	}
});