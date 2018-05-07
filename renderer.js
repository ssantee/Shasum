// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')

const Hasher = require( './build/Hasher' );
const SubjectFile = require( './build/SubjectFile' );
const utils = require( './build/Utils' );

const objSectionMarker = 'obj-section-id-';

const loading = `
<div class="load-wrapp">
    <div class="load-10">
        <div class="bar"></div>
    </div>
</div>
`;

var requiredHashes = [
    'md5',
    'sha256',
    'sha512'
];

var fileObjects = [];

const renderHash = function( fileObj, typeOfHash ){

    var outputEl = document.querySelector( fileObj.hashes[ typeOfHash ].uiselector );

    outputEl.innerHTML = fileObj.hashes[ typeOfHash ].hash;
};

const getRelatedFileObj = function( sectionId ){

    var relatedFileObj = fileObjects.find( function( obj, index, arr ){

        if( obj.uiselector === sectionId ){

            return obj;
        }
    } );

    return relatedFileObj;
}

window.compareSums = function( ){

    const inputTarget = window.event.target,
            parentSection = utils.parentUntil( inputTarget, 'file-section' ),
            inputValue = inputTarget.value;

    var sectionId = parentSection.id;
    
    var type = inputTarget.getAttribute( 'data-type' );

    var obj = getRelatedFileObj( sectionId );

    console.log( type );
    console.log( obj );

    var labelParent = utils.parentUntil( inputTarget, 'file--hash--output' );
    var label = labelParent.getElementsByClassName( 'file--hash--label' )[0];

    if( label.className.indexOf( 'valid-match' ) !== -1 ){

        label.className = label.className.replace( 'valid-match', '' );
    }

    if( label.className.indexOf( 'invalid-match' ) !== -1 ){

        label.className = label.className.replace( 'invalid-match', '' );
    }

    if( inputValue === obj.hashes[ type ].hash ){

        label.className = label.className + ' valid-match';
    }
    else{

        label.className = label.className + ' invalid-match';
    }
};

const setupDisplay = function( fileObj ){

    console.log( fileObj );
//todo this should be generated per hash type.
//as it is, logic can crash if there is no section
//allocated for the hash type
    var output = `<div class="file-section" id="${fileObj.uiselector}">
                    <div class="file--name">${fileObj.filePath}</div>
                    <div class="file--hash--output file--hash--output--md5">
                        <div class="file--hash--label">MD5</div>
                        <div class="file--md5 file--hash-output">${loading}</div>
                        <div class="file--input file--input--md5"><input onchange="compareSums()" data-type="md5" class="file--input--verify" type="text" /></div>
                    </div>
                    <div class="file--hash--output file--hash--output--sha256">
                        <div class="file--hash--label">SHA256</div>
                        <div class="file--sha256 file--hash-output" id="">${loading}</div>
                        <div class="file--input file--input--sha256"><input onchange="compareSums()" data-type="sha256" class="file--input--verify" type="text" /></div>
                    </div>
                    <div class="file--hash--output file--hash--output--sha512">
                        <div class="file--hash--label">SHA512</div>
                        <div class="file--sha512 file--hash-output" id="">${loading}</div>
                        <div class="file--input file--input--sha256"><input onchange="compareSums()" data-type="sha512" class="file--input--verify" type="text" /></div>
                    </div>
                </div>`;

    var content = document.getElementById( 'output' ).innerHTML;

    document.getElementById( 'output' ).innerHTML =  content + output;
};

document.addEventListener('drop', function ( e ) {

    e.preventDefault();
    e.stopPropagation();

    for ( let f of e.dataTransfer.files ) {

        console.log( 'File(s) you dragged here: ', f.path )
  
        const subjectFile = new SubjectFile( f.path, objSectionMarker, renderHash );

        setupDisplay( subjectFile );

        //subjectFile.setHashes( Hasher, renderHash );

        fileObjects.push( subjectFile );

        requiredHashes.forEach( ( hashType )=>{

            let myhasher = new Hasher( hashType );
            
            myhasher.doHash( subjectFile );
        } );
        
    } 
  });

  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
