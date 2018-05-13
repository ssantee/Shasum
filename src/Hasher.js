'use strict';

const crypto = require('crypto');
const fs = require('fs');

const validHashes = crypto.getHashes();

class Hasher{
    constructor( hashType ){
        
        if( this.checkValidHash( hashType ) ){

            this.hashType = hashType;

            this.hash = crypto.createHash( hashType );
        }
        else{

            throw new Error( 'Invalid hash type passed to Hasher constructor', 'Hasher.js' );
        }
    }

    checkValidHash( input ){

        if( validHashes.indexOf( input ) !== -1 ){

            return true;
        }

        return false;
    }

    doHash( file ){

        const input = fs.createReadStream( file.filePath );
        var rhash;
        
        input.on('readable', ( ) => {

            const data = input.read();
            
            if (data){

                this.hash.update(data);
            }
            else {

                rhash = this.hash.digest('hex');

                file.addHash( rhash, this.hashType );
            }
        });

        input.on( 'error', ( err ) => {

            throw new Error( err );
        } );
    }
}

module.exports = Hasher;
