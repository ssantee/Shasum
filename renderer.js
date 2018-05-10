// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')

const Hasher = require( './build/Hasher' );
const SubjectFile = require( './build/SubjectFile' );
const HashMenu = require( './build/HashMenu' );
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

var menu = new HashMenu();

document.getElementById( 'app-menu' ).innerHTML = menu.getRenderedMenuItems();

var menuOpts = document.getElementById( 'app-menu' ).getElementsByTagName( 'input' );

const menuHandler = function( event ){

    var target = event.target,
        val = target.value;

    if( target.checked ){

        var renderedEnabled = menu.addEnabledItem( val );

        document.getElementById( 'app-menu-enabled' ).innerHTML = renderedEnabled;
    }
    else{

        //already in enabled items, remove
        document.getElementById( 'app-menu-enabled' ).innerHTML = menu.disableItem( val );
    }
};

for( var x = 0; x < menuOpts.length; x++ ){

    menuOpts[x].addEventListener( 'change', menuHandler );
}

document.getElementById( 'app-menu-enabled' ).innerHTML = menu.renderEnabledItems();

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

const setupDisplay = function( fileObj, hashItems ){

    console.log( fileObj );
//todo this should be generated per hash type.
//as it is, logic can crash if there is no section
//allocated for the hash type
    var output = `<div class="file-section" id="${fileObj.uiselector}">
                   <div class="file--name">${fileObj.filePath}</div>`;

    hashItems.forEach( ( hashType ) => {

        output += `
            <div class="file--hash--output file--hash--output--${hashType}">
                <div class="file--hash--label">${hashType}</div>
                <div class="file--overflow--group">
                    <div class="file--${hashType} file--hash-output" id="">${loading}</div>
                    <div class="file--input file--input--${hashType}"><input onchange="compareSums()" data-type="${hashType}" class="file--input--verify" type="text" /></div>
                </div>
            </div>
        `;
    } );
                    
    output += `</div>`;

    var content = document.getElementById( 'output' ).innerHTML;

    document.getElementById( 'output' ).innerHTML =  content + output;
};

document.addEventListener('drop', function ( e ) {

    e.preventDefault();
    e.stopPropagation();

    for ( let f of e.dataTransfer.files ) {

        console.log( 'File(s) you dragged here: ', f.path )
  
        const subjectFile = new SubjectFile( f.path, objSectionMarker, renderHash );

        var enabledItems = menu.getEnabledItems();

        setupDisplay( subjectFile, enabledItems );

        //subjectFile.setHashes( Hasher, renderHash );

        fileObjects.push( subjectFile );

        enabledItems.forEach( ( hashType )=>{

            let myhasher = new Hasher( hashType );
            
            myhasher.doHash( subjectFile );
        } );
        
    } 
  });

  document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
