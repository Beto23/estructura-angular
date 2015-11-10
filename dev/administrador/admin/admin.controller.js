(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('AdminController', AdminController);
	AdminController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function AdminController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;

		$scope.administradores=[];
		AdminService.getAdministradores().then(function(response){
			console.log(response);
			$scope.administradores=response
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});

		$scope.administrador={};
		$scope.addAdminsitrador = function(){
			console.log("agregando administrador");
			AdminService.agregarAdministradores($scope.administrador).then(function(response){
				$scope.administradores.push(response)
				//cerrar popup
				helper.popupClose();
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();


















