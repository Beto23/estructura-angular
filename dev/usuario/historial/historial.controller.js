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