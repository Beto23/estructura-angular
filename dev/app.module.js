(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('app', [
		'ui.router',
		'app.Login',
		'app.Administrador',
		'app.Usuario',
		'app.Helpers'
	])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){ 

		$urlRouterProvider.otherwise('/');
/****************LOGIN**************/
		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: './login/login.html',
				controller: 'LoginController'
			})
/****************Perfil de usuario**************/
		$stateProvider
			.state('perfil', {
				abstract:true,
				url: '/perfilUser',
				templateUrl: './usuario/usuario.html'
			})
		$stateProvider
			.state('perfil.historial', {
				url: '/historial',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/historial/historial.html"
					}
				}
			})
		$stateProvider
			.state('perfil.misAutos', {
				url: '/misAutos',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/autos/autos.html"
					}
				}
			})
/****************Perfil administrador*/
		$stateProvider
			.state('administrador', {
				//abstract:true,
				url: '/perfilAdmin',
				templateUrl: './administrador/administrador.html'
			})
		$stateProvider
			.state('administrador.citas', {
				url: '/citas',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/citas/citas.html"
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
