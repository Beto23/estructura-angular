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