(function() {

	angular.module('app.Administrador')
	.directive('popupAgregarClientes', popupAgregarClientes);

	function popupAgregarClientes(){
		return{
				restrict: 'E',
				templateUrl: './administrador/clientes/popup_clientes/popup_clientes.html'
			}
	}

})();