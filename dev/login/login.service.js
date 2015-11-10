(function(){
	angular.module('app.Login')

	.factory('LoginService',LoginService)

	LoginService.$inject=['$q','$http','URL'];

	function LoginService($q,$http,URL){

		//Metodo ObtenerUsuarios
		function login(usuario){
			var deferred = $q.defer();

			var usuario = angular.fromJson(usuario);

			$http
				.post(URL.API + 'login', usuario)
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

		//Metodo Dar de alta
		function agregarClientes(cliente){
			var deferred = $q.defer();

			var cliente = angular.fromJson(cliente);

			$http
				.post(URL.API + 'addCliente', cliente)
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
			login: login,
			agregarClientes: agregarClientes
		};
	}

})();