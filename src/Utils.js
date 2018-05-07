
var utils = {

    parentUntil: function( el, ancestorClass ){

        var parentClass = el.parentNode && el.parentNode.className || '';

        if( el.parentNode && parentClass.indexOf( ancestorClass ) === -1 ){

            return this.parentUntil( el.parentNode, ancestorClass );
        }
        else{

            return el.parentNode;
        }
        
    }

};

module.exports = utils;