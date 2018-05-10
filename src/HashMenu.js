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
    }

    renderEnabledItems(){

        this.enabledItemsRendered = '';

        this.enabledItems.sort();

        this.enabledItems.forEach( ( e, i, arr ) => {
            
            this.enabledItemsRendered += '<li>' + e + '</li>'
        } );

        return this.enabledItemsRendered = '<ul>' + this.enabledItemsRendered + '</ul>';
    }

    getEnabledItems(){

        return this.enabledItems;
    }

    addEnabledItem( newItem ){

        this.enabledItems.push( newItem );
        //store these settings somewhere?
        return this.renderEnabledItems();
    }

    createAddlMenuOptions(){

        this.availableHashes.forEach( ( e, i, arr ) => {

            return this.menuItems.push( e );
        } );

        this.menuItems.forEach( ( e, i, arr ) => {
            
            if( this.defaultMenuItems.indexOf( e ) !== -1 ){

                //item is a default
                this.menuItemsRendered += '<label><input type="checkbox" checked="checked" value="' + e + '" /> ' + e + '</label>'
            }
            else{

                this.menuItemsRendered += '<label><input type="checkbox" value="' + e + '" /> ' + e + '</label>'
            }
        } );
    }

    getRenderedMenuItems(){

        return this.menuItemsRendered;
    }

}

module.exports = HashMenu;