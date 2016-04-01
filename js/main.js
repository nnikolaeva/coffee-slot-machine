window.onload = function() {
    var gridWidth = 50;
    var gridHeight = 50;

    var COLS = 15;
    var ROWS = 15;

    var engine = new Engine(gridWidth, gridHeight, COLS, ROWS);

    function loadResources(engine) {
        Resources.load([
            'images/expresso-beans.jpg',
            "images/coffee-maker.jpg",
            "images/tea-pot.jpg",
            "images/button.jpg",
            "images/expresso-machine.jpg",
            "images/expresso-machineNEW.jpg",
            "images/background.jpg",
            "images/mug.jpg",
            "images/vending-machine.jpg",
            "images/new-machine.jpg",
            "images/new-machine_3.jpg",
            "images/level-tr.png",
            "images/expresso-prize.jpg",
            "images/coffee-filter.jpg",
            "images/tea-strainer.jpg",
            "images/expresso-tamper.jpg",
            "images/ground-coffee.jpg",
            "images/loose-tea.jpg"
        ]);
        engine.lastTime = Date.now();
        Resources.onReady(engine.start.bind(engine));
    }

    loadResources(engine);
    document.addEventListener("click", function(event) {
        engine.handleMouseEvent("click", event);
    });
    // engine.addEntityToScreen(new RectangleEntity(0, 0, 10, 15));
    engine.addEntityToScreen(new BackGroundImage(2, 3.7, "images/new-machine_3.jpg"));

    // engine.addEntityToScreen(new CoffeeMachine());
    var win = function() {
      engine.addEntityToScreen(new BackGroundImage(9, 10,"images/expresso-prize.jpg"));
      // engine.emptyScreen();
      // engine.addEntityToScreen(new RectangleEntity(0, 0, 10, 15));
      // engine.addEntityToScreen(new RectangleEntity(0, 0, 5, 8));
      // engine.addEntityToScreen(new BackGroundImage(2, 5,"images/expresso-prize.jpg"));
      // var playAgainButton = new Button(4, 3, 1, 1, playAgain);
      // engine.addEntityToScreen(playAgainButton);
      // engine.addMouseEventSubscribtion(new MouseEventSubscribtion("click", playAgainButton, playAgainButton.onMouseDown.bind(playAgainButton)));

    }
    var values = [];
    var onWin = function(value) {
      values.push(value);
      if (values.length === 3) {
        console.log(values);
        if (values[0] === values[0] && values[0] === values[0]) {
          setTimeout(win, 0);
        }
      }
    };

    var playAgain = function() {
      engine.emptyScreen();
       engine.addEntityToScreen(new RectangleEntity(0, 0, 5, 8));
    };

    var start = function() {
      values.length = 0;
      reel1.spin = true;
      reel2.spin = true;
      reel3.spin = true;
    };

    engine.addEntityToScreen(new TextEntity(1, 1, "Good Morning Thumbtack engineers! ", "#000", "30px Arial")); 
    engine.addEntityToScreen(new TextEntity(1, 2, "Would you like a healthy dose of caffeine? Pull the lever!", "#000", "20px Arial"));
    var reel1 = new Reel(4, 5, 1, 4, 10, 0.99, -4, onWin, "images/expresso-machineNEW.jpg", "images/coffee-maker.jpg", "images/tea-pot.jpg");
    var reel2 = new Reel(5, 5, 1, 8, 15, 0.99, -8, onWin, "images/expresso-tamper.jpg", "images/coffee-filter.jpg", "images/tea-strainer.jpg");
    var reel3 = new Reel(6, 5, 1, 6, 12, 0.99, -6, onWin, "images/expresso-beans.jpg", "images/ground-coffee.jpg", "images/loose-tea.jpg");
    engine.addEntityToScreen(reel1);
    engine.addEntityToScreen(reel2);
    engine.addEntityToScreen(reel3);
    var button = new Button(9, 8, 1, 2, start);
    engine.addEntityToScreen(button);
    engine.addMouseEventSubscribtion(new MouseEventSubscribtion("click", button, button.onMouseDown.bind(button)));
    // engine.addEntityToScreen(new RectangleEntity(4, 0, 1, 1));
    // engine.addEntityToScreen(new BackGroundImage(2, 5,"images/mug.jpg"));

};