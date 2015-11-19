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
