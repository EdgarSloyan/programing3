
var socket = io();
function setup() {


    var side = 10;

    var matrix = [];
    let weath = 'summer'
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let eaterCountElement = document.getElementById('eaterCount');
    let mulerCountElement = document.getElementById('mulerCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        console.log(data);
        socket.on("weather", function (data) {
            weath = data;
        })
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        eaterCountElement.innerText = data.eaterCounter;
        mulerCountElement.innerText = data.mulerCounter;
        //! Drawing and coloring RECTs
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                var obj = matrix[y][x];
                if (obj == 1) {
                    if (weath == "summer") {
                        fill("green");
                    } else if (weath == "autumn") {
                        fill("#333300");
                    } else if (weath == "winter") {
                        fill("white");
                    } else if (weath == "spring") {
                        fill("#4dffa6");
                    }
                } else if (obj == 2) {
                    fill("orange");
                } else if (obj == 0) {
                    fill('#acacac');
                } else if (obj == 3) {
                    fill('red');
                } else if (obj == 4) {
                    fill('blue');
                } else if (obj == 5) {
                    fill('yellow');
                }
                rect(x * side, y * side, side, side);
            }
        }
    }
}

// socket.on('send matrix', drawCreatures)

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}   