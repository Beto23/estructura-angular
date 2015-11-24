(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('ActualizarAutoController', ActualizarAutoController);
	ActualizarAutoController.$inject = ['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function ActualizarAutoController($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		$scope.autoUpdate = angular.copy($scope.auto);

		$scope.updateAuto = function(){
			ClienteService
				.putAuto($scope.autoUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
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