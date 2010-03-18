/**
 * Copyright 2010, Rob Blakemore
 * Except where otherwise noted, this work is licensed under
 * http://creativecommons.org/licenses/by-sa/3.0
 */


/**
 * JavaScript class that facilitates coding against an interface.
 * @param {String} args.type Name or type of the interface.
 * @param {JSON Object} args.* Un-implemented functions that provide signatures for the interface. 
 * @param {JSON Object} args.implementation Implementations of the interface functions.
 * @constructor
 */
var Interface = function(args) {
	// set default value for args
	args = args || null;
	/**
	 * Determines if an object is undefined.
	 * @param {Object} obj The object to be checked.
	 * @return Whether or not the provided object is undefined.
	 */
    var _isUndefined = function(obj) {
        return typeof obj === "undefined";
    };
	/**
	 * Determines if an object is a function.
	 * @param {Object} obj The object to be checked.
	 * @return Whether or not the provided object is a function.
	 */
    var _isNotFunction = function(obj) {
        return typeof obj !== "function";
    };
	/**
	 * Compares the argument count of two functions.
	 * @return Whether or not the number of parameters of two functions are equal
	 * @param {Function} signature The function representing the signature of the to-be-implemented function.
	 * @param {Function} implementation The function that will provide the implementation of the to-be-implemented function.
	 */
    var _hasInvalidArgumentCount = function(signature, implementation) {
        if(_isNotFunction(signature))
            throw new Error("\"signature\" parameter should be of type \"function\"");
        if(_isNotFunction(implementation))
            throw new Error("\"implementation\" parameter should be of type \"function\"");
        return signature.length !== implementation.length;
    };
	// validate args
	switch (true) {
		case args === null:
			throw new Error("No arguments supplied to an instance of Interface constructor.");
		case _isUndefined(args.type):
			throw new Error("Interface.type not defined.");
		case _isUndefined(args.implementation):
			throw new Error("The interface ".concat(args.type).concat(" has not been implemented."));
	};
	
	// set type
	var _type = args.type;
	// set interface implementation
	var _implementation = args.implementation;
	// object to hold interface functions
    var _functions = {};
	
	// define interface functions (signatures)
    for(var item in args) {
        var signature = args[item];
        if(!_isNotFunction(signature))
            _functions[item] = signature;
    };
	
	// compare interface function signatures with implementation
    for(var signature in _functions) {
		// unimplemented
        if(_isUndefined(_implementation[signature]))
            throw new Error(_type.concat(".").concat(signature).concat(" has not been implemented."));
        for(var item in _implementation) {
            var implement = _implementation[item];
            switch (true) {
				// implemented function was not defined by interface
                case _isUndefined(_functions[item]):
                    throw new Error(item.concat(" is not a defined member of ").concat(_type).concat("."));
				// implementation is not a function
                case _isNotFunction(implement):
                    throw new Error(_type.concat(".").concat(item).concat(" has not been implemented as a function." ));
				// implementation has wrong number of parameters
                case _hasInvalidArgumentCount(_functions[item], implement):
                    throw new Error("The implementation of ".concat(_type).concat(".").concat(item).concat(" does not have the correct number of arguments." ));
				// implement
                default:
                    _functions[item] = implement;
                    break;    
            };
        };
    };
	//return implementations
	return _functions;
};