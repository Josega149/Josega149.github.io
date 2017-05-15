/**

All this code was made by me: Jose Gabriel Tamura

But the idea of the game is not mine. I implement this game from "Peak logic"

*/
var dificultad = 0;

var tiempoTotal = 60;
//1 minuto en segundos
var tiempoTrascurrido;


var cuantosHaHundido = 0;
var noHaTerminadoDeResponder = true;
var target = 0;
var scoreAcumulado = 0;
var botonQueNoHayQueHundir = -1;


var scoreB = $("#scoreGame");
var time = $("#timeButton");
var targetButton = $("#targetButton");
var b0 = $("#button1");
var b1 = $("#button2");
var b2 = $("#button3");
var b3 = $("#button4");
var b4 = $("#button5");
var b5 = $("#button6");

var listaBotones = [ b0, b1, b2, b3, b4, b5 ];

var estaEnJuego = false;

//se ejecutan en paralelo
$("#startButton").on("click", function() {
    $("#startButton").css("background-color", "red");
    window.clearInterval(tiempoTrascurrido);
    estaEnJuego = true;
    scoreB.text("0");
    scoreAcumulado = 0;
    //las variables deben estar afuera porque si estan adentro van a ver varios eventos al tiempo si el usuario 
    //hace trampa y vuelve a dar START 
    tiempoTotal = 60;
    time.text(tiempoTotal);
    tiempoTrascurrido = window.setInterval(pasoUnSegundo, 1e3);
    function pasoUnSegundo() {
        console.log("paso un segundo");
        tiempoTotal -= 1;
        time.text(tiempoTotal);
        if (tiempoTotal <= 0) {
            window.clearInterval(tiempoTrascurrido);
            estaEnJuego = false;
            botonQueNoHayQueHundir=-1;
            normalizarBotones();
        }
    }
});

$("#startButton").on("click", function() {
    $(".buttonsN").css("visibility", "visible");
    $("#buttons6").css("visibility", "hidden");
    normalizarBotones();
    estaEnJuego = true;
    scoreAcumulado = 0;
    comenzarNuevoJuego();
});

function comenzarNuevoJuego() {
    target = 0;
    //dificultad 0 el target va de 10 hasta 20   con 5 botones
    //if(dificultad===0)
    {
        if (estaEnJuego) {
            cuantosHaHundido = 0;
            noHaTerminadoDeResponder = true;
            botonQueNoHayQueHundir = -1;
            //este va a ser el boton que no se incluye entre 0 y 4 botones
            botonQueNoHayQueHundir = Math.floor(Math.random() * 4 + 1);
            //del 1 al 6 para que no hayan confusiones
            var numeroDelBotonQueNoHayQueHundir = Math.floor(Math.random() * 6 + 1);
            //solo voy a permitir dos menores y esos no deben sumar 6
            //numero del 1 al 7
            var listaNumeros = [ -1, -1, -1, -1, -1 ];
            listaNumeros[botonQueNoHayQueHundir] = numeroDelBotonQueNoHayQueHundir;
            //voy a elegir el numero que no hay que undir primero
            // y voy a permitir maximo dos numeros que sean menores pero que no sumen el numero entre ellos 
            var primerNumeroMenorAgregado = -1;
            var segundoNumeroMenorAgregado = -1;
            for (var i = 0; i < 5; i++) {
                if (i !== botonQueNoHayQueHundir) {
                    var aleatorios = Math.floor(Math.random() * 10 + 1);
                    while 
                    (aleatorios === listaNumeros[0] || aleatorios === listaNumeros[1] || aleatorios === listaNumeros[2]
                    || aleatorios === listaNumeros[3] || aleatorios === listaNumeros[4] || 
                    //vuelvo a elegir si el numero que salio es menor al que no hay que undir y ya hay dos menores
                    //                si el numero que salio es menor y hay uno menor y sumados dan el numero que no hay que undir
                    (aleatorios < numeroDelBotonQueNoHayQueHundir && primerNumeroMenorAgregado !== -1 && segundoNumeroMenorAgregado !== -1 )|| 
                    (aleatorios < numeroDelBotonQueNoHayQueHundir && primerNumeroMenorAgregado !== -1 && primerNumeroMenorAgregado + aleatorios === numeroDelBotonQueNoHayQueHundir) )// no se agrega numero del boton que no hay que undir
                    {
                        aleatorios = Math.floor(Math.random() * 10 + 1);
                    }
                    if(aleatorios< numeroDelBotonQueNoHayQueHundir){
                        if(primerNumeroMenorAgregado ===-1)
                        {
                            primerNumeroMenorAgregado = aleatorios;
                        }
                        else
                        {
                            segundoNumeroMenorAgregado = aleatorios;
                        }
                    }
                    //todos los numeros que aparecen son diferentes
                    listaNumeros[i] = aleatorios;
                }
            }
            //hay que revisar que el que no hay que hundir para saber si hundiendolo tambien se 
            //llega al resultado
            //solo se llega al resultado si hay un conjunto de numeros que sumados dan ese resultado
            for (var j = 0; j < 5; j++) {
                listaBotones[j].text(listaNumeros[j]);
                if (j !== botonQueNoHayQueHundir) {
                    target += listaNumeros[j];
                }
            }
            targetButton.text(target);
            //console.log("lista numeros " + listaNumeros);
            //console.log("pos boton no solucion " + botonQueNoHayQueHundir);
        }
    }
}

var listaHundidos = [];

$("#button1").on("click", function() {
    if(botonQueNoHayQueHundir ===-1){normalizarBotonesTimeUp();
    }
    else if (botonQueNoHayQueHundir === 0) {
        //perdio
        $("#button1").css("background-color", "red");
        scoreAcumulado -= 20;
        normalizarBotones();
        comenzarNuevoJuego();
        listaHundidos = [];
    } 
    else if (!listaContiene(1))
    {
        listaHundidosAdd(1);
        $("#button1").css("background-color", "green");
        cuantosHaHundido += 1;
        scoreAcumulado += 1;
        if (cuantosHaHundido === 4) {
            normalizarBotones();
            comenzarNuevoJuego();
            listaHundidos = [];
        }
    }
});

$("#button2").on("click", function() {
    if(botonQueNoHayQueHundir ===-1){normalizarBotonesTimeUp();
    }
    else if (botonQueNoHayQueHundir === 1) {
        //perdio
        $("#button2").css("background-color", "red");
        scoreAcumulado -= 20;
        normalizarBotones();
        comenzarNuevoJuego();
        listaHundidos = [];
    }
    else if (!listaContiene(2))
    {
        listaHundidosAdd(2);
        $("#button2").css("background-color", "green");
        cuantosHaHundido += 1;
        scoreAcumulado += 1;
        if (cuantosHaHundido === 4) {
            normalizarBotones();
            comenzarNuevoJuego();
            listaHundidos = [];
        }
    }
});

$("#button3").on("click", function() {
    if(botonQueNoHayQueHundir ===-1){normalizarBotonesTimeUp();
    }
    else if (botonQueNoHayQueHundir === 2) {
        //perdio
        $("#button3").css("background-color", "red");
        scoreAcumulado -= 20;
        normalizarBotones();
        comenzarNuevoJuego();
        listaHundidos = [];
    }
    else if (!listaContiene(3))
    {
        listaHundidosAdd(3);
        $("#button3").css("background-color", "green");
        cuantosHaHundido += 1;
        scoreAcumulado += 1;
        if (cuantosHaHundido === 4) {
            normalizarBotones();
            comenzarNuevoJuego();
            listaHundidos = [];
        }
    }
});

$("#button4").on("click", function() {
    if(botonQueNoHayQueHundir ===-1){normalizarBotonesTimeUp();
    }
    else if (botonQueNoHayQueHundir === 3) {
        //perdio
        $("#button4").css("background-color", "red");
        scoreAcumulado -= 20;
        normalizarBotones();
        comenzarNuevoJuego();
        listaHundidos = [];
    }
    else if (!listaContiene(4))
    {
    listaHundidosAdd(4);
        $("#button4").css("background-color", "green");
        cuantosHaHundido += 1;
        scoreAcumulado += 1;
        if (cuantosHaHundido === 4) {
            normalizarBotones();
            comenzarNuevoJuego();
            listaHundidos = [];
        }
    }
});

$("#button5").on("click", function() {
    if(botonQueNoHayQueHundir ===-1){normalizarBotonesTimeUp();
    }
    else if (botonQueNoHayQueHundir === 4) {
        //perdio
        $("#button5").css("background-color", "red");
        scoreAcumulado -= 20;
        normalizarBotones();
        comenzarNuevoJuego();
        listaHundidos = [];
    }
    else if (!listaContiene(5))
    {
        listaHundidosAdd(5);
        $("#button5").css("background-color", "green");
        cuantosHaHundido += 1;
        scoreAcumulado += 1;
        if (cuantosHaHundido === 4) {
            normalizarBotones();
            comenzarNuevoJuego();
            listaHundidos = [];
        }
    }
});

function listaContiene(numero)
{
    for(var h=0;h<listaHundidos.length;h++)
    {
        if(listaHundidos[h]===numero)
        {
            return true;
        }
    }
    return false;
}
function listaHundidosAdd(numeroA){
    listaHundidos[listaHundidos.length] = numeroA;
}

function normalizarBotones() {
    $(".buttonsN").css("background-color", "#D3D3D3");
    scoreB.text("Score: "+scoreAcumulado);
}
function normalizarBotonesTimeUp() {
    $(".buttonsN").css("background-color", "#D3D3D3");
    $(".buttonsN").text(-1);
    alert("Time's up!!");
}

$("#difficult").on("click", function() {
    if (dificultad === 0) {
        dificultad += 1;
        $("#difficult").css("background-color", "#7FFF00");
        $("#difficult").text("medium");
    } else if (dificultad === 1) {
        dificultad += 1;
        $("#difficult").css("background-color", "#8B008B");
        $("#difficult").text("hard");
    } else {
        dificultad = 0;
        $("#difficult").css("background-color", "yellow");
        $("#difficult").text("easy");
    }
});