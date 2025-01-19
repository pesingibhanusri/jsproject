let startTime = new Date(); 

function checksolved() {
    let presentorder = [];
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            let cell = document.getElementById("cell" + row + column);
            if (cell.innerHTML.includes("img")) {
                let src = cell.querySelector("img").src;
               presentorder.push(src.split("/").pop());
            } else {
                presentorder.push("");
            }
        }
    }

    const correctorder = [
        "n1.jpg", "n2.jpg", "n3.jpg", 
        "n4.jpg", "n5.jpg", "n6.jpg", 
        "n7.jpg", "n8.jpg", ""
    ];

    if (JSON.stringify( presentorder) === JSON.stringify(correctorder)) {
        let endTime = new Date();
        let timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Time in seconds
        document.getElementById("time").innerText = `Time: ${timeTaken} seconds`;

      
        document.getElementById("win").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }
}

function restartgame() {
    // Logic to reset/restart the game
    document.getElementById("win").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    startTime = new Date(); // Reset the timer
    initializetiles(); // Reset the tiles
}

function swaptiles(cell1, cell2) {
    let temp = document.getElementById(cell1).innerHTML;
    document.getElementById(cell1).innerHTML = document.getElementById(cell2).innerHTML;
    document.getElementById(cell2).innerHTML = temp;
}

function shuffle() {
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            let row2 = Math.floor(Math.random() * 3 + 1);
            let column2 = Math.floor(Math.random() * 3 + 1);
            swaptiles("cell" + row + column, "cell" + row2 + column2);
        }
    }
    checksolved();
}

function clicktile(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.innerHTML;

    if (tile != "") {
    
        if (column < 3 && document.getElementById("cell" + row + (column + 1)).innerHTML === "") {
            swaptiles("cell" + row + column, "cell" + row + (column + 1));
        }
    
        else if (column > 1 && document.getElementById("cell" + row + (column - 1)).innerHTML === "") {
            swaptiles("cell" + row + column, "cell" + row + (column - 1));
        }
 
        else if (row > 1 && document.getElementById("cell" + (row - 1) + column).innerHTML === "") {
            swaptiles("cell" + row + column, "cell" + (row - 1) + column);
        }
   else if (row < 3 && document.getElementById("cell" + (row + 1) + column).innerHTML === "") {
            swaptiles("cell" + row + column, "cell" + (row + 1) + column);
        }
    }
    checksolved();
}

function initializetiles() {
    const tileImages = [
        "./n1.jpg", "./n2.jpg", "./n3.jpg", "./n4.jpg", 
        "./n5.jpg", "./n6.jpg", "./n7.jpg", "./n8.jpg", ""
    ]; 
    
    let tiles = [...tileImages];
    shufflearray(tiles);
    
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            let tile = tiles[(row - 1) * 3 + (column - 1)];
            let cell = document.getElementById("cell" + row + column);
            
            if (tile !== "") {
                cell.innerHTML = `<img src="${tile}" alt="tile">`;
                cell.classList.remove("tile9");
            } else {
                cell.innerHTML = "";
                cell.classList.add("tile9");
            }
        }
    }
}

function shufflearray(array) {  
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

window.onload = initializetiles;  // Initialize tiles when the page loads
