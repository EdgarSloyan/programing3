var side = 10;


function setup() {
    // frameRate(6);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < 50; y++) {
        matrix[y] = [];
        for (var x = 0; x < 50; x++) {
            matrix[y][x] = random([0,1,1,1,2,3,4,5]);
        }
    }

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pe = new Predator(x, y, 3);
                predatorArr.push(pe);
            }
            else if (matrix[y][x] == 4) {
                var ea = new Eater(x, y, 4);
                eaterArr.push(ea);
            }
            else if (matrix[y][x] == 5) {
                var mu = new Muler(x, y, 5);
                mulerArr.push(mu);
            }
        }
    }
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }

            rect(x * side, y * side, side, side);

            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }for (var i in eaterArr) {
        eaterArr[i].eat();
    }
    for (var i in mulerArr) {
        mulerArr[i].eat();
    }
}
