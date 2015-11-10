(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerMecanico', ControllerMecanico);
	ControllerMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.mecanicos=[];
		AdminService.getMecanico().then(function(response){
			console.log(response);
			$scope.mecanicos=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});


		$scope.mecanico={};
		$scope.addMecanico = function(){
			console.log("agregando mecanicos");
			AdminService.agregarMecanicos($scope.mecanico).then(function(response){
				$scope.mecanicos.push(response)
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();