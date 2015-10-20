(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('app', [
		'ui.router',
		'app.Login',
		'app.Mecanico',
		'app.Usuario',
		'app.Helpers'
	])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){ 

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: './login/login.html',
				controller: 'LoginController'
			})

	}])


})();
