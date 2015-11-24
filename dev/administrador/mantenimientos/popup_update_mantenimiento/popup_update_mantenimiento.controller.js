(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateMantenimiento', ControllerUpdateMantenimiento);
	ControllerUpdateMantenimiento.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerUpdateMantenimiento($scope, $compile, AdminService, $state,HelpersFactory){
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');
		$scope.mantenimientoUpdate = angular.copy($scope.mantenimiento);

		$scope.updateMantenimiento = function(){

			AdminService
				.putMantenimiento($scope.mantenimientoUpdate)
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