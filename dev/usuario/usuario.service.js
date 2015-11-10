(function(){
	angular.module('app.Administrador')

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


		//Return de los metodos
		return {
			AgregarAutos:AgregarAutos


		};
	}

})();