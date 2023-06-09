/* global jQuery */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')
const Hasher = require('./build/Hasher')
const SubjectFile = require('./build/SubjectFile')
const HashMenu = require('./build/HashMenu')
const utils = require('./build/Utils')
const UI = require('./build/UI')

const myUi = new UI()

const objSectionMarker = 'obj-section-id-'

const loading = `
<div class="load-wrapp">
    <div class="load-10">
        <div class="bar"></div>
    </div>
</div>
`

// const requiredHashes = [
//   'md5',
//   'sha256',
//   'sha512'
// ]

const menu = new HashMenu()

const fileObjects = []

const renderHash = function (fileObj, typeOfHash) {
  const outputEl = document.querySelector(fileObj.hashes[typeOfHash].uiselector)

  outputEl.innerHTML = fileObj.hashes[typeOfHash].hash
}

const abortHash = function (fileObj) {
  const outputEl = document.querySelector('#' + fileObj.uiselector)
  if (outputEl !== null) {
    outputEl.parentElement.removeChild(outputEl)
  }

  // the only error that can cause this condition atm
  myUi.uiError('Doh! It only works on files, not directories...')
}

const getRelatedFileObj = function (sectionId) {
  const relatedFileObj = fileObjects.find(function (obj, index, arr) {
    if (obj.uiselector === sectionId) {
      return obj
    }
    return false
  })

  return relatedFileObj
}

window.compareSums = function () {
  const inputTarget = window.event.target
  const parentSection = utils.parentUntil(inputTarget, 'file-section')
  const inputValue = inputTarget.value
  const sectionId = parentSection.id
  const type = inputTarget.getAttribute('data-type')
  const obj = getRelatedFileObj(sectionId)

  console.log(type)
  console.log(obj)

  const labelParent = utils.parentUntil(inputTarget, 'file--hash--output')
  const label = labelParent.getElementsByClassName('file--hash--label')[0]

  if (label.className.indexOf('valid-match') !== -1) {
    label.className = label.className.replace('valid-match', '')
  }

  if (label.className.indexOf('invalid-match') !== -1) {
    label.className = label.className.replace('invalid-match', '')
  }

  if (inputValue === obj.hashes[type].hash) {
    label.className = label.className + ' valid-match'
  } else {
    label.className = label.className + ' invalid-match'
  }
}

const setupDisplay = function (fileObj, hashItems) {
  console.log(fileObj)
  // todo this should be generated per hash type.
  // as it is, logic can crash if there is no section
  // allocated for the hash type
  let output = `<div class="file-section" id="${fileObj.uiselector}">
                <div class="file--name">${fileObj.filePath}</div>`

  hashItems.forEach((hashType) => {
    output += `
            <div class="file--hash--output file--hash--output--${hashType}">
                <div class="file--hash--label">${hashType}</div>
                <div class="file--overflow--group">
                    <div class="file--${hashType} file--hash-output" id="">${loading}</div>
                    <div class="file--input file--input--${hashType}"><input onkeyup="compareSums()" data-type="${hashType}" class="file--input--verify" type="text" /></div>
                </div>
            </div>
        `
  })
  output += '</div>'

  const content = document.getElementById('output').innerHTML
  document.getElementById('output').innerHTML = output + content
}

const hashAndDisplayOutput = function (path) {
  const subjectFile = new SubjectFile(path, objSectionMarker, renderHash, abortHash)
  const enabledItems = menu.getEnabledItems()
  setupDisplay(subjectFile, enabledItems)
  // subjectFile.setHashes( Hasher, renderHash );
  fileObjects.push(subjectFile)
  enabledItems.forEach((hashType) => {
    const myhasher = new Hasher(hashType)
    myhasher.doHash(subjectFile)
  })
  myUi.showResultsTab(jQuery)
}

document.addEventListener('drop', function (e) {
  e.preventDefault()
  e.stopPropagation()
  myUi.clearErrors()
  for (const f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f)

    hashAndDisplayOutput(f.path)
  }
})

document.addEventListener('dragover', function (e) {
  e.preventDefault()
  e.stopPropagation()
})

const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', (event) => {
  electron.ipcRenderer.send('open-file-dialog')
})

electron.ipcRenderer.on('selected-directory', (event, path) => {
  myUi.clearErrors()
  hashAndDisplayOutput(path[0])
})
