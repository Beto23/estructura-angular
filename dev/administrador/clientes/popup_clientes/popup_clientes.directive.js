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