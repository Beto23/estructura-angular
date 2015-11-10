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
			postCitas:postCitas

		};
	}

})();