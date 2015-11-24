(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('app', [
		'ui.router',
		'app.constants',
		'app.Error',
		'app.Okey',
		'swxSessionStorage',
		'anguFixedHeaderTable',
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
				templateUrl: './usuario/usuario.html',
				controller: 'UsuarioController'
			})
		$stateProvider
			.state('perfil.historial', {
				url: '/historial',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/historial/historial.html",
						controller:'HistorialController'
					}
				}
			})
		$stateProvider
			.state('perfil.misAutos', {
				url: '/misAutos',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/autos/autos.html",
						controller:'AutoController'
					}
				}
			})
		$stateProvider
			.state('perfil.consejos', {
				url: '/consejos',
				views: {
					"contentPerfil": {
						templateUrl:"./usuario/consejos/consejos.html"
					}
				}
			})
/****************Perfil administrador*/
		$stateProvider
			.state('administrador', {
				//abstract:true,
				url: '/perfilAdmin',
				templateUrl: './administrador/administrador.html',
				controller: 'AdministradorController'
			})
		$stateProvider
			.state('administrador.citas', {
				url: '/citas',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/citas/citas.html",
						controller:'CitaController'
					}
				}
			})
		$stateProvider
			.state('administrador.historial', {
				url: '/historial',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/historial/historial.html",
						controller:'ControllerHistorialCitas'
					}
				}
			})
		$stateProvider
			.state('administrador.clientes', {
				url: '/clientes',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/clientes/clientes.html",
						controller:'ClientesController'
					}
				}
			})
		$stateProvider
			.state('administrador.mecanico', {
				url: '/mecanico',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/add_mecanico/add_mecanico.html",
						controller:'ControllerMecanico'
					}
				}
			})
		$stateProvider
			.state('administrador.mantenimientos', {
				url: '/mantenimientos',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/mantenimientos/mantenimientos.html",
						controller:'MantenimientoController'
					}
				}
			})
		$stateProvider
			.state('administrador.admin', {
				url: '/admin',
				views: {
					"contentPerfil": {
						templateUrl:"./administrador/admin/admin.html",
						controller:'AdminController'
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
