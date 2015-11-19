(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteAdministradorController', DeleteAdministradorController);
	DeleteAdministradorController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteAdministradorController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;

		//elminar una cita
/*		$scope.deleteMecanico = function(mecanicoId){
			AdminService.deleteMecanico($scope.id_mecanico).then(function(response){
				console.log(response)
				helper.popupClose();
			})
				.catch(function(res){
					console.log(res);
				});
		}*/
	}
})();