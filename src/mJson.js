/**
 * Permite generar consultas json y lanza eventos según se cumpla las
 * condiciones de coherencia con los valores obtenidos del objeto json.
 * 
 * EXAMPLE
 *
 * JavaScript
 *
 * mJson.on('login',function(data){
 *   if (data.login.status == true) {
 *     console.log('Se ha logeado correctamente con la cuenta: '
 *       + data.login.name)
 *   }   
 * })
 * 
 */
(function(window,$){
	__mJson = {}
	__mJson.memory = {}
	__mJson.memory.deals = []

	window.mJson = {
		/**
		 * Contiene un string con la url a la cual se realizaran las consultas
		 * json
		 * 
		 * @type {String}
		 */
		url: '',
		/**
		 * Contiene un Objeto Plano con todas las variables que se enviaran al
		 * servidor al momento de cargar la consulta json
		 * 
		 * @type {Object}
		 */
		data: {},
		/**
		 * Define el método con el cual se realizara la consulta json
		 *
		 * default 'get'
		 * 
		 * @type {String}
		 */
		method: 'get',
		/**
		 * Captura en procedimiento 'handler' para que sea ejecutado en caso de
		 * que se el 'deal' coincida con la respuesta 'json' obtenida.
		 *
		 * EXAMPLE
		 *
		 * mJson.on('token.access',function(data){
		 *   console.log("The Toekn is : " + data.token.access)
		 * })
		 * 
		 * @param  {string}   deal    Servirá como ruta para la variable que
		 *                            posea la respuesta json.
		 * @param  {function} handler Ejecutara este evento en cuanto se cumpla
		 *                            la condición predefinida en la variable
		 *                            deal
		 */
		on: function (deal, handler) {
			__mJson.memory.deals.push({
				deal: deal,
				handler: handler
			})
		},
		/**
		 * Realiza la llamada la servidor, procesa la data combinando la con la
		 * data del mJson previamente creada.
		 * 
		 * @param  {PlainObject} data     Contiene la data que sera enviada en
		 *                                conjunto con la consulta al servidor
		 * @param  {function}    handler  Ejecutara esta función al finalizar
		 *                                la comprovacion de todos los deal
		 *                                asociados
		 */
		call: function (data,handler) {

			var preData = mJson.data
			for (var key in data) {
				preData[key] = data[key]
			}

			data = preData

			$.ajax({
				url: window.mJson.url,
				dataType: 'json',
				type: window.mJson.method.toUpperCase(),
				data: data,
				success: function(data){

					var countHandlerAcives = 0

					__mJson.memory.deals.forEach(function(deal){
						var statusToLoad = true
						var conditions = deal.deal.replace(' ','').split(',')

						for (var i = 0; i < conditions.length; i++) {
							try {
								if (!eval('(data.'+conditions[i]+' !== undefined)')) statusToLoad = false
							} catch (ex) {
								statusToLoad = false
							}
						}


						if (statusToLoad) {
							deal.handler(data)
							countHandlerAcives++
						}
					})

					if (handler !== undefined) handler({
						actives: countHandlerAcives
					})

				}
			})

		}
	}
})(window,jQuery)