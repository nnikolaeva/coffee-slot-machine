/* entities.js file provides all entities classes for the app.
 */
function simpleSprite(image) {
    return sprite(image, 0, 0, defaultBoundingBox());
}

function sprite(image, dx, dy, boundingBox) {
    return {
        image: image,
        dx: dx,
        dy: dy,
        bbox: boundingBox
    };
}

function defaultBoundingBox() {
    return boundingBox(0, 0, 1, 1);
}

function boundingBox(x, y, w, h) {
    return {
        x: x,
        y: y,
        w: w,
        h: h
    };
}

var Entity = function(x, y) {
    this.x = x;
    this.y = y;
    this.update = function() {};
};

var SpriteEntity = function(x, y, sprite) {
    Entity.call(this, x, y);
    this.sprite = sprite;
    this.render = function(engine) {
        engine.drawImage(this.sprite, this.x, this.y);
    };
};

var SlotMachine = function(x, y, image) {
    SpriteEntity.call(this, x, y, simpleSprite(image));
};

var ReelIcon = function(x, y, image, value) {
    SpriteEntity.call(this, x, y, simpleSprite(image));
    this.value = value;
    this.prev;
};

var Button = function(x, y, w, h, image, callback) {
    SpriteEntity.call(this, x, y, simpleSprite(image));
    this.w = w;
    this.h = h;
    this.onMouseClick = callback;
};

var RectangleEntity = function(x, y, width, height) {
    Entity.call(this, x, y);
    this.width = width;
    this.height = height;
    this.color = "#4d4d4d";
    this.render = function(engine) {
        engine.drawRect(x, y, width, height, this.color);
    };
};

var Prize = function(x, y, image) {
    SpriteEntity.call(this, x, y, simpleSprite(image));
    this.visible = false;
    this.render = function(engine) {
        if (this.visible) {
            engine.drawImage(this.sprite, this.x, this.y);
        }
    };
};

var ReelsBorder = function(x1, y, height, borderWidth) {
    this.components = [];
    this.components.push(new RectangleEntity(x1 - borderWidth, y, borderWidth, height));
    this.components.push(new RectangleEntity(x1 + height, y, borderWidth, height));
    this.components.push(new RectangleEntity(x1 - borderWidth, y - borderWidth, height + 2 * borderWidth, borderWidth));
    this.components.push(new RectangleEntity(x1 - borderWidth, y - borderWidth + height, height + 2 * borderWidth, borderWidth));

    this.update = function() {};
    this.render = function(engine) {
        for (var i in this.components) {
            this.components[i].render(engine);
        }
    };

};

var Reel = function(x, y, height, im1, im2, im3) {
    Entity.call(this, x, y);
    this.height = height;
    this.borderWidth = 0.05;
    this.speed = 0;
    this.maxSpeed;
    this.acceleration;
    this.minSpeed = 1;
    this.accelerate = true;
    this.brake = false;
    this.spin = false;
    this.tStopping = null;
    this.hStopping = null;
    this.onStop;
    this.dy;
    this.setMaxSpeed = function(value) {
        this.maxSpeed = value;
    };
    this.setAcceleration = function(value) {
        this.acceleration = value;
    };
    this.setOnStopCallback = function(callback) {
        this.onStop = callback;
    };

    this.leftBorder = new RectangleEntity(this.x - this.borderWidth, this.y, this.borderWidth, this.height);
    this.components = [];

    // add 9 icons to the reel
    for (var i = 9; i > 0; i--) {
        if (i % 3 === 0) {
            this.components.push(new ReelIcon(this.x, this.y + this.height - i, im1, 0));
        } else if (i % 3 === 2) {
            this.components.push(new ReelIcon(this.x, this.y + this.height - i, im2, 1));
        } else if (i % 3 === 1) {
            this.components.push(new ReelIcon(this.x, this.y + this.height - i, im3, 2));
        }
    }

    this.lastInd = this.components.length - 1;
    
    // add links to the previous entity in the reel 
    for (var j = 0; j < 9; j++) {
        this.components[j].prev = j > 0 ? this.components[j - 1] : this.components[this.lastInd];
    }

    this.beginning = this.components[0];
    this.end = this.components[this.lastInd];

    this.getHStopping = function() {
        var res;
        for (var i in this.components) {
            var c = this.components[i];
            if (this.y + this.height - c.y <= 1) {
                res = this.y + this.height - c.y;
            }
        }
        return res;
    };
    this.update = function(dt) {
        if (this.spin) {
            if (this.accelerate && this.speed < this.maxSpeed) {
                this.speed += this.acceleration * dt;
            } else if (this.accelerate && this.speed >= this.maxSpeed) {
                this.accelerate = false;
                this.brake = true;
            } else if (this.brake && this.speed >= this.minSpeed) {
                this.speed += this.acceleration * -1 * dt;
            } else if (this.brake && this.speed < this.minSpeed) {
                if (this.tStopping === null) {
                    this.tStopping = 0;
                    this.hStopping = this.getHStopping();
                } else {
                    this.tStopping += dt;
                }

                if (this.tStopping >= this.hStopping / this.speed) {
                    this.spin = false;
                    this.speed = 0;
                    this.accelerate = true;
                    this.brake = false;
                    this.tStopping = null;
                    this.hStopping = null;
                    this.onStop(this.end.prev.value);
                }
            }

            if (this.spin) {
                this.dy = dt * this.speed;
                for (var i in this.components) {
                    this.components[i].y += this.dy;
                }
                if (this.end.y > this.y + this.height) {
                    this.end.y = this.beginning.y - 1;
                    this.beginning = this.end;
                    this.end = this.end.prev;
                }
            }
        }
    };
    this.render = function(engine) {
        for (var i in this.components) {
            this.components[i].render(engine);
        }
        this.leftBorder.render(engine);
    };
};