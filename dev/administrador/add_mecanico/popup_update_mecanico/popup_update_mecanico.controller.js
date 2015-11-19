(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateMecanico', ControllerUpdateMecanico);
	ControllerUpdateMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerUpdateMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		var helper = HelpersFactory;
		$scope.mecanicoUpdate = angular.copy($scope.mecanico);
		console.log($scope.mecanicoUpdate);

		$scope.updateMecanico = function(){
			console.log("actualizando mecanicos");
			AdminService.putMecanicos($scope.mecanicoUpdate).then(function(response){
				console.log(response);
				$scope.mecanico = response;
				//cerrar popup
				helper.popupClose();
				//$state.reload()
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();