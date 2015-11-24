(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('PopupRegistrarCliente', PopupRegistrarCliente);
	PopupRegistrarCliente.$inject = ['$scope', '$compile','LoginService', '$state','HelpersFactory'];

	function PopupRegistrarCliente($scope, $compile, LoginService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		$scope.cliente={};
		//$scope.cliente.nombre = undefined;
		//$scope.cliente.correo = undefined;
		//$scope.cliente.usuario = undefined;
		//$scope.cliente.password = undefined;
		

		$scope.addCliente = function(){
			LoginService.agregarClientes($scope.cliente).then(function(response){
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();