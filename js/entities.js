/* entities.js file provides all entities classes for game.
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

var TextEntity = function(x, y, text, color, font) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.font = font;
     this.update = function() {

    };
    this.render = function(engine) {
        engine.drawText(this.x, this.y, this.text, this.color, this.font);
    };
};

var BackGroundImage = function(x, y, image) {
    this.x = x;
    this.y = y;
    this.sprite = simpleSprite(image);
    this.update = function() {

    };
    this.render = function(engine) {
        engine.drawImage(this.sprite, this.x, this.y);
    };
};

var ReelIcon = function(x, y, image, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.sprite = simpleSprite(image);
    this.prev;
    this.visible = true;
    this.update = function() {

    };
    this.render = function(engine) {
        if (this.y >= 4) {
            engine.drawImage(this.sprite, this.x, this.y);
        }
    };
};

var Button = function(x, y, w, h, callback) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onMouseDown = callback;
    this.sprite = simpleSprite("images/level-tr.png");
    // this.onMouseDown = function() {
    //     console.log("mouse down");
    // };
    this.update = function() {

    };
    this.render = function(engine) {
        engine.drawImage(this.sprite, this.x, this.y);
    };
};


var RectangleEntity = function(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.update = function(dt) {

    };
    this.render = function(engine) {
        engine.drawRect(this.x, this.y, this.w, this.h, this.color);
    };
};


var CoffeeMachine = function() {
    this.components = [];
    this.reel1 = new Reel(1, 0, 1, 4, 10, 0.99, -4);
    this.reel2 = new Reel(2, 0, 1, 8, 15, 0.99, -8);
    this.reel3 = new Reel(3, 0, 1, 6, 12, 0.99, -6);
    this.components.push(this.reel1);
    this.components.push(this.reel2);
    this.components.push(this.reel3);
    this.update = function(dt) {
        for (var i in this.components) {
            this.components[i].update(dt);
        }
        if (!this.reel1.spin) {
            console.log("stop");
        }
    };
    this.render = function(engine) {
        for (var i in this.components) {
            this.components[i].render(engine);
        }
    };
};

var Reel = function(x, y, speed, a, maxSpeed, brakeSpeed, a2, callback, im1, im2, im3) {
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.maxSpeed = maxSpeed;
    this.brakeSpeed = brakeSpeed;
    this.minSpeed = 0.4;
    this.accelerate = true;
    this.brake = false;
    this.spin = false;
    this.tStopping = -1;
    this.h1 = -1;
    this.onStop = callback;
    this.dy;
    this.height = 3;
    this.topBorder = new RectangleEntity(this.x, this.y + this.height - 4, 1, 1, "black");
    this.topBorderThin = new RectangleEntity(this.x - 0.05, this.y + this.height - 4 + 0.95, 1 + 0.1, 0.05, "#4d4d4d");
    this.bottomBorder = new RectangleEntity(this.x, this.y + this.height, 1, 1, "black");
    this.bottomBorderThin = new RectangleEntity(this.x - 0.05, this.y + this.height, 1 + 0.1, 0.05, "#4d4d4d");
    this.leftBorder = new RectangleEntity(this.x - 0.05, this.y, 0.05, 3, "#4d4d4d");
    this.rightBorder = new RectangleEntity(this.x + 1, this.y, 0.05, 3, "#4d4d4d");
    this.components = [];
    this.components.push(new ReelIcon(this.x, this.y + this.height - 9, im1, 1));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 8, im2, 2));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 7, im3, 3));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 6, im1, 1));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 5, im2, 2));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 4, im3, 3));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 3, im1, 1));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 2, im2, 2));
    this.components.push(new ReelIcon(this.x, this.y + this.height - 1, im3, 3));

    this.components[8].prev = this.components[7];
    this.components[7].prev = this.components[6];
    this.components[6].prev = this.components[5];
    this.components[5].prev = this.components[4];
    this.components[4].prev = this.components[3];
    this.components[3].prev = this.components[2];
    this.components[2].prev = this.components[1];
    this.components[1].prev = this.components[0];
    this.components[0].prev = this.components[8];

    this.components[0].next = this.components[1];
    this.components[1].next = this.components[2];
    this.components[2].next = this.components[3];
    this.components[3].next = this.components[4];
    this.components[4].next = this.components[5];
    this.components[5].next = this.components[6];
    this.components[6].next = this.components[7];
    this.components[7].next = this.components[8];
    this.components[8].next = this.components[0];




    this.beginning = this.components[0];
    this.end = this.components[this.components.length - 1];
    this.getH = function() {
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
                // this.speed *= a;
                this.speed += a * dt;
            } else if (this.accelerate && this.speed >= this.maxSpeed) {
                this.accelerate = false;
                this.brake = true;
            } else if (this.brake && this.speed >= this.minSpeed) {
                this.speed += a2 * dt;
            } else if (this.brake && this.speed < this.minSpeed) {
                if (this.tStopping === -1) {
                    this.tStopping = 0;
                    this.h1 = this.getH();
                } else {
                    this.tStopping += dt;
                }

                if (this.tStopping >= this.h1 / this.speed) {
                    this.spin = false;
                    
                    this.speed = 0;
                    this.accelerate = true;
                    this.brake = false;
                    this.tStopping = -1;
                    this.h1 = -1;
                    this.onStop(this.beginning.next.value);
                }
            }
            
            
            this.dy = dt * this.speed;
            for (var i in this.components) {
                this.components[i].y += this.dy;
            }
            if (this.end.y > this.y + this.height) { //changed
                this.end.y = this.beginning.y - 1;
                this.beginning = this.end;
                this.end = this.end.prev;
            }
        //     for (var i in this.components) {
        // var c = this.components[i];
        // if (c.y >= this.y - 1) {
        //     c.visible = true;
        // }
        // }
            
        }

    };
    this.render = function(engine) {
        for (var i in this.components) {
            this.components[i].render(engine);
        }
        this.topBorder.render(engine);
        this.topBorderThin.render(engine);
        this.bottomBorder.render(engine);
        this.bottomBorderThin.render(engine);
        this.leftBorder.render(engine);
        this.rightBorder.render(engine);

    };

};






