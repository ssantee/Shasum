'use strict';

class UI{

    constructor( targets ){
        this.elementTargets = targets;

        this.init();
    }

    init(){

        document.getElementById( 'clear-result' ).addEventListener( 'click', function( event ){

            var toRemove = document.querySelectorAll( '#output .file-section' );

            toRemove.forEach( function( el, key, arr ){
                el.parentNode.removeChild( el );
            } );
        } );
    }
}

module.exports = UI;