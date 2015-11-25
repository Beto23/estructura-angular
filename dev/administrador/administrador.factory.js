(function(){
	angular
		.module('app.Administrador')
		.factory('AdministradorFactory', AdministradorFactory);

		AdministradorFactory.$inject = ['$sessionStorage'];

		function AdministradorFactory($sessionStorage){
			var Admin = {};

			Admin.getInfo = function(){
				return $sessionStorage.get('Admin') || undefined;
			}

			Admin.setInfo = function(info){
				$sessionStorage.put('Admin', info);
			}

			Admin.logout = function(){
				$sessionStorage.empty();
			}

			return Admin;
		}
})();