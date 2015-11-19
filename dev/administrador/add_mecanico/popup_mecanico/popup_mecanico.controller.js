(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerAgregarMecanico', ControllerAgregarMecanico);
	ControllerAgregarMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerAgregarMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.mecanico={};
		$scope.addMecanico = function(){
			console.log("agregando mecanicos");
			AdminService.agregarMecanicos($scope.mecanico).then(function(response){
				$scope.mecanicos.push(response)
				//cerrar popup
				helper.popupClose();
				$state.reload()
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();