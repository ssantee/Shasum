'use strict';

const crypto = require('crypto');

class HashMenu{

    constructor(){

        //console.log( crypto.getHashes() );

        this.availableHashes = crypto.getHashes();

        this.defaultMenuItems = [
            'md5',
            'sha256',
            'sha512'
        ];

        this.enabledItems = [ ...this.defaultMenuItems ];

        this.enabledItemsRendered = '';

        this.menuItems = [];

        this.menuItemsRendered = '';

        this.createAddlMenuOptions( );

        document.getElementById( 'app-menu' ).innerHTML = this.getRenderedMenuItems();

        var menuOpts = document.getElementById( 'app-menu' ).getElementsByTagName( 'input' );

        for( var x = 0; x < menuOpts.length; x++ ){

            menuOpts[x].addEventListener( 'change', this.menuHandler.bind( this ) );
        }

        document.getElementById( 'app-menu-enabled' ).innerHTML = this.renderEnabledItems();
    }

    updateAppMenu(){
        document.getElementById( 'selected-ciphers' ).innerHTML = this.enabledItems.length + ' selected';
    }

    renderEnabledItems(){

        this.enabledItemsRendered = '';

        this.enabledItems.sort( (a, b) => a.localeCompare(b) );

        this.enabledItems.forEach( ( e, i, arr ) => {
            
            this.enabledItemsRendered += '<li>' + e + '</li>'
        } );

        this.updateAppMenu();

        return this.enabledItemsRendered = '<ul>' + this.enabledItemsRendered + '</ul>';
    }

    getEnabledItems(){

        return this.enabledItems;
    }

    disableItem( item ){

        if( this.enabledItems.indexOf( item ) !== -1 ){

            this.enabledItems.splice( this.enabledItems.indexOf( item ), 1 );
        }

        return this.renderEnabledItems();
    }

    addEnabledItem( newItem ){

        if( this.enabledItems.indexOf( newItem ) === -1 ){

            this.enabledItems.push( newItem );
        }
        //store these settings somewhere?
        return this.renderEnabledItems();
    }

    createAddlMenuOptions(){

        this.availableHashes.forEach( ( e, i, arr ) => {

            return this.menuItems.push( e );
        } );

        this.menuItems.sort( (a, b) => a.localeCompare(b) );

        this.menuItems.forEach( ( e, i, arr ) => {
            
            if( this.defaultMenuItems.indexOf( e ) !== -1 ){

                //item is a default
                this.menuItemsRendered += '<div class="cell"><div class="card"><div class="card-section"><label><input type="checkbox" checked="checked" value="' + e + '" /> ' + e + '</label></div></div></div>'
            }
            else{

                this.menuItemsRendered += '<div class="cell"><div class="card"><div class="card-section"><label><input type="checkbox" value="' + e + '" /> ' + e + '</label></div></div></div>'
            }
        } );
    }

    getRenderedMenuItems(){

        return this.menuItemsRendered;
    }

    menuHandler ( event ){

        var target = event.target,
            val = target.value;
    
        if( target.checked ){
    
            var renderedEnabled = this.addEnabledItem( val );
    
            document.getElementById( 'app-menu-enabled' ).innerHTML = renderedEnabled;
        }
        else{
    
            //already in enabled items, remove
            document.getElementById( 'app-menu-enabled' ).innerHTML = this.disableItem( val );
        }
    }

}

module.exports = HashMenu;