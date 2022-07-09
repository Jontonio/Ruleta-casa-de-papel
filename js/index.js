// funcion que ejecuta cargar ruleta
window.onload = () =>{
    cargarRuleta();
}

// Variables globales
var objRuleta;
var winningSegment;
var distnaciaX = 150;
var distnaciaY = 50;
var ctx;

// Falta implementar el mensaje de ganador
function Mensaje() {
    winningSegment = objRuleta.getIndicatedSegment();
    SonidoFinal();
    swal({
        title: " ¡ "+winningSegment.text+" !",
    
        imageUrl: "img/Muerte.png",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Ok,Reiniciar",
        cancelButtonText: "Quitar elemento",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function (isConfirm) {
        if (isConfirm) {
            
        } else {

            $('#ListaElementos').val($('#ListaElementos').val().replace(winningSegment.text,""));
            leerElementos();
            
        }
        objRuleta.stopAnimation(false);
        objRuleta.rotationAngle = 0;
        objRuleta.draw();
        DibujarTriangulo();
        bigButton.disabled = false;
    });
}

// Dibuja el triangulo que indica el numero que toco
function DibujarTriangulo() {
    distnaciaX = 75;
    distnaciaY = 5;
    ctx = objRuleta.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = '#000000';
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
            'outerRadius': 250,
            'innerRadius': 30,
            'segments':ArregloElementos,
            'animation':
            {
                'type': 'spinToStop',
                'duration':4,
                'spins': 15,
                'callbackFinished': 'Mensaje()',
                'callbackAfter': 'DibujarTriangulo()' 
                
            }, 
        
        });

    DibujarTriangulo();
}

// funcion que carga los elementos de la ruleta
function cargarRuleta() {
        var ElementosRuleta= [];
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "10" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "20" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "50" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "100" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "110" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "70" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "40" });
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': "80" });
        DibujarRuleta(ElementosRuleta);
} 

// Falta implementar
var audio = new Audio('alarma.mp3');  // Create audio object and load desired file.

function SonidoFinal(){
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}