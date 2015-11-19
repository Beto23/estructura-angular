(function() {

	//modulo al qe pertenece
	angular.module('app.Usuario')
	.controller('HistorialController', HistorialController);
	HistorialController.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function HistorialController($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		
//ver las historial
	$scope.historial=[];
	ClienteService.getMisCitas().then(function(response){
		//cerrar popup
		$scope.historial=response
	}).catch(function(err){
		console.log(err)
	});

}
})();