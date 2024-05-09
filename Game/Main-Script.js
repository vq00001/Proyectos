let redGamePiece, blueGamePiece, greenGamePiece;

function startGame(){
    redGamePiece = new component(50, 50,"red", 0, 0);
    blueGamePiece = new component(50, 50,"blue", 0, 200);
    greenGamePiece = new component(50, 50,"green", 0, 400);
    gameArea.start();
};

let gameArea = {
        canvas : document.createElement("canvas"),
        start : function(){
            this.canvas.height = 450;
            this.canvas.width = 1000;
            this.canvas.style.borderColor = "black";  
            this.canvas.style.borderStyle = "solid";  
            this.canvas.style.borderWidth = "1px";  
            this.canvas.style.borderRadius = "3px";  

            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);

            this.interval = setInterval(updateGame, 20)
        },
        clear : function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
};


function component(width, height, color, x, y){
    this.width = width; 
    this.height = height; 
    this.color = color; 
    this.x = x; 
    this.y = y; 
    this.update = function(){
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

function movePieces(piece, xcounter, ycounter, speed){
    
    if(piece.x < 0){
        xcounter = true;
    }else if(piece.x > 950){
     xcounter = false;
    };

    if(piece.y < 0){
        ycounter = true;
    }else if(piece.y > 400){
        ycounter = false;
    };

    xcounter? piece.x += speed : piece.x -= speed;
    ycounter? piece.y += speed : piece.y -= speed;
};


let xBlueCounter = true; 
let yBlueCounter = true; 

let xRedCounter = true; 
let yRedCounter = true; 

let xGreenCounter = true; 
let yGreenCounter = true; 



function updateGame(){
    gameArea.clear();

    movePieces(redGamePiece, xRedCounter, yRedCounter, 16);
    movePieces(blueGamePiece, xBlueCounter, yBlueCounter, 10);
    movePieces(greenGamePiece, xGreenCounter, yGreenCounter, 6);
    
    console.log("xGreenCounter: " + xGreenCounter);
    console.log("yGreenCounter: " + yGreenCounter);
    
    redGamePiece.update();
    blueGamePiece.update();
    greenGamePiece.update();
};

startGame();


    // if(blueGamePiece.x < 0){
    //     xBlueCounter = true;
    // }else if(blueGamePiece.x > 950){
    //     xBlueCounter = false;
    // };
    
    // if(blueGamePiece.y < 0){
    //     yBlueCounter = true;
    // }else if(blueGamePiece.y > 400){
    //     yBlueCounter = false;
    // };
    // xBlueCounter? blueGamePiece.x += 8 : blueGamePiece.x -= 8;
    // yBlueCounter? blueGamePiece.y += 8 : blueGamePiece.y -= 8;
    
    // if(redGamePiece.x < 0){
    //     xRedCounter = true;
    // }else if(redGamePiece.x > 950){
    //     xRedCounter = false;
    // };
    
    // if(redGamePiece.y < 0){
    //     yRedCounter = true;
    // }else if(redGamePiece.y > 400){
    //     yRedCounter = false;
    // };
    // xRedCounter? redGamePiece.x += 10 : redGamePiece.x -= 10;
    // yRedCounter? redGamePiece.y += 10 : redGamePiece.y -= 10;

    // if(greenGamePiece.x < 0){
    //     xGreenCounter = true;
    // }else if(greenGamePiece.x > 950){
    //     xGreenCounter = false;
    // };
    
    // if(greenGamePiece.y < 0){
    //     yGreenCounter = true;
    // }else if(greenGamePiece.y > 400){
    //     yGreenCounter = false;
    // };
    // xGreenCounter? greenGamePiece.x += 4 : greenGamePiece.x -= 4;
    // yGreenCounter? greenGamePiece.y += 4 : greenGamePiece.y -= 4;

