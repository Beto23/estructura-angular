(function(){
	angular.module('app.Administrador')

	.factory('AdminService',AdminService)

	AdminService.$inject=['$q','$http','URL'];

	function AdminService($q,$http,URL){

		//Metodo Dar de alta Administradores
		function agregarAdministradores(administrador){
			var deferred = $q.defer();

			var administrador = angular.fromJson(administrador);

			$http
				.post(URL.API + 'addAdministrador', administrador)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}

		//Dar de alta mecanicos
		function agregarMecanicos(mecanico){
			var deferred = $q.defer();

			var mecanico = angular.fromJson(mecanico);

			$http
				.post(URL.API + 'addMecanico', mecanico)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Dar de alta mantenimientos
		function agregarMantenimientos(mantenimientos){
			var deferred = $q.defer();

			var mantenimientos = angular.fromJson(mantenimientos);

			$http
				.post(URL.API + 'addMantenimiento', mantenimientos)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos los mantenimientos que hay
		function getMantenimientos(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getMantenimientos')
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos los mecanicos que hay
		function getMecanico(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getMecanico')
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos los administradores que hay
		function getAdministradores(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getAdministradores')
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos los clientes que hay
		function getClientes(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getClientes')
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Dar de alta una cita
		function postCitas(cita){
			var deferred = $q.defer();

			var cita = angular.fromJson(cita);

			$http
				.post(URL.API + 'postCitas', cita)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos lAS citas que hay
		function getCitas(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getCitas')
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos los autosByclientes que hay
		function getAutosByClientes(id){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getAutosByClientes/' + id)
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function putCita(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putCita', req)
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function putMecanicos(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putMecanicos', req)
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function deleteCita(citaId){
			var deferred = $q.defer();
			var citaId = angular.fromJson(citaId);

			$http
				.delete(URL.API + 'deleteCita', {data: citaId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function deleteMecanico(mecanicoId){
			var deferred = $q.defer();
			var mecanicoId = angular.fromJson(mecanicoId);

			$http
				.delete(URL.API + 'deleteMecanico', {data: mecanicoId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function deleteMantenimiento(mantenimientoId){
			var deferred = $q.defer();
			var mantenimientoId = angular.fromJson(mantenimientoId);

			$http
				.delete(URL.API + 'deleteMantenimiento', {data: mantenimientoId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function putAdministrador(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putAdministrador', req)
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function putMantenimiento(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putMantenimientos', req)
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}

		//Return de los metodos
		return {
			agregarAdministradores: agregarAdministradores,
			agregarMecanicos: agregarMecanicos,
			agregarMantenimientos:agregarMantenimientos,
			getMantenimientos:getMantenimientos,
			getMecanico:getMecanico,
			getAdministradores:getAdministradores,
			getClientes:getClientes,
			postCitas:postCitas,
			getAutosByClientes:getAutosByClientes,
			getCitas:getCitas,
			putCita:putCita,
			putMecanicos:putMecanicos,
			deleteCita:deleteCita,
			deleteMecanico:deleteMecanico,
			deleteMantenimiento:deleteMantenimiento,
			putAdministrador: putAdministrador,
			putMantenimiento: putMantenimiento

		};
	}

})();