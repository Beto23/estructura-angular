(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateMecanico', ControllerUpdateMecanico);
	ControllerUpdateMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory', 'AdministradorFactory'];

	function ControllerUpdateMecanico($scope, $compile, AdminService, $state, HelpersFactory, AdministradorFactory){
		var helper = HelpersFactory;
		$scope.mecanicoUpdate = angular.copy($scope.mecanico);
		var body = angular.element(document).find('body');

		$scope.updateMecanico = function(){
			AdminService
				.putMecanicos($scope.mecanicoUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						console.log(response.msj)
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-errro>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}

	}

})();