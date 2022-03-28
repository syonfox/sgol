// let leaflet_map = L.map('map').setView([51.505, -0.09], 13);
//
// let p5_canvas;
//
//
//
// // const SCALE = 1.0;
// //const ROOT2 = sqrt(2); // gota save that one root
//
// //COLISIONS ARE HERES SO IT LOADS THE FUNCTION
//
// function collision(a, b) {
//     return (a.pos.dist(b.pos))<(a.r+b.r);
//     //return false;
// }
//
//
// function collisions() {
//     //bullets rocks
//     //console.log("Starting colision:")
//     var destBullet = false;
//     for(var i = bullets.length-1; i >= 0; i--) {
//         destBullet = false;
//         for(var j = rocks.length-1; j >= 0; j--) {
//
//             //
//             if(collision(bullets[i], rocks[j])) {
//                 console.log("i,j , bl , rl" + i + " , " + j + " , "+ bullets.length + " , " + rocks.length);
//                 //or this hack :)
//                 //bullets.splice(i,1);
//                 //j = -1; //skips the rest of the rock and lets the collision be handled
//                 destBullet = true; //Have to leave the bullet alive ???
//                 //should i
//                 //bullets.splice(i,1);
//                 //break;
//
//                 if(rocks[j].r < 10) {
//                     rocks.splice(j,1);
//                 }
//
//                 else {
//
//                     rocks.push(new Rock(
//                         createVector(rocks[j].pos.x, rocks[j].pos.y),
//                         rocks[j].r/sqrt(2),
//                         createVector(random(-6,6),random(-6,6)),
//                         random()*0.3
//                     ));
//
//                     rocks[j] = new Rock(
//                         createVector(rocks[j].pos.x, rocks[j].pos.y),
//                         rocks[j].r/sqrt(2), //half area
//                         createVector(random(-6,6),random(-6,6)),
//                         random()*0.3
//                     )  ;
//                 }
//
//
//                 console.log("i,j , bl , rl" + i + " , " + j + " , "+ bullets.length + " , " + rocks.length);
//
//             } //end if collision
//         } //end for rocks
//         if(destBullet)
//             bullets.splice(i,1);
//     } // end for bullets
//
//     //rocks layer
//
// }
//
//
// var rocks = [];
// var player;
// var rocks = [];
// var bullets = [];
//
//
//
// async function setup() {
//
//     let worldRes = await fetch('./world_simple.json');
//
//     let worldJson = await worldRes.json();
//
//     let layer = L.geoJSON(worldJson, {
//         style: f=>{
//             return {
//                 color: '#ff0000'
//             }
//         }
//     })
//
//     layer.addTo(leaflet_map);
//     //canvasSize = createVector(screen.width,screen,height);
//     //console.log(screen.width);
//     //createCanvas(windowWidth, windowHeight);
//     //createCanvas(600, 400);
//     const canvasElt = createCanvas(windowWidth/SCALE, windowHeight/SCALE).elt;
//     canvasElt.style.width = '99%', canvasElt.style.height = '99%';
//     //background(0100);
//     frameRate(30);
//     player = new Player();
//     for(var i=0; i<10; i++) {
//         rocks.push(new Rock(
//             createVector(random(0,width), random(0,height)),
//             random(20,50),
//             createVector(random(-6,6),random(-6,6)),
//             random()*0.3
//         ));
//     }
//
//     strokeWeight(1/SCALE);
//     console.log("Setup...Sucsess");
//
// }
//
// function draw() {
//     background(0);
//     Rock.drawSettings();
//     for(var i =0; i<rocks.length; i++) {
//         rocks[i].update();
//         rocks[i].draw();
//     }
//     // player.update();
//     // player.draw();
//
//     Bullet.drawSettings();
//     for(var i =0; i<bullets.length; i++) {
//         bullets[i].update();
//         bullets[i].draw();
//     }
//     collisions();
// }


const DEBUG = false;
if (DEBUG) {

}
mobileConsole.show();

//const ROOT2 = sqrt(2); // gota save that one root
//COLISIONS ARE HERES SO IT LOADS THE FUNCTION

function collision(a, b) {
    return (a.pos.dist(b.pos)) < (a.r + b.r);
    //return false;
}


function collisions() {
    //bullets rocks
    //console.log("Starting colision:")
    var destBullet = false;
    for (var i = bullets.length - 1; i >= 0; i--) {
        destBullet = false;
        for (var j = rocks.length - 1; j >= 0; j--) {

            //
            if (collision(bullets[i], rocks[j])) {
                console.log("i,j , bl , rl" + i + " , " + j + " , " + bullets.length + " , " + rocks.length);
                //or this hack :)
                //bullets.splice(i,1);
                //j = -1; //skips the rest of the rock and lets the collision be handled
                destBullet = true; //Have to leave the bullet alive ???
                //should i
                //bullets.splice(i,1);
                //break;

                if (rocks[j].r < 10) {
                    rocks.splice(j, 1);
                } else {

                    rocks.push(new Rock(
                        createVector(rocks[j].pos.x, rocks[j].pos.y),
                        rocks[j].r / sqrt(2),
                        createVector(random(-6, 6), random(-6, 6)),
                        random() * 0.3
                    ));

                    rocks[j] = new Rock(
                        createVector(rocks[j].pos.x, rocks[j].pos.y),
                        rocks[j].r / sqrt(2), //half area
                        createVector(random(-6, 6), random(-6, 6)),
                        random() * 0.3
                    );
                }


                console.log("i,j , bl , rl" + i + " , " + j + " , " + bullets.length + " , " + rocks.length);

            } //end if collision
        } //end for rocks
        if (destBullet)
            bullets.splice(i, 1);
    } // end for bullets

    //rocks layer

}


var SCALE = 1;
var rocks = [];
var player;
var rocks = [];
var bullets = [];

//
function keyPressed() {
    console.log("KeyPressed = " + keyCode);
    if (keyCode == 87 || keyCode == 38) {
        player.thrusting = true;
    } else if (keyCode == 65 || keyCode == 37) {
        player.turning -= 1; //truen left
    } else if (keyCode == 68 || keyCode == 39) {
        player.turning += 1; //rurn right
    } else if (keyCode == 32) {
        player.shoot();
    }
    //console.log("KeyPressed = "+ keyCode + "thrusting: "+   player.thrusting);
}

function keyReleased() {
    if (keyCode == 87 || keyCode == 38) {
        player.thrusting = false;
    } else if (keyCode == 65 || keyCode == 37) {
        player.turning += 1; //stop turn left
    } else if (keyCode == 68 || keyCode == 39) {
        player.turning -= 1; // stoprurn right
    }
}


//obsorbs touch inpu so it dosent scroll mobile browsers todo: find out how to give contorle back
function touchMoved() {

    return false;
}


let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

// Lets put all our map options in a single object
// lat and lng are the starting point for the map.
const options = {
    lat: 39,
    lng: -90,
    zoom: 4,
    style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

async function addWorld() {

    let worldRes = await fetch('./world_simple.json');

    let worldJson = await worldRes.json();

    let layer = L.geoJSON(worldJson, {
        style: f => {
            return {
                color: '#ff0000'
            }
        }
    })


    return layer
}


function setup() {

    // const canvasElt = createCanvas(windowWidth/SCALE, windowHeight/SCALE);
    // canvasElt.style.width = '99%',
    //     canvasElt.style.height = '99%';
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.position = 'absolute';
    // background(100); let's uncomment this, we don't need it for now


    // Create a tile map with the options declared
    myMap = mappa.tileMap(options);

    addWorld().then(layer => {
        //world callback
        myMap.map.addLayer(layer)
    })

    myMap.overlay(canvas);


    player = new Player();
    for (var i = 0; i < 10; i++) {
        rocks.push(new Rock(
            createVector(random(0, width), random(0, height)),
            random(20, 50),
            createVector(random(-6, 6), random(-6, 6)),
            random() * 0.3
        ));
    }

    strokeWeight(1 / SCALE);
    console.log("Setup...Sucsess");
//


}

class Tail {
    constructor(draw, length) {

    }

}

function draw() {
    // Clear the previous canvas on every frame
    clear();

    var lewisburg = myMap.latLngToPixel(40.9895, -77.0564);

    fill("red");
    // Using that position, draw an ellipse
    ellipse(lewisburg.x, lewisburg.y, 20, 20);


    // background(0);
    Rock.drawSettings();
    for (var i = 0; i < rocks.length; i++) {
        rocks[i].update();
        rocks[i].draw();
    }
    // player.update();
    // player.draw();

    Bullet.drawSettings();
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].draw();
    }
    collisions();


}