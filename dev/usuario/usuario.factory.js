(function(){
	angular
		.module('app.Usuario')
		.factory('UsuarioFactory', UsuarioFactory);

		UsuarioFactory.$inject = ['$sessionStorage'];

		function UsuarioFactory($sessionStorage){
			var User = {};

			User.getInfo = function(){
				return $sessionStorage.get('User') || undefined;
			}

			User.setInfo = function(info){
				$sessionStorage.put('User', info);
			}

			User.logout = function(){
				$sessionStorage.empty();
			}

			return User;
		}
})();