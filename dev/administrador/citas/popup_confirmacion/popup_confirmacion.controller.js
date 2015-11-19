(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteCitaController', DeleteCitaController);
	DeleteCitaController.$inject = ['$state', '$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteCitaController($state, $scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;

		//elminar una cita
		$scope.deleteCitas = function(cita){
			var param = {
				"id_citas":cita.Id
			}
			AdminService
				.deleteCita(param)
				.then(function(response){
					console.log(response)
					helper.popupClose();
					$state.reload();
				})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();
