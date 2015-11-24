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