/**
 * Permite crear objetos html que interactuen con el teclado al mismo tiempo que
 * se puede ejecutar un evento en cuento termine de ejecutar el objeto.
 *
 * EXAMPLE
 *
 * JavaScript:
 *
 * keyGame.on("addSpeedCar",function(){
 *    console.log("add speed + 1")
 * })
 *
 * Asocia un evneto llamado 'addSpeedCar' a las interacciones de los objetos con
 * el teclado.
 * 
 * HMTL:
 * <i
 * 	cap-keyGame="w|UP"
 * 	data-eventGame="frontCar.on"
 * 	data-eventGameEnd="frontCar.off"
 * 	data-keydown-class="text-success"
 * 	data-keyup-class-rm="text-success"
 * 	class="fa fa-arrow-up fa-5x"></i>
 *
 * Muestra un icono que posee una flecha hacia arriba y al momento que se en el
 * teclado se presione la tecla 'w' o Flecha Arriba. se dispara el evento 
 * asociado a 'frontCar'. también tras el evento 'keydown' agregara al objeto la
 * clase 'text-success' y tras el evento 'keyup' removera la misma clase.
 *
 */
!(function(window,$){

	var eventKeyPress = function (event) {

		var charCode = event.which || event.keyCode
 	 	var charStr = String.fromCharCode(charCode).toLowerCase()

 	 	switch (charCode) {
 	 		case 38:
 	 			charStr = "UP"
 	 			break
 	 		case 37:
 	 			charStr = "LEFT"
 	 			break
 	 		case 39:
 	 			charStr = "RIGHT"
 	 			break
 	 		case 40:
 	 			charStr = "DOWN"
 	 			break
 	 		case 17:
 	 			charStr = "CTRL"
 	 			break
 	 		case 18:
 	 			charStr = "ALT"
 	 			break
 	 		case 32:
 	 			charStr = "SPACEBAR"
 	 			break
 	 		case 9:
 	 			charStr = "TAB"
 	 			break
 	 		case 16:
 	 			charStr = "MAYUS"
 	 			break
 	 		case 20:
 	 			charStr = "BLOCK MAYUS"
 	 			break
 	 		case 13:
 	 			charStr = "ENTER"
 	 			break
 	 		case 8:
 	 			charStr = "BACKSPACE"
 	 			break
 	 		case 46:
 	 			charStr = "SUPR"
 	 			break
 	 		case 36:
 	 			charStr = "HOME"
 	 			break
 	 		case 33:
 	 			charStr = "REPAG"
 	 			break
 	 		case 34:
 	 			charStr = "AVPAG"
 	 			break
 	 		case 35:
 	 			charStr = "END"
 	 			break
 	 		case 44:
 	 			charStr = "PRINT SCREEN"
 	 			break
 	 		case 45:
 	 			charStr = "INS"
 	 			break
 	 		case 27:
 	 			charStr = "ESC"
 	 			break
 	 		case 112:
 	 			charStr = "F1"
 	 			break
 	 		case 113:
 	 			charStr = "F2"
 	 			break
 	 		case 114:
 	 			charStr = "F3"
 	 			break
 	 		case 115:
 	 			charStr = "F4"
 	 			break
 	 		case 116:
 	 			charStr = "F5"
 	 			break
 	 		case 117:
 	 			charStr = "F6"
 	 			break
 	 		case 118:
 	 			charStr = "F7"
 	 			break
 	 		case 119:
 	 			charStr = "F8"
 	 			break
 	 		case 120:
 	 			charStr = "F9"
 	 			break
 	 		case 121:
 	 			charStr = "F10"
 	 			break
 	 		case 122:
 	 			charStr = "F11"
 	 			break
 	 		case 123:
 	 			charStr = "F12"
 	 			break
 	 		case 187:
 	 			charStr = "+"
 	 			break
 	 		case 189:
 	 			charStr = "-"
 	 			break
 	 	}	

 	 	// console.log(charCode+":"+charStr)

		// console.log(event.type+"="+(event.keyCode)+":"+String.fromCharCode(event.charCode))
		
		// console.log($("[cap-keyGame*=\"s\"],[cap-keyGame*=\"s\"]"))
		// return false

		// console.log(event.type)

		$("[cap-keyGame*=\""+charStr+"\"]").trigger('key.'+event.type)
	}

	$(document).on("keyup",eventKeyPress)
	$(document).on("keydown",eventKeyPress)
	$(document).on("keypress",eventKeyPress)

	$(document).on("key.keyup","[cap-keyGame]",function(){
		var addClass = $(this).data('keyup-class')
		var removeClass = $(this).data('keyup-class-rm')
		if (addClass) {
			$(this).addClass(addClass)
		}
		if (removeClass) {
			$(this).removeClass(removeClass)
		}

		var eventGameEnd = $(this).data("eventgameend")
		var inEventing = $(this).data("eventgamestating")

		$(this).data("eventgamestating","off")
		if (eventGameEnd && inEventing == "on") {
			$(window).trigger("keyGame."+eventGameEnd)			
		};
	})
	$(document).on("key.keydown","[cap-keyGame]",function(){
		var addClass = $(this).data('keydown-class')
		var removeClass = $(this).data('keydown-class-rm')
		if (addClass) {
			$(this).addClass(addClass)
		}
		if (removeClass) {
			$(this).removeClass(removeClass)
		}
		var eventGame = $(this).data("eventgame")
		var inEventing = $(this).data("eventgamestating")

		// console.log(inEventing)
		if (eventGame && inEventing != "on") {
			$(this).data("eventgamestating","on")
			$(window).trigger("keyGame."+eventGame)
		}
	})
	$(document).on("key.keypress","[cap-keyGame]",function(){
		var addClass = $(this).data('keypress-class')
		var removeClass = $(this).data('keypress-class-rm')
		if (addClass) {
			$(this).addClass(addClass)
		}
		if (removeClass) {
			$(this).removeClass(removeClass)
		}
	})

	window.keyGame = {
		/**
		 * Define un evento en cuanto este sea ejecutado por keyGame
		 * 
		 * @param  {string} event     Define el nobre del evento 
		 * @param  {function} handler Contiene la funcion que sera ejecutada en
		 *                            cuanto se dispare el evento
		 */
		on: function(event, handler) {
			$(window).on("keyGame."+event, handler)
		}
	}
 
})(window,jQuery)


