(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerAgregarAdmin', ControllerAgregarAdmin);
	ControllerAgregarAdmin.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerAgregarAdmin($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		//agregar un adminitrador
		$scope.administrador={};
		$scope.addAdminsitrador = function(){
			console.log("agregando administrador");
			AdminService
			.agregarAdministradores($scope.administrador)
			.then(function(response){
				$scope.administradores
				.push(response)
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