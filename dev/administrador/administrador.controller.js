(function(){
	angular.module('app.Administrador')
	.controller('AdministradorController', AdministradorController);

	AdministradorController.$inject = ['$scope','AdministradorFactory'];

	function AdministradorController($scope, AdministradorFactory){
		$scope.infoAdmin = AdministradorFactory.getInfo();
		//console.log($scope.infoAdmin);
	}
})();