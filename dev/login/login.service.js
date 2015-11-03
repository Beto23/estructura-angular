(function(){
	angular.module('app.Login')

	.factory('LoginService',LoginService)

	LoginService.$inject=['$q','$http','URL'];

	function LoginService($q,$http,URL){

		//Metodo ObtenerUsuarios
		function obtenerUsuarios(){
			var deferred = $q.defer();
			$http.get(URL.api + '/clientes')
			.success(function(response){
				deferred.resolve(response)
			}).catch(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		//Return de los metodos
		return {
			obtenerUsuarios: obtenerUsuarios
		};
	}

})();