(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminCitaAgregarController', AdminCitaAgregarController);
	AdminCitaAgregarController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory','AdministradorFactory'];

	function AdminCitaAgregarController($scope, $compile, AdminService, $state,HelpersFactory, AdministradorFactory){
		var admin = AdministradorFactory.getInfo();
		var body = angular.element(document).find('body');

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
		$scope.cita.id_administrador = admin.id_administrador;
		$scope.addCita = function(){
			var cita = angular.copy($scope.cita);
			cita.fecha_inicio=helper.dateYYYYMMDD(cita.fecha_inicio);
			cita.fecha_fin=helper.dateYYYYMMDD(cita.fecha_fin);

			AdminService
				.postCitas(cita)
				.then(function(response){
					if(response.estatus == 'ok'){
						console.log(response.msj);
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
			}).catch(function(err){
				console.log(err);
			});
		}

		$scope.autos = [];
		$scope.$watch("cita.id_cliente", function(id){
			if(id){
			//ver los autosByClientes
				$scope.autos=[];
				AdminService.getAutosByClientes(id).then(function(response){
					//cerrar popup
					$scope.autos=response
					//console.log(response);
				}).catch(function(err){
					console.log(err)
				});
			}
		})
	}
})();
