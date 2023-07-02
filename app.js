// canvas
const canvas = document.getElementById('canvas');
// canvas 2d
const context = canvas.getContext('2d');

//o'yin maydonidagi kataklar o'lchami
var grid = 16;
var count = 0;
var score = 0;
var max = 0;

const snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    maxCells: 1,
    cells: [],
};

const food = {
    x: 320,
    y: 320,
};

function Getrandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) {
        // 60fps / 15fps = 4
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.clientWidth - grid;
    } else if (snake.x >= canvas.clientWidth) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.clientHeight - grid;
    } else if (snake.y >= canvas.clientHeight) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = '#fff';
    context.fillRect(food.x, food.y, grid - 1, grid - 1);

    context.fillStyle = 'red';

    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === food.x && cell.y === food.y) {
            snake.maxCells++;
            score += 1;
            document.getElementById('score').innerHTML = score;

            food.x = Getrandom(0, 25) * grid;
            food.y = Getrandom(0, 25) * grid;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 1;
                snake.dx = grid;
                snake.dy = 0;
                food.x = Getrandom(0, 25) * grid;
                food.y = Getrandom(0, 25) * grid;
                if (score > max) {
                    max = score;
                }
                document.getElementById('score').innerHTML = max;
            }
        }
    });
}

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37 && snake.dx === 0) {
        // chap
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.keyCode === 38 && snake.dy === 0) {
        // tepa
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.keyCode === 39 && snake.dx === 0) {
        // o'ng
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.keyCode === 40 && snake.dy === 0) {
        // past
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(loop);
