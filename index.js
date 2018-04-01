// Vector
let Vector = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

Vector.prototype.add = function(v) {
  return new Vector(this.x + v.x, this.y + v.y);
};

Vector.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.set = function(v) {
  this.x = v.x;
  this.y = v.y;
};

Vector.prototype.equal = function(v) {
  return this.x == v.x && this.y == v.y;
};

Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
};

Vector.prototype.multiply = function(s) {
  return new Vector(this.x * s, this.y * s);
};

// Snake
var Snake = function() {
  this.body = [];
  this.maxLength = 5;
  this.head = new Vector(0, 0);
  this.speed = new Vector(1, 0);
  this.direction = 'Right';
  this.setDirection(this.direction);
};

Snake.prototype.update = function() {
  let newHead = this.head.add(this.speed);
  
  this.body.push(this.head);
  this.head = newHead;
  
  // 尾端超出去的拿掉，保持蛇的長度是 maxLength
  while (this.body.length > this.maxLength) {
    this.body.shift();
  }
};

Snake.prototype.setDirection = function(direction) {
  let target;

  if (direction == 'Up') {
    target = new Vector(0, -1);
  }
  if (direction == 'Down') {
    target = new Vector(0, 1);
  }
  if (direction == 'Left') {
    target = new Vector(-1, 0);
  }
  if (direction == 'Right') {
    target = new Vector(1, 0);
  }
  // 這裡已經知道 target 後，進行的判斷
  // 要跟前進方向不一樣時 (multiply(-1)) 才能更新方向
  if (
    target.equal(this.speed) == false &&
    target.equal(this.speed.multiply(-1)) == false
  ) {
    this.speed = target;
  }
};

// Game
let Game = function() {
  this.boxWidth = 12;
  this.boxSpan = 2;
  this.gameWidth = 40;
  this.speed = 30;
  this.snake = new Snake();
  this.foods = []
}

Game.prototype.init = function() {
  this.canvas = document.getElementById('mycanvas');
  this.canvas.width = this.boxWidth * this.gameWidth + this.boxSpan * (this.gameWidth - 1); 
  this.canvas.height = this.canvas.width;
  this.ctx = this.canvas.getContext('2d');

  this.render();
  this.generateFood();
  setTimeout(() => {
    this.update();
  }, 1000 / this.speed);
};

Game.prototype.getPositon = function(x, y) {
  return new Vector(
    x * this.boxWidth + (x - 1) * this.boxSpan,
    y * this.boxWidth + (y - 1) * this.boxSpan
  );
};

Game.prototype.drawBlock = function(v, color) {
  let pos = this.getPositon(v.x, v.y);
  
  this.ctx.fillStyle = color;
  this.ctx.fillRect(pos.x, pos.y, this.boxWidth, this.boxWidth);
};

Game.prototype.render = function() {
  this.ctx.fillStyle = 'rgba(0, 0, 0, .3)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  for (let x = 0; x < this.gameWidth; x++) {
    for (let y = 0; y < this.gameWidth; y++) {
      this.drawBlock(new Vector(x, y), 'rgba(255, 255, 255, .03)');
    }
  }

  this.snake.body.forEach((snakePos, i) => {
    this.drawBlock(snakePos, 'lightGreen');
  });

  this.foods.forEach(pos => {
    this.drawBlock(pos, 'red');
  });

  requestAnimationFrame(() => {
    this.render();
  });
};

Game.prototype.update = function() {
  // if (this.start) {
  //   this.playSound('A2', -20);
  //   this.snake.update();
  //   this.foods.forEach((food, i) => {
  //     if (this.snake.head.equal(food)) {
  //       this.snake.maxLength++;
  //       this.foods.splice(i, 1);
  //       this.generateFood();
  //     }
  //   });
  //   this.snake.body.forEach(sp => {
  //     if (sp.equal(this.snake.head)) {
  //       console.log('collide body');
  //       this.endGame();
  //     }
  //   });
  //   if (this.snake.checkBoundary(this.gameWidth) == false) {
  //     this.endGame();
  //   }
  // }
  // this.speed = Math.sqrt(this.snake.body.length) + 5;
  this.snake.update()

  setTimeout(() => {
    this.update();
  }, parseInt(1000 / this.speed));
};

Game.prototype.generateFood = function() {
  // 產生隨機位置
  let x = Math.floor(Math.random() * this.gameWidth);
  let y = Math.floor(Math.random() * this.gameWidth);

  this.foods.push(new Vector(x, y));
  // this.drawEffect(x, y);
  // this.playSound("E5", -20);
  // this.playSound("A5", -20, 200);
};

// New Game
let game = new Game();
game.init()

// KeyDown
document.addEventListener('keydown', e => {
  game.snake.setDirection(e.key.replace('Arrow', ''));
});
