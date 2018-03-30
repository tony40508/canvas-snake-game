let Vector = function(x, y) {
  this.x = x;
  this.y = y;
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
