(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateCliente', ControllerUpdateCliente);
	ControllerUpdateCliente.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerUpdateCliente($scope, $compile, AdminService, $state,HelpersFactory){
		var helper = HelpersFactory;
		$scope.clienteUpdate = angular.copy($scope.cliente);

/*		$scope.updateMecanico = function(){
			console.log("actualizando mecanicos");
			AdminService.putMecanicos($scope.mecanicoUpdate).then(function(response){
				//cerrar popup
				helper.popupClose();
				$state.reload()
			}).catch(function(err){
				console.log(err)
			});
		}*/
	}
})();