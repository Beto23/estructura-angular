(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteAdministradorController', DeleteAdministradorController);
	DeleteAdministradorController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteAdministradorController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		$scope.cerrarPopup = function(){
			helper.popupClose();
		}
		//elminar un admin
		$scope.deleteAdmin = function(administrador){
			console.log(administrador);
			AdminService.deleteAdministrador(administrador).then(function(response){
				console.log(response)

			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
			} else {
				helper.popupClose();
				body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
			}

			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();