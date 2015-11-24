(function(){
	angular.module('app.Usuario')
	.controller('ControllerAgregarAuto', ControllerAgregarAuto)
	ControllerAgregarAuto.$inject=['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];
	function ControllerAgregarAuto ($scope, $compile, ClienteService, $state, HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		var carro = UsuarioFactory.getInfo();

		$scope.auto={};
		$scope.addAuto = function(){
			console.log("agregando auto");
			console.log($scope.auto);
			var idCliente=carro.id_cliente;
			$scope.auto.id_cliente=idCliente;
			ClienteService
				.AgregarAutos($scope.auto)
				.then(function(response){
				$scope.cars.push(response)
				console.log(response)
				$state.reload();
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}
})()