(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateAdminitrador', ControllerUpdateAdminitrador);
	ControllerUpdateAdminitrador.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory', 'AdministradorFactory'];

	function ControllerUpdateAdminitrador($scope, $compile, AdminService, $state,HelpersFactory, AdministradorFactory){
		var helper = HelpersFactory;
		$scope.administradorUpdate = angular.copy($scope.administrador);
		var body = angular.element(document).find('body');


		$scope.updateAdminsitrador = function(){
			AdminService
				.putAdministrador($scope.administradorUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						AdministradorFactory.setInfo($scope.administradorUpdate);
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