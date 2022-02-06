var gun = new GUN('https://bullchat.syon.ca/gun');

gunauth = new GunAuth(gun);

sgol = {};

let hidden = document.createElement('div')
hidden.style.display = 'none';
document.body.appendChild(hidden);
let buildHTML = (opts) => {
    if (typeof opts == 'string') {
        let div = document.createElement('div');
        id = 'el_' + bs.id++;
        div.innerHTML = opts

        hidden.appendChild(div);
        return div
    } else {

        //do som fancy thing that makes sence
        // ie {tag: atterbutes}
        // ie {input: 'number'};
    }


    i


}


// let
//todo https://codepen.io/ashleystevens/pen/bGepJzm

//webrtc img capture


let webcamModFactory = function (config) {

    let container = document.createElement('div');
    let img = document.createElement('img')

    container.innerHTML = `
    
        <h1>Share Photo</h1>
    <p>
        This example demonstrates how to set up a media stream using your built-in webcam, fetch an image from that
        stream, and create a PNG using that image.
    </p>
    <div class="camera">
        <video name="video">Video stream not available.</video>
        <button name="startbutton">Take photo</button>
        <button name="startstream">Start Stream</button>
        <input id="framerate" type="number" step="1" min="0" max="60">

    </div>
    <canvas name="canvas">
    </canvas>
    <div class="output">
        <img name="photo" alt="The screen capture will appear in this box.">
    </div>
    `


    // (function () {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.

    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.

    var streaming = false;

    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    video = container.getElementById('video');
    canvas = container.getElementById('canvas');
    photo = container.getElementById('img[name="photo"]');
    startbutton = container.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);

    clearphoto();


    // Fill the photo with an indication that none has been
    // captured.

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.

    function takepicture(taken) {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');

            photo.setAttribute('src', data);
            return data;
        } else {
            clearphoto();
        }
    }

    // Set up our event listener to run the startup process
    // once loading is complete.







        let m = {};
        m.el = container
        m.el.classList.add('photo-class');
        // m.el.innerHTML = ' <img >';

        m.image = m.el.querySelector('img');
        m.image.style.width = '75vw';
        m.getValue = function () {
            return m.image.src;
        }
        m.setValue = function (val) {
            m.image.src = val;
            // photo.taken();
        }
        m.getDefault = function () {
            return val;
        }
        m.hookChange = function (fn) { //bullchat._localChange();
            m.taken = fn;
            //      photo.input.addEventListener('input', fn);
            // photo.button.addEventListener('click', fn);
        }


        return m;




}

// The proper game loop
// window.requestAnimationFrame(gameLoop);


// let vid = webcamModFactory();

/*
let frame = 0;
let frameSkip = 100;
let transmit = false

function gameLoop() {
    if (vid.taken && frame % frameSkip == 0 && transmit) {

        console.log("taking photo", frame);
        let dataUrl = takepicture(vid.taken)
        vid.setValue(dataUrl);
        vid.taken();
    }
    frame++;
    window.requestAnimationFrame(gameLoop);
}
*/

// let vidBullchat = new BullChat(gun, {
//     id: 'vid-bullchat',
//     container: '.vid-bullchat',
//     room: 'vidtest',
//     modules: [
//         {
//             type: 'textarea'
//         },
//         vid
//     ]
// })

sgol.bc = new BullChat(gun, {
    gunAuth: gunauth,
    title: 'Shared Bulletin Board',
    modules: [
        {
            name: 'input', el: buildHTML(`
        <small> Welcome to the sgol bullchat please be respectful on this public billboard / drop box. If you are malicious your just a dick and whats the point. ;)<br>
        You man enter any room and switch its mode from private encrypted to writing on the public graph
        
        </small>
        <input size="width: 100%" type="text">`)
        },
        //    {name: 'input', el: buildHTML({
        //            label: 'this is a label',
        //            input: {
        //                type: 'number',
        //                value: 42
        //            }
        //        })},
        {
            name: 'input', el: buildHTML(`
            <div><label>I </label><input type="text" placeholder="anon"> <label> was here!</label></div>
        `)
        },
        'textarea',
        // vid

    ],
    // initPanel: true


})




if (navigator.share) {
    navigator.share({
        title: 'BullChat Room',
        text: 'Check out my bullchat room',
        url: url,
    })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
}
