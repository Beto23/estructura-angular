(function(){
	angular.module('app.Usuario')

	.factory('ClienteService',ClienteService)

	ClienteService.$inject=['$q','$http','URL'];

	function ClienteService($q,$http,URL){

		//Dar de alta mecanicos
		function AgregarAutos(auto){
			var deferred = $q.defer();

			var auto = angular.fromJson(auto);

			$http
				.post(URL.API + 'addAutos', auto)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
//actualizar Cliente
		function putCliente(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putCliente', req)
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
		function getMisCitas(id){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getMisCitas/' + id)
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
			AgregarAutos:AgregarAutos,
			putCliente:putCliente,
			getMisCitas:getMisCitas

		};
	}

})();