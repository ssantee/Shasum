'use strict';

class UI{

    constructor( targets ){
        this.elementTargets = targets;

        this.loading = `<div class="load-wrapp">
                <div class="load-10">
                    <div class="bar"></div>
                </div>
            </div>`;

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

    initMenu(){


    }

    showResultsTab( jQuery ){

        jQuery('#menu-tabs').foundation('selectTab', jQuery('#panel1b'), true);
    }

    uiError( err ){

        document.querySelector( '#output' ).innerHTML = '<div id="errors">' + err + '</div>';
    }

    clearErrors(){

        var errEl = document.querySelector( '#errors' );
    
        if( errEl !== null ){
    
            errEl.parentElement.removeChild( errEl );
        }
    }
}

module.exports = UI;