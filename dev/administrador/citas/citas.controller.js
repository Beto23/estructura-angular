(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('CitaController', CitaController);
	CitaController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function CitaController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
//Ver los clietes
		$scope.clientes=[];
		AdminService.getClientes().then(function(response){
			//cerrar popup
			$scope.clientes=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver administradores
		$scope.administradores=[];
		AdminService.getAdministradores().then(function(response){
			//console.log(response);
			$scope.administradores=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver los mecanicos
		$scope.mecanicos=[];
		AdminService.getMecanico().then(function(response){
			//console.log(response);
			$scope.mecanicos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver los mantenimientos
		$scope.mantenimientos=[];
		AdminService.getMantenimientos().then(function(response){
			//cerrar popup
			$scope.mantenimientos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//Dar de Alta una cita
		$scope.cita={};
		$scope.addCita = function(){
			console.log("agregando cita");
			AdminService.postCitas($scope.cita).then(function(response){
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}
})();
