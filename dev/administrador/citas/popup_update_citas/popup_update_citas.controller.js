(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminCitaUpateController', AdminCitaUpateController);
	AdminCitaUpateController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function AdminCitaUpateController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		$scope.citaUpdate = angular.copy($scope.cita);
			$scope.citaUpdate.CitaFechaInicio = helper.stringToDate($scope.citaUpdate.CitaFechaInicio);
			$scope.citaUpdate.CitaFechaFin = helper.stringToDate($scope.citaUpdate.CitaFechaFin);
			$scope.autosUpdate = [];
			$scope.$watch("citaUpdate.IdCliente", function(id){
				if(id){
				//ver los autosByClientes
					$scope.autosUpdate=[];
					AdminService.getAutosByClientes(id).then(function(response){
						//cerrar popup
						$scope.autosUpdate=response
						//console.log(response);
					}).catch(function(err){
						console.log(err)
					});
				}
			})

		$scope.citaAcualizar = function(){
			//console.log("actualizando cita");
			var tmp = adaptar($scope.citaUpdate);
			//console.log(tmp);
			AdminService
				.putCita(tmp)
				.then(function(response){
					if(response.estatus == 'ok'){
						console.log(response.msj);
						helper.popupClose();
						$state.reload()
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}

		function adaptar(citas){
			return {
				id_citas: citas.Id,
				id_administrador: citas.IdAdmin,
				id_auto: citas.IdAuto,
				id_cliente: citas.IdCliente,
				id_mantenimiento: citas.IdMantenimiento,
				id_mecanico: citas.IdMecanico,
				//fecha_inicio: '2015-08-23',
				fecha_inicio: helper.dateYYYYMMDD(citas.CitaFechaInicio),
				//fecha_fin: '2015-08-24',
				fecha_fin: helper.dateYYYYMMDD(citas.CitaFechaFin),
				hora : citas.CitaHora
			}
		}
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
			console.log(response);
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
//ver las citas
		$scope.citas=[];
		AdminService.getCitas().then(function(response){
			//cerrar popup
			$scope.citas=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});


		

			
		
	}
})();
