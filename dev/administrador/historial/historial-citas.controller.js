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