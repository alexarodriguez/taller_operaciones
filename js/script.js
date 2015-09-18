$(function()
{
	//Para generar la ecuación de la respuesta a buscar...
	var respuesta = 0;
	var numCifras = 2;
	var contCorrectas = 0;
	var ecuacionFinal = "";
	var cuentaTiempo=0;/// tiempo limite 
	var tiempo =0;

	swal("Bienvenido", "Ejercita tu cerebro", "success");
	//Para generar la ecuación en función del resultado dado...
	var ecuacionAdivina = function()
	{
		var operacion = "";
		if(numCifras >= 2)
		{
			var signoOpera = ["+", "-"];
			do
			{
				operacion = "";
				for(var i = 1; i <= numCifras; i++)
				{
					operacion += Math.floor(Math.random() * 3) + 1;
					if(i < numCifras)
					{
						operacion += " " + signoOpera[Math.floor(Math.random() * 2)] + " ";
					}
				}
				var valor = eval(operacion);
				if(valor === respuesta)
				{
					break;
				}
			}while(1);
		}
		return operacion;
	};

	//para validar botones
	for(var i = 1; i <=3; i++)
	{
			$("#respuesta_" + i).click(function(event) 
			{
				var ind = Number(this.id.split("_")[1]);
				console.log(ind);
				validarRespuesta(ind);

			});
	}
	//para validar la respuesta
	var validarRespuesta = function(ind)
	{
		if(respuesta === ind)
		{
			console.log("es correcto");
			clearInterval(tiempo);
			contCorrectas++;
		swal({title : "Es correcto", text : "La respuesta es:" + ecuacionFinal+"="+ind,imageUrl:"./img/correcto.jpg"},
			function(){
				nuevoJuego();
			});


						
		}
		else{
			console.log(" error");
			swal({title : "Error", text : "La respuesta correcta es:" + ecuacionFinal+"="+ind,imageUrl:"./img/error.jpg"},
			function(){
				location.reload();
			});
		}
	}

	//Para iniciar un nuevo Juego...
	var nuevoJuego = (function nuevoJuego()
	{
		if(contCorrectas % 2 === 0 && contCorrectas !== 0)
		{
			numCifras++;
		}
		respuesta = Math.floor(Math.random() * 3) + 1;
		ecuacionFinal = ecuacionAdivina();
		$("#ecuacion").html(ecuacionFinal + " = ?");
		$("#titulo").html("Número de Aciertos " + contCorrectas);

		//para validar el tiempo 
		cuentaTiempo=10;
		tiempo = setInterval(function(){
									cuentaTiempo--;
									//para reiniciar el juego cuando el tiempo ha finalizado
									if (cuentaTiempo=== 0) {
										console.log("ha perdido");
										clearInterval(tiempo);
										swal({title : "Error", text : "Ha excedido el limite de tiempo",imageUrl:"./img/final.jpg"},
											function(){
												location.reload();
											});

									};
								$("#tiempo").html("Tiempo: " + cuentaTiempo);
							}, 1000);
		return  nuevoJuego;

	})();
});