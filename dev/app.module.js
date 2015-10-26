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
		$stateProvider
			.state('perfil', {
				abstract:true,
				url: '/perfilUser',
				templateUrl: './usuario/perfil/perfil.html'
			})
		$stateProvider
			.state('perfil.historial', {
				url: '/historial',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/perfil/historial/historial.html"
					}
				}
			})
		$stateProvider
			.state('perfil.mantenimiento', {
				url: '/mantenimiento',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/perfil/mantenimiento/mantenimiento.html"
					}
				}
			})
		$stateProvider
			.state('perfil.misAutos', {
				url: '/misAutos',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/perfil/autos/autos.html"
					}
				}
			})

	}])
	.run(['$rootScope','$state','$stateParams',
		function ($rootScope,$state,$stateParams) {
			$rootScope.$on('$stateChangeSuccess',
			  function(event, toState, toParams, fromState, fromParams) {
			    $state.current = toState;
			    $rootScope.seccionActual = toState;
			  }
			)
		}
	]);


})();
