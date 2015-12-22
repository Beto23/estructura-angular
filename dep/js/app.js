(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./helper.module');
require('./helper.service');
require('./helper.directive');
require('./helper.factory');
},{"./helper.directive":2,"./helper.factory":3,"./helper.module":4,"./helper.service":5}],2:[function(require,module,exports){
(function () {

	angular
		.module('app.Helpers')
		.directive('popupClose', popupClose)
		.directive('mensajeClose', mensajeClose)
		.directive('popupAdd', popupAdd)
		.directive('fileUpload', fileUpload)
		
		fileUpload.$inject = ['HelpersService'];

		function fileUpload(HelpersService){
			return {
				restrict: 'A',
				scope:{
					fileUpload:'='
				},
				link: function(scope, element, attrs) {
					element.bind('change', function(){
						var file = element[0].files[0];
						HelpersService
							.upload(file)
							.then(function(response){
								scope.fileUpload = response.url;
							})
							.catch(function(response){
								console.log(response);
							});
					});
				}
			}
		}
		mensajeClose.$inject = ['$state']
		function mensajeClose($state){
			return{
				restrict: 'A',
				link: function(scope, elem, attrs){
					//remove directive
					 elem.bind('click', function(e) {
					 	if(e.target != this) return;
						elem.remove();
						$state.reload()
					 });
				}
			}
		}

		function popupClose(){
			return{
				restrict: 'A',
				link: function(scope, elem, attrs){
					//remove directive
					 elem.bind('click', function(e) {
					 	if(e.target != this) return;
						elem.remove();
					 });
				}
			}
		}

		popupAdd.$inject = ['$compile'];

		function popupAdd($compile){
			return{
				restrict: 'A',
				link: function(scope, elem, attrs) {
					var body = angular.element(document).find('body');
					elem.bind('click', function() {
						body.append($compile(attrs.popupAdd)(scope));
					});
				}
			}
		}
})();
},{}],3:[function(require,module,exports){
(function(){
	angular.module('app.Helpers')
	.factory('HelpersFactory', HelpersFactory);

	HelpersFactory.$inject = ['$state']

	function HelpersFactory(){

		var helperFactory = {};

		helperFactory.popupClose = function () {
			var body = angular.element(document).find('body');
			body.removeClass('popup-on');
			var popup = angular.element(document.querySelectorAll("[popup-close]"));
			popup[0].remove();
		};

		helperFactory.mensajeClose = function () {
			var body = angular.element(document).find('body');
			body.removeClass('popup-on');
			var popup = angular.element(document.querySelectorAll("[mensaje-close]"));
			popup[0].remove();
		};

		helperFactory.dateYYYYMMDD = function(date){
			var date = new Date(date);
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

			if(day < 10){
				day = '0' + day;
			}
			if(month < 10){
				month = '0' + month;
			}

			date = year + '-' + month + '-' + day;

			return date;
		}

		helperFactory.stringToDate = function(date){
			var date = date.split('-');
			date = date[0] + '/' + date[1] + '/' + date[2];

			return new Date(date);
		}
		return helperFactory;
	}
})();
},{}],4:[function(require,module,exports){
(function(){

	angular.module('app.Helpers', []);

})();
},{}],5:[function(require,module,exports){
(function(){
	angular
		.module('app.Helpers')
		.service('HelpersService', HelpersService);

		HelpersService.$inject = ['$http','$q', 'URL'];

		function HelpersService($http, $q, URL){

			function upload(file){
				var deferred = $q.defer();

				var fd = new FormData();
				fd.append('file', file);
				
				$http
					.post(URL.API + 'upload', fd, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					})
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

		return {
			upload: upload
		}
	}

})();
},{}],6:[function(require,module,exports){
require('./administrador.module.js');
require('./administrador.factory');
require('./administrador.controller');
require('./administrador.service');
require('./citas/_citas');
require('./clientes/_clientes');
require('./add_mecanico/_add_mecanico');
require('./mantenimientos/_mantenimientos');
require('./historial/historial-citas.controller');
require('./popup_welcome_admin/_popup_welcome_admin');
require('./admin/_admin');
},{"./add_mecanico/_add_mecanico":7,"./admin/_admin":18,"./administrador.controller":29,"./administrador.factory":30,"./administrador.module.js":31,"./administrador.service":32,"./citas/_citas":33,"./clientes/_clientes":44,"./historial/historial-citas.controller":49,"./mantenimientos/_mantenimientos":50,"./popup_welcome_admin/_popup_welcome_admin":61}],7:[function(require,module,exports){
require('./popup_mecanico/_popup_mecanico');
require('./popup_update_mecanico/_popup_update_mecanico');
require('./popup_ConfirmacionMeca/_popup_ConfirmacionMeca');
require('./mecanico.controller');
},{"./mecanico.controller":8,"./popup_ConfirmacionMeca/_popup_ConfirmacionMeca":9,"./popup_mecanico/_popup_mecanico":12,"./popup_update_mecanico/_popup_update_mecanico":15}],8:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerMecanico', ControllerMecanico);
	ControllerMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
//ver mecanicos
		$scope.mecanicos=[];
		AdminService.getMecanico().then(function(response){
			//console.log(response);
			$scope.mecanicos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});

		$scope.eliminarMe = function(){
			
		$scope.mecanicos=[];
		}
	}

})();
},{}],9:[function(require,module,exports){
require('./popup_ConfirmacionMeca.directive');
require('./popup_ConfirmacionMeca.controller');
},{"./popup_ConfirmacionMeca.controller":10,"./popup_ConfirmacionMeca.directive":11}],10:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteMecanicoController', DeleteMecanicoController);
	DeleteMecanicoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteMecanicoController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;

		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		//elminar una mecanico
		$scope.deleteMecanico = function(mecanico){
			console.log(mecanico);
			AdminService.deleteMecanico(mecanico).then(function(response){
				console.log(response)

				/*$scope.mecanicos = $scope.mecanicos.filter(function(obj){
					return (obj.id_mecanico != mecanico.id_mecanico)
				});*/
			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
				//$state.reload();
			} else {
				helper.popupClose();
				body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
			}

			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();
},{}],11:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDeleteMeca', popupConfirmacionDeleteMeca);

	function popupConfirmacionDeleteMeca(){
		return{
				restrict: 'E',
				templateUrl: './administrador/add_mecanico/popup_ConfirmacionMeca/popup_ConfirmacionMeca.html',
				controller:'DeleteMecanicoController'
			}
	}

})();
},{}],12:[function(require,module,exports){
require('./popup_mecanico.controller');
require('./popup_mecanico.directive');
},{"./popup_mecanico.controller":13,"./popup_mecanico.directive":14}],13:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerAgregarMecanico', ControllerAgregarMecanico);
	ControllerAgregarMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerAgregarMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.mecanico={};
		$scope.addMecanico = function(){
			console.log("agregando mecanicos");
			AdminService.agregarMecanicos($scope.mecanico).then(function(response){
				$scope.mecanicos.push(response)
				//helper.popupClose();
				//$state.reload()
				if(response.estatus == 'ok'){
					helper.popupClose();
					body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					//$state.reload()
				} else {
					console.log(response.msj);
				}
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();
},{}],14:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarMecanico', popupAgregarMecanico);

	function popupAgregarMecanico(){
		return{
				restrict: 'E',
				templateUrl: './administrador/add_mecanico/popup_mecanico/popup_mecanico.html',
				controller: 'ControllerAgregarMecanico'
			}
	}

})();
},{}],15:[function(require,module,exports){
require('./popup_update_mecanico.controller');
require('./popup_update_mecanico.directive');

},{"./popup_update_mecanico.controller":16,"./popup_update_mecanico.directive":17}],16:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateMecanico', ControllerUpdateMecanico);
	ControllerUpdateMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory', 'AdministradorFactory'];

	function ControllerUpdateMecanico($scope, $compile, AdminService, $state, HelpersFactory, AdministradorFactory){
		var helper = HelpersFactory;
		$scope.mecanicoUpdate = angular.copy($scope.mecanico);
		var body = angular.element(document).find('body');

		$scope.updateMecanico = function(){
			AdminService
				.putMecanicos($scope.mecanicoUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						console.log(response.msj)
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-errro>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}

	}

})();
},{}],17:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateMecanico', popupUpdateMecanico);

	function popupUpdateMecanico(){
		return{
				restrict: 'E',
				scope: {
					mecanico: "="
				},
				templateUrl: './administrador/add_mecanico/popup_update_mecanico/popup_update_mecanico.html',
				controller: 'ControllerUpdateMecanico'
			}
	}

})();
},{}],18:[function(require,module,exports){
require('./popup_admin/_popup_admin');
require('./popup_update_admin/_popup_update_admin');
require('./popup_ConfirmacionAdmin/_popup_ConfirmacionAdmin');
require('./admin.controller');
},{"./admin.controller":19,"./popup_ConfirmacionAdmin/_popup_ConfirmacionAdmin":20,"./popup_admin/_popup_admin":23,"./popup_update_admin/_popup_update_admin":26}],19:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminController', AdminController);
	AdminController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function AdminController($scope, $compile, AdminService, $state,HelpersFactory){

//ver administradores
		$scope.administradores=[];
		AdminService.getAdministradores().then(function(response){
			console.log(response);
			$scope.administradores=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],20:[function(require,module,exports){
require('./popup_ConfirmacionAdmin.controller');
require('./popup_ConfirmacionAdmin.directive');
},{"./popup_ConfirmacionAdmin.controller":21,"./popup_ConfirmacionAdmin.directive":22}],21:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteAdministradorController', DeleteAdministradorController);
	DeleteAdministradorController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteAdministradorController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		$scope.cerrarPopup = function(){
			helper.popupClose();
		}
		//elminar un admin
		$scope.deleteAdmin = function(administrador){
			console.log(administrador);
			AdminService.deleteAdministrador(administrador).then(function(response){
				console.log(response)

			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
			} else {
				helper.popupClose();
				body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
			}

			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();
},{}],22:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDeleteAdmin', popupConfirmacionDeleteAdmin);

	function popupConfirmacionDeleteAdmin(){
		return{
				restrict: 'E',
				templateUrl: './administrador/admin/popup_ConfirmacionAdmin/popup_ConfirmacionAdmin.html',
				controller:'DeleteAdministradorController'
			}
	}

})();
},{}],23:[function(require,module,exports){
require('./popup_admin.directive');
require('./popup_admin.controller');
},{"./popup_admin.controller":24,"./popup_admin.directive":25}],24:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerAgregarAdmin', ControllerAgregarAdmin);
	ControllerAgregarAdmin.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerAgregarAdmin($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		//agregar un adminitrador
		$scope.administrador={};
		$scope.addAdminsitrador = function(){
			console.log("agregando administrador");
			AdminService
			.agregarAdministradores($scope.administrador)
			.then(function(response){
				$scope.administradores
				.push(response)
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();
},{}],25:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarAdministrador', popupAgregarAdministrador);

	function popupAgregarAdministrador(){
		return{
				restrict: 'E',
				templateUrl: './administrador/admin/popup_admin/popup_admin.html',
				controller:'ControllerAgregarAdmin'
			}
	}

})();
},{}],26:[function(require,module,exports){
require('./popup_update_admin.directive');
require('./popup_update_admin.controller');

},{"./popup_update_admin.controller":27,"./popup_update_admin.directive":28}],27:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateAdminitrador', ControllerUpdateAdminitrador);
	ControllerUpdateAdminitrador.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory', 'AdministradorFactory'];

	function ControllerUpdateAdminitrador($scope, $compile, AdminService, $state,HelpersFactory, AdministradorFactory){
		var helper = HelpersFactory;
		$scope.administradorUpdate = angular.copy($scope.administrador);
		var body = angular.element(document).find('body');


		$scope.updateAdminsitrador = function(){
			AdminService
				.putAdministrador($scope.administradorUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						AdministradorFactory.setInfo($scope.administradorUpdate);
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}
	}

})();
},{}],28:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateAdministrador', popupUpdateAdministrador);

	function popupUpdateAdministrador(){
		return{
				restrict: 'E',
				scope: {
					administrador: "="
				},
				templateUrl: './administrador/admin/popup_update_admin/popup_update_admin.html',
				controller: 'ControllerUpdateAdminitrador'
			}
	}

})();
},{}],29:[function(require,module,exports){
(function(){
	angular.module('app.Administrador')
	.controller('AdministradorController', AdministradorController);

	AdministradorController.$inject = ['$state', '$scope','AdministradorFactory'];

	function AdministradorController($state, $scope, AdministradorFactory){
		$scope.infoAdmin = AdministradorFactory.getInfo();
		//console.log($scope.infoAdmin);

		$scope.salir = function(){
			console.log("asd");
			AdministradorFactory.logout();
			$state.go('login');
		}
	}
})();
},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
(function(){

	angular.module('app.Administrador', []);

})();
},{}],32:[function(require,module,exports){
(function(){
	angular.module('app.Administrador')

	.factory('AdminService',AdminService)

	AdminService.$inject=['$q','$http','URL'];

	function AdminService($q,$http,URL){

		//Metodo Dar de alta Administradores
		function agregarAdministradores(administrador){
			var deferred = $q.defer();

			var administrador = angular.fromJson(administrador);

			$http
				.post(URL.API + 'addAdministrador', administrador)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}

		//Dar de alta mecanicos
		function agregarMecanicos(mecanico){
			var deferred = $q.defer();

			var mecanico = angular.fromJson(mecanico);

			$http
				.post(URL.API + 'addMecanico', mecanico)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Dar de alta mantenimientos
		function agregarMantenimientos(mantenimientos){
			var deferred = $q.defer();

			var mantenimientos = angular.fromJson(mantenimientos);

			$http
				.post(URL.API + 'addMantenimiento', mantenimientos)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos los mantenimientos que hay
		function getMantenimientos(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getMantenimientos')
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
		//Ver todos los mecanicos que hay
		function getMecanico(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getMecanico')
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
		//Ver todos los administradores que hay
		function getAdministradores(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getAdministradores')
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
		//Ver todos los clientes que hay
		function getClientes(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getClientes')
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
		//Dar de alta una cita
		function postCitas(cita){
			var deferred = $q.defer();

			var cita = angular.fromJson(cita);

			$http
				.post(URL.API + 'postCitas', cita)
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					deferred.reject(res);
				});

			return deferred.promise;
		}
		//Ver todos lAS citas que hay
		function getCitas(){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getCitas')
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
		//Ver todos los autosByclientes que hay
		function getAutosByClientes(id){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getAutosByClientes/' + id)
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
		function putCita(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putCita', req)
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
		function putMecanicos(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putMecanicos', req)
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
		function deleteCita(citaId){
			var deferred = $q.defer();
			var citaId = angular.fromJson(citaId);

			$http
				.delete(URL.API + 'deleteCita', {data: citaId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function deleteMecanico(mecanicoId){
			var deferred = $q.defer();
			var mecanicoId = angular.fromJson(mecanicoId);

			$http
				.delete(URL.API + 'deleteMecanico', {data: mecanicoId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function deleteMantenimiento(mantenimientoId){
			var deferred = $q.defer();
			var mantenimientoId = angular.fromJson(mantenimientoId);

			$http
				.delete(URL.API + 'deleteMantenimiento', {data: mantenimientoId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function deleteAdministrador(adminId){
			var deferred = $q.defer();
			var adminId = angular.fromJson(adminId);
			console.log(adminId);
			$http
				.delete(URL.API + 'deleteAdministrador', {data: adminId})
				.success(function(res) {
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}
		function putAdministrador(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putAdministrador', req)
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
		function putMantenimiento(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putMantenimientos', req)
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
			agregarAdministradores: agregarAdministradores,
			agregarMecanicos: agregarMecanicos,
			agregarMantenimientos:agregarMantenimientos,
			getMantenimientos:getMantenimientos,
			getMecanico:getMecanico,
			getAdministradores:getAdministradores,
			getClientes:getClientes,
			postCitas:postCitas,
			getAutosByClientes:getAutosByClientes,
			getCitas:getCitas,
			putCita:putCita,
			putMecanicos:putMecanicos,
			deleteCita:deleteCita,
			deleteMecanico:deleteMecanico,
			deleteMantenimiento:deleteMantenimiento,
			putAdministrador: putAdministrador,
			putMantenimiento: putMantenimiento,
			deleteAdministrador:deleteAdministrador

		};
	}

})();
},{}],33:[function(require,module,exports){
require('./citas.controller');
require('./popup_citas/_popup_citas');
require('./popup_update_citas/_popup_update_citas');
require('./popup_confirmacion/_popup_confirmacion');
},{"./citas.controller":34,"./popup_citas/_popup_citas":35,"./popup_confirmacion/_popup_confirmacion":38,"./popup_update_citas/_popup_update_citas":41}],34:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('CitaController', CitaController);
	CitaController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function CitaController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		
//ver las citas
	$scope.citas=[];
	AdminService.getCitas().then(function(response){
		//cerrar popup
		$scope.citas=response
	}).catch(function(err){
		console.log(err)
	});

}
})();

},{}],35:[function(require,module,exports){
require('./popup_citas.controller')
require('./popup_citas.directive')
},{"./popup_citas.controller":36,"./popup_citas.directive":37}],36:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminCitaAgregarController', AdminCitaAgregarController);
	AdminCitaAgregarController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory','AdministradorFactory'];

	function AdminCitaAgregarController($scope, $compile, AdminService, $state,HelpersFactory, AdministradorFactory){
		var admin = AdministradorFactory.getInfo();
		var body = angular.element(document).find('body');

		var helper = HelpersFactory;
//Ver los clietes
		$scope.clientes=[];
		AdminService.getClientes().then(function(response){
			//cerrar popup
			$scope.clientes=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver administradores
		$scope.administradores=[];
		AdminService.getAdministradores().then(function(response){
			$scope.administradores=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver los mecanicos
		$scope.mecanicos=[];
		AdminService.getMecanico().then(function(response){
			//console.log(response);
			$scope.mecanicos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver los mantenimientos
		$scope.mantenimientos=[];
		AdminService.getMantenimientos().then(function(response){
			//cerrar popup
			$scope.mantenimientos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//Dar de Alta una cita
		$scope.cita={};
		$scope.cita.id_administrador = admin.id_administrador;
		$scope.addCita = function(){
			var cita = angular.copy($scope.cita);
			cita.fecha_inicio=helper.dateYYYYMMDD(cita.fecha_inicio);
			cita.fecha_fin=helper.dateYYYYMMDD(cita.fecha_fin);

			AdminService
				.postCitas(cita)
				.then(function(response){
					if(response.estatus == 'ok'){
						console.log(response.msj);
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
			}).catch(function(err){
				console.log(err);
			});
		}

		$scope.autos = [];
		$scope.$watch("cita.id_cliente", function(id){
			if(id){
			//ver los autosByClientes
				$scope.autos=[];
				AdminService.getAutosByClientes(id).then(function(response){
					//cerrar popup
					$scope.autos=response
					//console.log(response);
				}).catch(function(err){
					console.log(err)
				});
			}
		})
	}
})();

},{}],37:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupCitas', popupAgregarCitas);

	function popupAgregarCitas(){
		return{
				restrict: 'E',
				templateUrl: './administrador/citas/popup_citas/popup_citas.html',
				controller:'AdminCitaAgregarController'
			}
	}

})();
},{}],38:[function(require,module,exports){
require('./popup_confirmacion.controller');
require('./popup_confirmacion.directive');
},{"./popup_confirmacion.controller":39,"./popup_confirmacion.directive":40}],39:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteCitaController', DeleteCitaController);
	DeleteCitaController.$inject = ['$state', '$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteCitaController($state, $scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;
		var body = angular.element(document).find('body');

		//elminar una cita
		$scope.deleteCitas = function(cita){
			var param = {
				"id_citas":cita.Id
			}
			AdminService
				.deleteCita(param)
				.then(function(response){
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();

},{}],40:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDelete', popupConfirmacionDelete);

	function popupConfirmacionDelete(){
		return{
				restrict: 'E',
				scope: {
					cita: "="
				},
				templateUrl: './administrador/citas/popup_confirmacion/popup_confirmacion.html',
				controller:'DeleteCitaController'
			}
	}

})();
},{}],41:[function(require,module,exports){
require('./popup_update_citas.directive')
require('./popup_update_citas.controller')
},{"./popup_update_citas.controller":42,"./popup_update_citas.directive":43}],42:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminCitaUpateController', AdminCitaUpateController);
	AdminCitaUpateController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function AdminCitaUpateController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.citaUpdate = angular.copy($scope.cita);
			$scope.citaUpdate.CitaFechaInicio = helper.stringToDate($scope.citaUpdate.CitaFechaInicio);
			$scope.citaUpdate.CitaFechaFin = helper.stringToDate($scope.citaUpdate.CitaFechaFin);
			$scope.autosUpdate = [];
			$scope.$watch("citaUpdate.IdCliente", function(id){
				if(id){
				//ver los autosByClientes
					$scope.autosUpdate=[];
					AdminService
						.getAutosByClientes(id)
						.then(function(response){
						$scope.autosUpdate=response
					}).catch(function(err){
						console.log(err)
					});
				}
			})

		$scope.citaAcualizar = function(){
			//console.log("actualizando cita");
			var tmp = adaptar($scope.citaUpdate);
			//console.log(tmp);
			AdminService
				.putCita(tmp)
				.then(function(response){
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}

		function adaptar(citas){
			return {
				id_citas: citas.Id,
				id_administrador: citas.IdAdmin,
				id_auto: citas.IdAuto,
				id_cliente: citas.IdCliente,
				id_mantenimiento: citas.IdMantenimiento,
				id_mecanico: citas.IdMecanico,
				//fecha_inicio: '2015-08-23',
				fecha_inicio: helper.dateYYYYMMDD(citas.CitaFechaInicio),
				//fecha_fin: '2015-08-24',
				fecha_fin: helper.dateYYYYMMDD(citas.CitaFechaFin),
				hora : citas.CitaHora
			}
		}
//Ver los clietes
		$scope.clientes=[];
		AdminService.getClientes().then(function(response){
			//cerrar popup
			$scope.clientes=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver administradores
		$scope.administradores=[];
		AdminService.getAdministradores().then(function(response){
			console.log(response);
			$scope.administradores=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver los mecanicos
		$scope.mecanicos=[];
		AdminService.getMecanico().then(function(response){
			//console.log(response);
			$scope.mecanicos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver los mantenimientos
		$scope.mantenimientos=[];
		AdminService.getMantenimientos().then(function(response){
			//cerrar popup
			$scope.mantenimientos=response
			//console.log(response);
		}).catch(function(err){
			console.log(err)
		});
//ver las citas
		$scope.citas=[];
		AdminService.getCitas().then(function(response){
			//cerrar popup
			$scope.citas=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});

	}
})();

},{}],43:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateCita', popupUpdateCita);

	function popupUpdateCita(){
		return{
				restrict: 'E',
				scope: {
					cita: "="
				},
				templateUrl: './administrador/citas/popup_update_citas/popup_update_citas.html',
				controller:'AdminCitaUpateController'
			}
	}

})();
},{}],44:[function(require,module,exports){
require('./popup_clientes/_popup_clientes');
require('./clientes.controller');
},{"./clientes.controller":45,"./popup_clientes/_popup_clientes":46}],45:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ClientesController', ClientesController);
	ClientesController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ClientesController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.clientes=[];
		AdminService.getClientes().then(function(response){
			//cerrar popup
			$scope.clientes=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}
})();
},{}],46:[function(require,module,exports){
require('./popup_clientes.controller');
require('./popup_clientes.directive');

},{"./popup_clientes.controller":47,"./popup_clientes.directive":48}],47:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateCliente', ControllerUpdateCliente);
	ControllerUpdateCliente.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerUpdateCliente($scope, $compile, AdminService, $state,HelpersFactory){
		var helper = HelpersFactory;
		$scope.clienteUpdate = angular.copy($scope.cliente);

/*		$scope.updateMecanico = function(){
			console.log("actualizando mecanicos");
			AdminService.putMecanicos($scope.mecanicoUpdate).then(function(response){
				//cerrar popup
				helper.popupClose();
				$state.reload()
			}).catch(function(err){
				console.log(err)
			});
		}*/
	}
})();
},{}],48:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateCliente', popupUpdateCliente);

	function popupUpdateCliente(){
		return{
				restrict: 'E',
				scope: {
					cliente: "="
				},
				templateUrl: './administrador/clientes/popup_clientes/popup_clientes.html',
				controller: 'ControllerUpdateCliente'
			}
	}

})();
},{}],49:[function(require,module,exports){
(function(){
	angular.module('app.Administrador')
	.controller('ControllerHistorialCitas', ControllerHistorialCitas);
	ControllerHistorialCitas.$inject=['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerHistorialCitas($scope, $compile, AdminService, $state,HelpersFactory){
		//ver historial de las citas
	$scope.historialCitas=[];
	AdminService
		.getCitas()
		.then(function(response){
		$scope.historialCitas=response
	}).catch(function(err){
		console.log(err)
	});
	}
})()
},{}],50:[function(require,module,exports){
require('./popup_mantenimientos/_popup_mantenimientos');
require('./popup_ConfirmarMantenimiento/_popup_ConfirmarMantenimiento');
require('./popup_update_mantenimiento/_popup_update_mantenimiento');
require('./mantenimientos.controller');
},{"./mantenimientos.controller":51,"./popup_ConfirmarMantenimiento/_popup_ConfirmarMantenimiento":52,"./popup_mantenimientos/_popup_mantenimientos":55,"./popup_update_mantenimiento/_popup_update_mantenimiento":58}],51:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('MantenimientoController', MantenimientoController);
	MantenimientoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function MantenimientoController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.mantenimientos=[];
		AdminService.getMantenimientos().then(function(response){
			//cerrar popup
			$scope.mantenimientos=response;
		}).catch(function(err){
			console.log(err)
		});
	}
})();
},{}],52:[function(require,module,exports){
require('./popup_ConfirmarMantenimiento.directive');
require('./popup_ConfirmarMantenimiento.controller');
},{"./popup_ConfirmarMantenimiento.controller":53,"./popup_ConfirmarMantenimiento.directive":54}],53:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('DeleteMantenimientoController', DeleteMantenimientoController);
	DeleteMantenimientoController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function DeleteMantenimientoController($scope, $compile, AdminService, $state,HelpersFactory){

		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		$scope.cerrarPopup = function(){
			helper.popupClose();
		}
		//elminar una mantenimientos
		$scope.deleteMantenimiento = function(mantenimientos){
			console.log(mantenimientos);
			AdminService.deleteMantenimiento(mantenimientos).then(function(response){
				console.log(response)

			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
			} else {
				helper.popupClose();
				body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
			}

			})
				.catch(function(res){
					console.log(res);
				});
		}
	}
})();
},{}],54:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupConfirmacionDeleteMante', popupConfirmacionDeleteMante);

	function popupConfirmacionDeleteMante(){
		return{
				restrict: 'E',
				templateUrl: './administrador/mantenimientos/popup_ConfirmarMantenimiento/popup_ConfirmarMantenimiento.html',
				controller:'DeleteMantenimientoController'
			}
	}

})();
},{}],55:[function(require,module,exports){
require('./popup_mantenimientos.controller');
require('./popup_mantenimientos.directive');

},{"./popup_mantenimientos.controller":56,"./popup_mantenimientos.directive":57}],56:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('MantenimientoAgregarController', MantenimientoAgregarController);
	MantenimientoAgregarController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function MantenimientoAgregarController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.mantenimiento={};
		$scope.addMantenimiento = function(){
			console.log("agregando Mantenimiento");
			AdminService.agregarMantenimientos($scope.mantenimiento).then(function(response){
				$scope.mantenimientos.push(response)
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}

			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();
},{}],57:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarMantenimiento', popupAgregarMantenimiento);

	function popupAgregarMantenimiento(){
		return{
				restrict: 'E',
				templateUrl: './administrador/mantenimientos/popup_mantenimientos/popup_mantenimientos.html',
				controller: 'MantenimientoAgregarController'
			}
	}

})();
},{}],58:[function(require,module,exports){
require('./popup_update_mantenimiento.controller');
require('./popup_update_mantenimiento.directive');
},{"./popup_update_mantenimiento.controller":59,"./popup_update_mantenimiento.directive":60}],59:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerUpdateMantenimiento', ControllerUpdateMantenimiento);
	ControllerUpdateMantenimiento.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerUpdateMantenimiento($scope, $compile, AdminService, $state,HelpersFactory){
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');
		$scope.mantenimientoUpdate = angular.copy($scope.mantenimiento);

		$scope.updateMantenimiento = function(){

			AdminService
				.putMantenimiento($scope.mantenimientoUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}
	}

})();
},{}],60:[function(require,module,exports){
(function() {

	angular.module('app.Administrador')
	.directive('popupUpdateMantenimiento', popupUpdateMantenimiento);

	function popupUpdateMantenimiento(){
		return{
				restrict: 'E',
				scope: {
					mantenimiento: "="
				},
				templateUrl: './administrador/mantenimientos/popup_update_mantenimiento/popup_update_mantenimiento.html',
				controller: 'ControllerUpdateMantenimiento'
			}
	}

})();
},{}],61:[function(require,module,exports){
require('./popup_welcome_admin.directive');
require('./popup_welcome_admin.controller');
},{"./popup_welcome_admin.controller":62,"./popup_welcome_admin.directive":63}],62:[function(require,module,exports){
(function(){
	angular.module('app.Administrador')
	.controller('WelcomeAdminController' ,WelcomeAdminController);
	WelcomeAdminController.$inject=['$scope', '$compile', '$state', 'HelpersFactory', 'AdministradorFactory'];

	function WelcomeAdminController($scope, $compile, $state, HelpersFactory, AdministradorFactory, timeout ){
		infoAdministrador=AdministradorFactory.getInfo();
		$scope.infoAdmin =infoAdministrador;
		console.log($scope.infoAdmin);

		helper=HelpersFactory;
		$scope.cerrarPopup = function(){
			console.log('33')
			helper.popupClose();
		}

	}
})();
},{}],63:[function(require,module,exports){
(function(){
	angular.module('app.Administrador')
	.directive('popupWelcomeAdmin', popupWelcomeAdmin);

	function popupWelcomeAdmin(){
		return{
				restrict: 'E',
				templateUrl: './administrador/popup_welcome_admin/popup_welcome_admin.html',
				controller:'WelcomeAdminController'
			}
	}
})()
},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
(function () {

angular
    .module('app.constants',[])
    .constant('URL', {
        API: 'http://localhost/estructura-angular/backend/index.php/',
        IMG_DEFAULT: 'http://localhost/estructura-angular/backend/uploads/default.jpg'
    });

})();
},{}],66:[function(require,module,exports){
require('./app.module');
require('./mensajeError/_error');
require('./mensajeOk/_correcto');
require('./_helpers/_helpers');
require('./login/_login');
require('./administrador/_administrador');
require('./usuario/_usuario');
require('./constants');

},{"./_helpers/_helpers":1,"./administrador/_administrador":6,"./app.module":64,"./constants":65,"./login/_login":67,"./mensajeError/_error":76,"./mensajeOk/_correcto":80,"./usuario/_usuario":84}],67:[function(require,module,exports){
require('./login.module');
require('./login.controller');
require('./login.service');
require('./popup_inicioSesion/_popup_inicioSesion');
require('./popup_registro/_popup_registro');
},{"./login.controller":68,"./login.module":69,"./login.service":70,"./popup_inicioSesion/_popup_inicioSesion":71,"./popup_registro/_popup_registro":73}],68:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('LoginController', LoginController);
	LoginController.$inject = ['$compile', '$scope', '$compile','LoginService', '$state','HelpersFactory','AdministradorFactory', 'UsuarioFactory'];

	function LoginController($compile, $scope, $compile, LoginService, $state, HelpersFactory, AdministradorFactory, UsuarioFactory){
		$scope.usuario={};
		var helper = HelpersFactory;
		var admin = AdministradorFactory;
		var user = UsuarioFactory;
		//console.log(admin.getInfo());
		//console.log(user.getInfo());

		var body = angular.element(document).find('body');

			
		$scope.login=function(){
			LoginService
				.login($scope.usuario)
				.then(function(res){
					if(res.estatus == 'ok'){
						if(res.tipoUsuario == 'admin'){
							console.log(res.msj);
							admin.setInfo(res.admin);
							helper.popupClose();
							$state.go('administrador.historial');
							body.append($compile("<popup-welcome-admin/>")($scope));
						} else {
							console.log(res.msj);
							user.setInfo(res.cliente);
							helper.popupClose();
							$state.go('perfil.historial');
							body.append($compile("<popup-welcome/>")($scope));
						}
					}else {
						console.log(res.msj);
						body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
					}
				})
				.catch(function(res){
					console.log(res)
				})
		}
		$scope.imgs = [
						['img/11924968_753512294771183_7096973777648509408_n.jpg', 'Las mejores instalaciones'],
						['img/perfilmecanico.jpg','Contamos con los mejores mecanicos'],
						['img/registrarCliente.jpg', 'El mejor trato a nuestros clientes'],
						['img/perfiluser.jpg','Perfil Usuario'],
						['img/registraMantt.jpg', 'Verifica tus mantenimientos']
					];
		//console.log("Login controller");
	}

})();
},{}],69:[function(require,module,exports){
(function(){

	angular.module('app.Login', ['angular-carousel']);

})();
},{}],70:[function(require,module,exports){
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
},{}],71:[function(require,module,exports){
require('./popup_inicioSesion.directive');
},{"./popup_inicioSesion.directive":72}],72:[function(require,module,exports){
(function() {

	angular.module('app.Login')
	.directive('popupSesion', popupInicioSesion);

	function popupInicioSesion(){
		return{
				restrict: 'E',
				templateUrl: './login/popup_inicioSesion/popup_inicioSesion.html',
				controller: 'LoginController'
			}
	}

})();
},{}],73:[function(require,module,exports){
require('./popup_registro.directive');
require('./popup_registro.controller');
},{"./popup_registro.controller":74,"./popup_registro.directive":75}],74:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Login')
	.controller('PopupRegistrarCliente', PopupRegistrarCliente);
	PopupRegistrarCliente.$inject = ['$scope', '$compile','LoginService', '$state','HelpersFactory'];

	function PopupRegistrarCliente($scope, $compile, LoginService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		$scope.cliente={};
		var body = angular.element(document).find('body');

		

		$scope.addCliente = function(){
			LoginService
				.agregarClientes($scope.cliente)
				.then(function(response){
					if(response.estatus=="ok"){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
					console.log(response.msj);
				}
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();
},{}],75:[function(require,module,exports){
(function() {

	angular.module('app.Login')
	.directive('popupRegistro', popupRegistro);

	function popupRegistro(){
		return{
				restrict: 'E',
				templateUrl: './login/popup_registro/popup_registro.html',
				controller:'PopupRegistrarCliente'
			}
	}

})();
},{}],76:[function(require,module,exports){
require('./error.module');
require('./error.directive');
require('./error.controller');
},{"./error.controller":77,"./error.directive":78,"./error.module":79}],77:[function(require,module,exports){
(function(){
	angular.module('app.Error')
	.controller('ControllerError', ControllerError);
	ControllerError.$inject=['$state', '$scope', '$compile', 'HelpersFactory'];
	function ControllerError ($state, $scope, $compile, HelpersFactory){
		var helper = HelpersFactory;
		$scope.CerrarPopup = function(){
			helper.mensajeClose();
		}
	}
})();
},{}],78:[function(require,module,exports){
(function(){
	angular
		.module('app.Error')
		.directive('mensajeError', mensajeError);

		function mensajeError(){
			return {
				restrict: 'E',
				scope: {
					error: "@"
				},
				templateUrl: './mensajeError/error.html',
				controller: 'ControllerError'
			}
		}
})();
},{}],79:[function(require,module,exports){
(function(){
	angular
		.module('app.Error', [])
})();
},{}],80:[function(require,module,exports){
require('./correcto.module');
require('./correcto.directive');
require('./correctodos.controller');
},{"./correcto.directive":81,"./correcto.module":82,"./correctodos.controller":83}],81:[function(require,module,exports){
(function(){
	angular
		.module('app.Okey')
		.directive('mensajeOkey', mensajeOkey)

		function mensajeOkey (){
			return {
				restrict: 'E',
				scope: {
					correcto: "@"
				},
				templateUrl: './mensajeOk/correcto.html',
				controller: 'ControllerOkey'
			}
		}
})()
},{}],82:[function(require,module,exports){
(function(){
	angular
		.module('app.Okey', [])
})();
},{}],83:[function(require,module,exports){
(function(){
	angular.module('app.Okey')
	.controller('ControllerOkey', ControllerOkey);
	ControllerOkey.$inject=['$state', '$scope', '$compile', 'HelpersFactory'];
	function ControllerOkey ($state, $scope, $compile, HelpersFactory){
		var helper = HelpersFactory;
		$scope.CerrarPopup = function(){
			helper.mensajeClose();
			console.log('kjnsdf');
			$state.reload();
		}
	}
})();
},{}],84:[function(require,module,exports){
require('./usuario.module');
require('./usuario.factory');
require('./usuario.controller');
require('./usuario.service');
require('./autos/_autos');
require('./historial/historial.controller');
require('./popup_welcome/_popup_welcome');
require('./popup_update_usuario/_popup_update_usuario');
},{"./autos/_autos":85,"./historial/historial.controller":96,"./popup_update_usuario/_popup_update_usuario":97,"./popup_welcome/_popup_welcome":100,"./usuario.controller":103,"./usuario.factory":104,"./usuario.module":105,"./usuario.service":106}],85:[function(require,module,exports){
require('./popup_autos/_popup_autos');
require('./popup_update_auto/_popup_update_auto');
require('./popup_confirmacionAuto/_popup_confirmacionAuto');
require('./autos.controller');
},{"./autos.controller":86,"./popup_autos/_popup_autos":87,"./popup_confirmacionAuto/_popup_confirmacionAuto":90,"./popup_update_auto/_popup_update_auto":93}],86:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('AutoController', AutoController);
	AutoController.$inject = ['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function AutoController($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		
		var helper = HelpersFactory;
		var cliente = UsuarioFactory.getInfo();
		console.log(cliente.id_cliente);

	$scope.cars=[];
	ClienteService.
		getAutosByClientesUser(cliente.id_cliente)
		.then(function(response){
		$scope.cars=response
		console.log(response);
	}).catch(function(err){
		console.log(err)
	});


}
})();
},{}],87:[function(require,module,exports){
require('./popup_autos.directive');
require('./popup_autos.controller');
},{"./popup_autos.controller":88,"./popup_autos.directive":89}],88:[function(require,module,exports){
(function(){
	angular.module('app.Usuario')
	.controller('ControllerAgregarAuto', ControllerAgregarAuto)
	ControllerAgregarAuto.$inject=['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];
	function ControllerAgregarAuto ($scope, $compile, ClienteService, $state, HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');
		var carro = UsuarioFactory.getInfo();

		$scope.auto={};
		$scope.addAuto = function(){
			console.log($scope.auto);
			var idCliente=carro.id_cliente;
			$scope.auto.id_cliente=idCliente;
			ClienteService
				.AgregarAutos($scope.auto)
				.then(function(response){
				$scope.cars.push(response)
					if(response.estatus=="ok"){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					}
			}).catch(function(err){
				console.log(err)
			});
		}
	}
})()
},{}],89:[function(require,module,exports){
(function() {

	angular.module('app.Usuario')
	.directive('popupAgregarAutos', popupAgregarAutos);

	function popupAgregarAutos(){
		return{
				restrict: 'E',
				templateUrl: './usuario/autos/popup_autos/popup_autos.html',
				controller:'ControllerAgregarAuto'
			}
	}

})();
},{}],90:[function(require,module,exports){
require('./popup_confirmacionAuto.directive');
require('./popup_confirmacionAuto.controller');
},{"./popup_confirmacionAuto.controller":91,"./popup_confirmacionAuto.directive":92}],91:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('DeleteAutoController', DeleteAutoController);
	DeleteAutoController.$inject = ['$state', '$scope', '$compile','ClienteService', '$state', 'HelpersFactory'];

	function DeleteAutoController($state, $scope, $compile, ClienteService, $state, HelpersFactory){

		var helper = HelpersFactory;

		var body = angular.element(document).find('body');


		$scope.cerrarPopup = function(){
			helper.popupClose();
		}

		$scope.deleteAuto = function(deleteAuto){
			ClienteService.
				deleteAuto(deleteAuto)
				.then(function(response){
				console.log(response)
			if(response.estatus == 'ok'){
				helper.popupClose();
				body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
			} else {
				helper.popupClose();
				body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
			}

			})
				.catch(function(res){
					console.log(res);
				});
		}

	}
})();

},{}],92:[function(require,module,exports){
(function() {

	angular.module('app.Usuario')
	.directive('popupConfirmacionDeleteAuto', popupConfirmacionDeleteAuto);

	function popupConfirmacionDeleteAuto(){
		return{
				restrict: 'E',
				scope: {
					auto: "="
				},
				templateUrl: './usuario/autos/popup_confirmacionAuto/popup_confirmacionAuto.html',
				controller:'DeleteAutoController'
			}
	}

})();
},{}],93:[function(require,module,exports){
require('./popup_update_auto.directive');
require('./popup_update_auto.controller');

},{"./popup_update_auto.controller":94,"./popup_update_auto.directive":95}],94:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('ActualizarAutoController', ActualizarAutoController);
	ActualizarAutoController.$inject = ['$scope', '$compile','ClienteService', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function ActualizarAutoController($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');
		$scope.autoUpdate = angular.copy($scope.auto);

		$scope.updateAuto = function(){
			ClienteService
				.putAuto($scope.autoUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}


}
})();
},{}],95:[function(require,module,exports){
(function() {

	angular.module('app.Usuario')
	.directive('popupUpdateAutos', popupUpdateAutos);

	function popupUpdateAutos(){
		return{
				restrict: 'E',
				scope: {
					auto: "="
				},
				templateUrl: './usuario/autos/popup_update_auto/popup_update_auto.html',
				controller:'ActualizarAutoController'
			}
	}

})();
},{}],96:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('HistorialController', HistorialController);
	HistorialController.$inject = ['$scope', '$compile','ClienteService', '$state','HelpersFactory', 'UsuarioFactory'];

	function HistorialController($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		
		var helper = HelpersFactory;
		$scope.usuario = UsuarioFactory.getInfo();

		$scope.costoTotal = 0;
		//ver las historial
		$scope.citas=[];
		ClienteService
			.getMisCitas($scope.usuario.id_cliente)
			.then(function(response){
				//cerrar popup
				$scope.citas=response
				angular.forEach($scope.citas, function(c){
					var costo = parseFloat(c.Costo);
					$scope.costoTotal += costo;
				})
			})
			.catch(function(err){
				console.log(err)
			});


}
})();
},{}],97:[function(require,module,exports){
require('./popup_update_usuario.directive');
require('./popup_update_usuario.controller');

},{"./popup_update_usuario.controller":98,"./popup_update_usuario.directive":99}],98:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('ControllerUpdateCliente', ControllerUpdateCliente);
	ControllerUpdateCliente.$inject = ['$scope', '$compile','ClienteService', '$state','HelpersFactory', 'UsuarioFactory'];

	function ControllerUpdateCliente($scope, $compile, ClienteService, $state,HelpersFactory, UsuarioFactory){
		var helper = HelpersFactory;
		$scope.clienteUpdate = angular.copy($scope.cliente);

		$scope.updateCliente = function(){
			ClienteService
				.putCliente($scope.clienteUpdate)
				.then(function(response){
					if(response.estatus == 'ok'){
						UsuarioFactory.setInfo($scope.clienteUpdate);
						helper.popupClose();
						$state.reload()
					} else {
						console.log(response.msj);
					}
				}).catch(function(err){
					console.log(err)
				});
		}
	}

})();
},{}],99:[function(require,module,exports){
(function() {

	angular.module('app.Usuario')
	.directive('popupActualizarUsuario', popupActualizarUsuario);

	function popupActualizarUsuario(){
		return{
				restrict: 'E',
				scope:{
					cliente:"="
				},
				templateUrl: './usuario/popup_update_usuario/popup_update_usuario.html',
				controller:'ControllerUpdateCliente'
			}
	}

})();
},{}],100:[function(require,module,exports){
require('./popup_welcome.directive');
require('./popup_welcome.controller');
},{"./popup_welcome.controller":101,"./popup_welcome.directive":102}],101:[function(require,module,exports){
(function(){
	angular.module('app.Usuario')
	.controller('WelcomeController' ,WelcomeController);
	WelcomeController.$inject=['$scope', '$compile', '$state', 'HelpersFactory', 'UsuarioFactory'];

	function WelcomeController($scope, $compile, $state, HelpersFactory, UsuarioFactory ){
		cliente=UsuarioFactory.getInfo();
		$scope.infoCte =cliente;
		helper=HelpersFactory;
		$scope.cerrarPopup = function(){
			console.log('33')
			helper.popupClose();
		}

	}
})()
},{}],102:[function(require,module,exports){
(function(){
	angular.module('app.Usuario')
	.directive('popupWelcome', popupWelcome);

	function popupWelcome(){
		return{
				restrict: 'E',
				templateUrl: './usuario/popup_welcome/popup_welcome.html',
				controller:'WelcomeController'
			}
	}
})()
},{}],103:[function(require,module,exports){
(function(){
	angular.module('app.Usuario')
	.controller('UsuarioController', UsuarioController);

	UsuarioController.$inject = ['$scope','UsuarioFactory', '$state'];

	function UsuarioController($scope, UsuarioFactory, $state){
		$scope.infoUser = UsuarioFactory.getInfo();

		$scope.salir = function(){
			UsuarioFactory.logout();
			$state.go('login');
		}
	}
})();
},{}],104:[function(require,module,exports){
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
},{}],105:[function(require,module,exports){
(function(){

	angular.module('app.Usuario', []);

})();
},{}],106:[function(require,module,exports){
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
		function putAuto(req){
			var deferred = $q.defer();
			var req = angular.fromJson(req);

			$http
				.put(URL.API + 'putAuto', req)
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
		function getAutosByClientesUser(id){
			var deferred = $q.defer();

			$http
				.get(URL.API + 'getAutosByClientesUser/' + id)
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
		function deleteAuto(AutoId){
			var deferred = $q.defer();
			var AutoId = angular.fromJson(AutoId);

			$http
				.delete(URL.API + 'deleteAuto', {data: AutoId})
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
			AgregarAutos:AgregarAutos,
			putCliente:putCliente,
			getMisCitas:getMisCitas,
			getAutosByClientesUser:getAutosByClientesUser,
			putAuto:putAuto,
			deleteAuto:deleteAuto

		};
	}

})();
},{}]},{},[66]);
