const WIDTH = 1000;
const HEIGHT = WIDTH * 0.666;
const svg = SVG('race').size(WIDTH, HEIGHT);
const bg = svg.rect(WIDTH, HEIGHT).fill('lightgrey');
const grassLeft = svg.rect(WIDTH * 0.08, HEIGHT).fill('lightgreen').move(0, 0);
const grassRight = svg.rect(WIDTH * 0.08, HEIGHT).fill('lightgreen').move(WIDTH - (WIDTH * 0.08), 0);
const line = svg.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({ width: 6, stroke: 'white', dasharray: [10, 10] });
const carUrl = '../img/car.png';
const car = svg.image(carUrl, WIDTH * 0.066, HEIGHT * 0.2).move(WIDTH / 2 - ((WIDTH * 0.066) / 2), HEIGHT - HEIGHT * 0.23);
let game = false;
let pointsNumber = svg.text('0').fill('white').font({ size: HEIGHT * 0.05 }).move(10, 10);

const ennemiCarUrl1 = '../img/ennemiCar.png';
const ennemiCar1 = svg.image(ennemiCarUrl1, WIDTH * 0.066, HEIGHT * 0.2).move(WIDTH / 2 - ((WIDTH * 0.066) / 2), -135);
console.log(ennemiCar1);
const ennemiCarUrl2 = '../img/ennemiCar2.png';
const ennemiCar2 = svg.image(ennemiCarUrl2, WIDTH * 0.066, HEIGHT * 0.2).move(WIDTH / 2 - ((WIDTH * 0.066) / 2), -135);

const ennemiCarUrl3 = '../img/ennemiCar3.png';
const ennemiCar3 = svg.image(ennemiCarUrl3, WIDTH * 0.066, HEIGHT * 0.2).move(WIDTH / 2 - ((WIDTH * 0.066) / 2), -135);

const ennemiCarUrl4 = '../img/ennemiCar4.png'
const ennemiCar4 = svg.image(ennemiCarUrl4, WIDTH * 0.066, HEIGHT * 0.2).move(WIDTH / 2 - ((WIDTH * 0.066) / 2), -135);

const klaxon = document.querySelector('.klaxon');
const vroum = document.querySelector('.vroum');
const minLeftPosition = grassLeft.width();
const maxRightPosition = grassRight.x() - ennemiCar1.width();
let ennemiCarPosition = Math.floor(minLeftPosition + Math.random() * (maxRightPosition - minLeftPosition));
let points = 0;
vroum.volume = 0.1;
let numberSpeed = 0;

const buttonStart = document.querySelector('.startgame');
const buttonPause = document.querySelector('.pausegame');

buttonStart.onclick = function () {
    if (game == false) {
        points = 0;
        pointsNumber.text('0')
        ennemiCar1.y(HEIGHT * -0.2);
        ennemiCar2.y(HEIGHT * -0.2);
        ennemiCar3.y(HEIGHT * -0.2);
        ennemiCar4.y(HEIGHT * -0.2);
        game = true;
        ennemiCars();
    }
}

buttonPause.onclick = function () {
    if (game == true) {
        buttonPause.innerText = 'Continue';
        game = false;
    } else {
        buttonPause.innerText = 'Pause';
        game = true;
    }

}

function move() {
    if (game == true) {
        if (line.y() == 0) {
            line.dy(9);
        } else {
            line.dy(-9);
        }

        if (car.x() > grassLeft.x() + grassLeft.width() && numberSpeed < 0) {
            car.dx(numberSpeed);

        }

        if (car.x() < grassRight.x() - car.width() && numberSpeed > 0) {
            car.dx(numberSpeed);
        }
    }
}

function moveEnnemiCar(ennemiCar) {
    if (game == true) {
        if (ennemiCar.y() < HEIGHT) {
            ennemiCar.dy(6);
            if (ennemiCar.y() < HEIGHT) {

            }
        } else {
            ennemiCarPosition = Math.floor(minLeftPosition + Math.random() * (maxRightPosition - minLeftPosition));
            ennemiCar.x(ennemiCarPosition);
            ennemiCar.y(HEIGHT * -0.2);
            ennemiCar.dy(6);
            points = points + 1;
            console.log(points);
            pointsNumber.text(points.toString());

        }

        if ((ennemiCar.y() + ennemiCar.height()) > car.y() && ennemiCar.y() < car.y() + ennemiCar.height()) {
            if ((ennemiCar.x() + ennemiCar.width()) > car.x() && ennemiCar.x() < car.x() + car.width()) {
                clearInterval(moveInterval);
                clearInterval(ennemiInterval);
                clearInterval(ennemiInterval2);
                clearInterval(ennemiInterval3);
                clearInterval(ennemiInterval4);
                game = false;
            }

        }
    }
}


document.addEventListener("keyup", function (e) {
    let keyCode = e.keyCode;
    if (keyCode === 39) {
        numberSpeed = 0;
    }
    if (keyCode === 37) {
        numberSpeed = 0;
    }
    if (keyCode === 32) {
        klaxon.play();
    }

})

document.addEventListener("keydown", function (e) {
    let keyCode = e.keyCode;
    if (keyCode === 39) {
        numberSpeed = 4;
    }
    if (keyCode === 37) {
        numberSpeed = -4;
    }

})

let ennemiInterval;
let ennemiInterval2;
let ennemiInterval3;
let ennemiInterval4;
let moveInterval;
function ennemiCars() {
    moveInterval = setInterval(move, 10);
    setTimeout(() => {
        if (game == true) {
            ennemiInterval = setInterval(moveEnnemiCar, 10, ennemiCar1);
        }
    }, 1000);
    setTimeout(() => {
        if (game == true) {
            ennemiInterval2 = setInterval(moveEnnemiCar, 10, ennemiCar2);
        }
    }, 500);
    setTimeout(() => {
        if (game == true) {
            ennemiInterval3 = setInterval(moveEnnemiCar, 10, ennemiCar3);
        }
    }, 10000);
    setTimeout(() => {
        if (game == true) {
            ennemiInterval4 = setInterval(moveEnnemiCar, 10, ennemiCar4);
        }
    }, 30000);
}
