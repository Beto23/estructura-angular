(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('ActualizarAutoController', ActualizarAutoController);
	ActualizarAutoController.$inject = ['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function ActualizarAutoController($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');
		$scope.autoUpdate = angular.copy($scope.auto);

		$scope.updateAuto = function(){
			ClienteService
				.putAuto($scope.autoUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}


}
})();