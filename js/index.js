// funcion que ejecuta cargar ruleta
window.onload = () =>{
    cargarRuleta();
}
// Variables globales
let objRuleta;
let winningSegment;
let disableButtom = false;
let distnaciaX = 50;
let distnaciaY = 50;
let ctx;
// instancia de audio
let audioRuleta = new Audio('./assets/audio/ruleta.mp3');  // Create audio object and load desired file.
let audioWin = new Audio('./assets/audio/win.mp3');  // Create audio object and load desired file.

// Falta implementar el mensaje de ganador
function Mensaje() {
    winningSegment = objRuleta.getIndicatedSegment();
    SonidoFinal();
    winAnimation();
}

// Dibuja el triangulo que indica el número que toco
function DibujarTriangulo() {
    distnaciaX = 70;
    distnaciaY = 30;
    ctx = objRuleta.ctx;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = '#FFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(distnaciaX + 170, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 230, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 200, distnaciaY + 40);
    ctx.lineTo(distnaciaX + 171, distnaciaY + 5);
    ctx.stroke();
    ctx.fill();
}

// funcion que dibuja la ruleta
function DibujarRuleta(ArregloElementos) {
        
        objRuleta = new Winwheel({
            'canvasId': 'Ruleta',
            'numSegments': ArregloElementos.length,
            'outerRadius': 220,
            'innerRadius': 120,
            'textFontFamily'  : 'Courier',
            'textAligment' : 'inner',
            'segments':ArregloElementos,
            'animation':
            {
                'type': 'spinToStop',
                'duration':7,
                'spins': 15,
                'callbackFinished': 'Mensaje()',
                'callbackAfter': 'DibujarTriangulo()' 
                
            }, 
        
        });

    DibujarTriangulo();
}

// funcion que carga los elementos de la ruleta
function cargarRuleta() {

        var ElementosRuleta = [];

        ElementosRuleta.push({ 
                                'fillStyle': "#C91F37", 
                                'text': "S/100",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#DC3023", 
                                'text': "S/20",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#9D2933", 
                                'text': "S/50",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#CF000F", 
                                'text': "S/100",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#F22613", 
                                'text': "S/110",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#8F1D21",
                                'text': "S/70",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#CF3A24", 
                                'text': "S/40",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        ElementosRuleta.push({ 
                                'fillStyle': "#9D2933", 
                                'text': "S/80",
                                'textOrientation' : 'curved',
                                'textAligment' : 'center',
                                'textFontSize' : 25,
                                'textFillStyle':'#FFFFFF'
                            });
        DibujarRuleta(ElementosRuleta);
} 

// funcion win animation
function winAnimation(){

    // Get the number of the winning segment.
    let winningSegmentNumber = objRuleta.getIndicatedSegmentNumber();

    // Loop and set fillStyle of all segments to gray.
    for (let x = 1; x < objRuleta.segments.length; x ++) {
        objRuleta.segments[x].fillStyle = 'gray';
    }

    // Make the winning one yellow.
    objRuleta.segments[winningSegmentNumber].fillStyle = '#FF0000';

    // Call draw function to render changes.
    objRuleta.draw();

    // Also re-draw the pointer, otherwise it disappears.
    DibujarTriangulo();
}

function resetRuleta(){

    cargarRuleta();
    disableButtom = false;
}

// start game 
function start(){

    if(!disableButtom) {
        objRuleta.startAnimation();
        audioRuleta.pause();
        audioRuleta.currentTime = 0;
        audioRuleta.play();
    }
    disableButtom = true;
}

function SonidoFinal(){
    audioWin.pause();
    audioWin.currentTime = 0;
    audioWin.play();
}