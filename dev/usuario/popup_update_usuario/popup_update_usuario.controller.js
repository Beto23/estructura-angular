(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('ControllerUpdateCliente', ControllerUpdateCliente);
	ControllerUpdateCliente.$inject = ['$scope', '$compile','ClienteService', '$state','HelpersFactory', 'UsuarioFactory'];

	function ControllerUpdateCliente($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		$scope.clienteUpdate = angular.copy($scope.cliente);

		$scope.updateCliente = function(){
			ClienteService
				.putCliente($scope.clienteUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						UsuarioFactory.setInfo($scope.clienteUpdate);
						helper.popupClose();
						$state.reload()
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}
	}

})();