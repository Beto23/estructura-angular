(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerAgregarAdmin', ControllerAgregarAdmin);
	ControllerAgregarAdmin.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerAgregarAdmin($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		//agregar un adminitrador
		$scope.administrador={};
		$scope.addAdminsitrador = function(){
			console.log("agregando administrador");
			AdminService.agregarAdministradores($scope.administrador).then(function(response){
				$scope.administradores.push(response)
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();