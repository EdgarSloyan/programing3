var LiveForm = require("./LiveForm");
var random = require("../random.js");

module.exports = class Eater extends LiveForm{
	constructor(x, y, index) {
        super(x, y, index);
        this.life = 2;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.energy >= 5) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let Eater = new Eater(x, y);
            eaterArr.push(Eater);
            this.life = 2;
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 13) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in eaterArr) {
            if (eaterArr[i].x == this.x && eaterArr[i].y == this.y) {
                eaterArr.splice(i, 1)
            }
        }
    }
}