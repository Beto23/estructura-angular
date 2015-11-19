(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteMecanicoController', DeleteMecanicoController);
	DeleteMecanicoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteMecanicoController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;

		$scope.cerrarPopup = function(){
			helper.popupClose();
		}
		//elminar una mecanico
		$scope.deleteMecanico = function(mecanico){
			AdminService.deleteMecanico(mecanico).then(function(response){
				console.log(response)

				/*$scope.mecanicos = $scope.mecanicos.filter(function(obj){
					return (obj.id_mecanico != mecanico.id_mecanico)
				});*/

				helper.popupClose();
				$state.reload();
			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();