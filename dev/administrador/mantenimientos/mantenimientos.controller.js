(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('MantenimientoController', MantenimientoController);
	MantenimientoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function MantenimientoController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.mantenimientos=[];
		AdminService.getMantenimientos().then(function(response){
			//cerrar popup
			$scope.mantenimientos=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});


		$scope.mantenimiento={};
		$scope.addMantenimiento = function(){
			console.log("agregando Mantenimiento");
			AdminService.agregarMantenimientos($scope.mantenimiento).then(function(response){
				$scope.mantenimientos.push(response)
				//console.log(response)
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();