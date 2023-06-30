//data structure with link
const data = {
    "pieces": [
        {"letter":"A", "value":1,  "amount":9, "link": "scrabble/Scrabble_Tile_A.jpg"},
        {"letter":"B", "value":3,  "amount":2, "link": "scrabble/Scrabble_Tile_B.jpg"},
        {"letter":"C", "value":3,  "amount":2, "link": "scrabble/Scrabble_Tile_C.jpg"},
        {"letter":"D", "value":2,  "amount":4, "link": "scrabble/Scrabble_Tile_D.jpg"},
        {"letter":"E", "value":1,  "amount":12, "link": "scrabble/Scrabble_Tile_E.jpg"},
        {"letter":"F", "value":4,  "amount":2, "link": "scrabble/Scrabble_Tile_F.jpg"},
        {"letter":"G", "value":2,  "amount":3, "link": "scrabble/Scrabble_Tile_G.jpg"},
        {"letter":"H", "value":4,  "amount":2, "link": "scrabble/Scrabble_Tile_H.jpg"},
        {"letter":"I", "value":1,  "amount":9, "link": "scrabble/Scrabble_Tile_I.jpg"},
        {"letter":"J", "value":8,  "amount":1, "link": "scrabble/Scrabble_Tile_J.jpg"},
        {"letter":"K", "value":5,  "amount":1, "link": "scrabble/Scrabble_Tile_K.jpg"},
        {"letter":"L", "value":1,  "amount":4, "link": "scrabble/Scrabble_Tile_L.jpg"},
        {"letter":"M", "value":3,  "amount":2, "link": "scrabble/Scrabble_Tile_M.jpg"},
        {"letter":"N", "value":1,  "amount":6, "link": "scrabble/Scrabble_Tile_N.jpg"},
        {"letter":"O", "value":1,  "amount":8, "link": "scrabble/Scrabble_Tile_O.jpg"},
        {"letter":"P", "value":3,  "amount":2, "link": "scrabble/Scrabble_Tile_P.jpg"},
        {"letter":"Q", "value":10, "amount":1, "link": "scrabble/Scrabble_Tile_Q.jpg"},
        {"letter":"R", "value":1,  "amount":6, "link": "scrabble/Scrabble_Tile_R.jpg"},
        {"letter":"S", "value":1,  "amount":4, "link": "scrabble/Scrabble_Tile_S.jpg"},
        {"letter":"T", "value":1,  "amount":6, "link": "scrabble/Scrabble_Tile_T.jpg"},
        {"letter":"U", "value":1,  "amount":4, "link": "scrabble/Scrabble_Tile_U.jpg"},
        {"letter":"V", "value":4,  "amount":2, "link": "scrabble/Scrabble_Tile_V.jpg"},
        {"letter":"W", "value":4,  "amount":2, "link": "scrabble/Scrabble_Tile_W.jpg"},
        {"letter":"X", "value":8,  "amount":1, "link": "scrabble/Scrabble_Tile_X.jpg"},
        {"letter":"Y", "value":4,  "amount":2, "link": "scrabble/Scrabble_Tile_Y.jpg"},
        {"letter":"Z", "value":10, "amount":1, "link": "scrabble/Scrabble_Tile_Z.jpg"},
        {"letter":"_", "value":0,  "amount":2, "link": "scrabble/Scrabble_Tile__.jpg"}
    ]
};

//attempted to add functionality for preventing stacking
document.addEventListener("drop", function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var draggedElement = document.getElementById(data);
    var offsetX = event.clientX - draggedElement.offsetWidth / 2;
    var offsetY = event.clientY - draggedElement.offsetHeight / 2;
    draggedElement.style.left = offsetX + "px";
    draggedElement.style.top = offsetY + "px";

    var slot = document.getElementById("slot1");
    if (isColliding(draggedElement, slot)) {
      console.log("Dragged item is on top of Slot 1");
    } else {
      console.log("Dragged item is not on top of Slot 1");
    }
});

$( document ).ready(function() {
    for (let i = 0; i < 7; i++) {
        createTile()
    }
});

var counter = 0;

function createTile() {
    // Create a new div element
    var div = document.createElement('div');

    // Set the div attributes
    counter++;
    div.id = 'tile' + counter;
    div.className = 'tile';
    div.draggable = true;
    div.addEventListener('dragstart', drag);
    var random_letter = getRandomPiece()   
    div.style.backgroundImage = "url(scrabble/Scrabble_Tile_" + random_letter + ".jpg)"
    // Insert the div into the document
    var rackWrapper = document.getElementById('rack_wrapper');

    // Insert the div into the rack wrapper
    rackWrapper.appendChild(div);
}

const randomIndex = Math.floor(Math.random() * piecesArray.length);

//prevents normal function
function allowDrop(event) {
    event.preventDefault();
}

//sets text
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

//prevents normal functionality, adds drop
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// Reload the current page
function resetGame() {
    location.reload();
}

//calculates based on the weights provided in the data structure
function getRandomPiece() {
    const totalWeight = data.pieces.reduce((total, piece) => total + piece.amount, 0);
    let randomWeight = Math.random() * totalWeight;

    let selectedPiece = null;
    for (const piece of data.pieces) {
      randomWeight -= piece.amount;
      if (randomWeight <= 0) {
        selectedPiece = piece;
        break;
      }
    }

    return selectedPiece.letter
}

//half implemented score counter
function check_score() {
    var score = 0;
    var outputElement = document.getElementById("output");

    outputElement.textContent = score;
}