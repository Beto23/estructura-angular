(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerMecanico', ControllerMecanico);
	ControllerMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
//ver mecanicos
		$scope.mecanicos=[];
		AdminService.getMecanico().then(function(response){
			//console.log(response);
			$scope.mecanicos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});

		$scope.eliminarMe = function(){
			
		$scope.mecanicos=[];
		}
	}

})();