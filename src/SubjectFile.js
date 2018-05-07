'use strict';

const fs = require('fs');
var lastID = 0;

class SubjectFile{

    constructor( filePath, objSectionMarker, renderCallback ){

        this.id = lastID + 1;

        lastID = this.id;

        //check validity?
        this.filePath = filePath;

        this.uiselector = objSectionMarker + this.id;

        this.hashes = {};

        this.renderCallback = renderCallback;
    }

    renderType(){

        this.renderCallback( this );
    }

    renderHash( type ){

        this.renderCallback( this, type );
    }

    addHash( results, type ){

        this.hashes[ type ] = this.hashes[ type ] || {};

        this.hashes[ type ].hash = results;

        this.hashes [ type ].uiselector = '#' + this.uiselector + ' .file--' + type;

        this.renderHash( type );
    }

    compareHashTo( inputHash, objectId ){

        return ;
    }    
}

module.exports = SubjectFile;
