window.onload = function() {
    var gridWidth = 80;
    var gridHeight = 60;

    var COLS = 6;
    var ROWS = 8;

    var engine = new Engine(gridWidth, gridHeight, COLS, ROWS);
    var reels = [];
    var prizes = [];

    var BORDER_WIDTH = 0.05;
    var REEL1_X = 1.7;
    var REELS_Y = 0.45;
    var REELS_HEIGHT = 3;

    var SLOT_MACHINE_IMAGE = "images/slot-machine.png";
    var LEVER_IMAGE = "images/lever.png";
    // reel1 icons
    var EXPRESSO_MACHINE_IMAGE = "images/expresso-machine.jpg";
    var COFFEE_MAKER_IMAGE = "images/coffee-maker.jpg";
    var TEA_POT_IMAGE = "images/tea-pot.jpg";
    // reel2 icons 
    var TAMPER_IMAGE = "images/tamper.jpg";
    var COFFEE_FILTER_IMAGE = "images/coffee-filter.jpg";
    var TEA_STRAINER_IMAGE = "images/tea-strainer.jpg";
    // reel3 icons
    var EXPRESSO_BEANS_IMAGE = "images/expresso-beans.png";
    var GROUND_COFFEE_IMAGE = "images/ground-coffee.jpg";
    var LOOSE_TEA_IMAGE = "images/loose-tea.jpg";
    // prizes icons
    var EXPRESSO_CUP_IMAGE = "images/expresso-cup.png";
    var COFFEE_CUP_IMAGE = "images/coffee-cup.png";
    var TEA_CUP_IMAGE = "images/tea-cup.png";


    function loadResources(engine) {
        Resources.load([
            SLOT_MACHINE_IMAGE,
            LEVER_IMAGE,
            EXPRESSO_MACHINE_IMAGE,
            COFFEE_MAKER_IMAGE,
            TEA_POT_IMAGE,
            TAMPER_IMAGE,
            COFFEE_FILTER_IMAGE,
            TEA_STRAINER_IMAGE,
            EXPRESSO_BEANS_IMAGE,
            GROUND_COFFEE_IMAGE,
            LOOSE_TEA_IMAGE,
            EXPRESSO_CUP_IMAGE,
            COFFEE_CUP_IMAGE,
            TEA_CUP_IMAGE
        ]);
        engine.lastTime = Date.now();
        Resources.onReady(engine.start.bind(engine));
    }

    loadResources(engine);
    document.addEventListener("click", function(event) {
        engine.handleMouseEvent("click", event);
    });

    var tryAgainMessage = document.getElementById("try-again-message");

    var showTryAgainMessage = function() {
        tryAgainMessage.style.display = "block";
    };

    var hideTryAgainMessage = function() {
        tryAgainMessage.style.display = "none";
    };

    var stopped = true;

    // display prize
    var prize = null;
    var showPrize = function(ind) {
        prize = prizes[ind];
        prize.visible = true;
        stopped = true;
    };
    // Compare values on stopped reels
    var values = [];
    var onStop = function(value) {
        values.push(value);
        if (values.length === 3) {
            if (values[0] === values[1] && values[0] === values[2]) {
                setTimeout(showPrize(values[0]), 0);
            } else {
                stopped = true;
                setTimeout(showTryAgainMessage(), 0);
            }
        }
    };

    var start = function() {
        hideTryAgainMessage();
        if (stopped) {
            stopped = false;

            if (prize !== null) {
                prize.visible = false;
            }
            values.length = 0;

            var r;
            for (var i in reels) {
                r = reels[i];
                r.setMaxSpeed(getRandomInt(10, 15));
                r.setAcceleration(getRandomInt(5, 10));
                r.spin = true;
            }

        }
    };

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    // Add reels to the screen
    reels.push(new Reel(REEL1_X, REELS_Y, REELS_HEIGHT, EXPRESSO_MACHINE_IMAGE, COFFEE_MAKER_IMAGE, TEA_POT_IMAGE));
    reels.push(new Reel(REEL1_X + 1, REELS_Y, REELS_HEIGHT, TAMPER_IMAGE, COFFEE_FILTER_IMAGE, TEA_STRAINER_IMAGE));
    reels.push(new Reel(REEL1_X + 2, REELS_Y, REELS_HEIGHT, EXPRESSO_BEANS_IMAGE, GROUND_COFFEE_IMAGE, LOOSE_TEA_IMAGE));

    for (var i in reels) {
        reels[i].setOnStopCallback(onStop);
        engine.addEntityToScreen(reels[i]);
    }

    // Add SlotMachine Image and reels borders to te screen
    engine.addEntityToScreen(new SlotMachine(1.32, 0, SLOT_MACHINE_IMAGE));
    engine.addEntityToScreen(new ReelsBorder(REEL1_X, REELS_Y, REELS_HEIGHT, BORDER_WIDTH));

    // Add start button to the screen
    var button = new Button(5, 3, 1, 2, LEVER_IMAGE, start);
    engine.addEntityToScreen(button);
    engine.addMouseEventSubscribtion(new MouseEventSubscribtion("click", button, button.onMouseClick.bind(button)));

    // Add prizes to the screen
    prizes.push(new Prize(2.1, 5.2, EXPRESSO_CUP_IMAGE));
    prizes.push(new Prize(2.3, 5.5, COFFEE_CUP_IMAGE));
    prizes.push(new Prize(2.1, 5.5, TEA_CUP_IMAGE));

    for (var i in prizes) {
        engine.addEntityToScreen(prizes[i]);
    }
};