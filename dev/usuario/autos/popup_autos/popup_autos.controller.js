(function(){
	angular.module('app.Usuario')
	.controller('ControllerAgregarAuto', ControllerAgregarAuto)
	ControllerAgregarAuto.$inject=['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];
	function ControllerAgregarAuto ($scope, $compile, ClienteService, $state, HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');
		var carro = UsuarioFactory.getInfo();

		$scope.auto={};
		$scope.addAuto = function(){
			console.log($scope.auto);
			var idCliente=carro.id_cliente;
			$scope.auto.id_cliente=idCliente;
			ClienteService
				.AgregarAutos($scope.auto)
				.then(function(response){
				$scope.cars.push(response)
					if(response.estatus=="ok"){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					}
			}).catch(function(err){
				console.log(err)
			});
		}
	}
})()