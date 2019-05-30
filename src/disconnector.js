var sketch = require('sketch')
// documentation: https://developer.sketchapp.com/reference/api/


export default function() {
  const doc = sketch.getSelectedDocument() //Gets the sketch document
  const selection = doc.selectedLayers // Gets the currently selected artboards or layers
  const selectedCount = selection.length // Variable I'm using just to log things and make sure it's selecting everything.



  // function that handles artboards, groups, symbol
  selection.forEach((selected) => {
      if (selected.type === 'Artboard') { //get array of layers. send to detatcher
        artboardDetatcher(selected)
      } else if (selected.type === 'Group') { // for each object. send to detatcher
        groupDetatcher(selected)
      } else if (selected.type === 'SymbolInstance') {
        detatcher(selected)
      }
  })

  if (selectedCount === 0) {
    sketch.UI.message('Select some objects')
  } else {
    sketch.UI.message(`Symbols Detatched!`)
  }
}

// Function to handle a selected artboard
function artboardDetatcher (artboard) {
  artboard.layers.forEach((layer) => {
    if (layer.type === 'Group') {
      // send group to group function
      groupDetatcher(layer)
    } else if (layer.type === 'SymbolInstance') {
      detatcher(layer)
    }
  })
}


function groupDetatcher (group) {
  group.layers.forEach((layer) => {
    if (layer.type === 'Group') {
      groupDetatcher(layer)
    } else if (layer.type === 'SymbolInstance') {
      detatcher(layer)
    }
  })
}

// function to do the detatching
function detatcher(layer) {
  layer.detach({
    recursively: true,
  })
}
