(function() {

	angular.module('app.Usuario')
	.directive('popupActualizarUsuario', popupActualizarUsuario);

	function popupActualizarUsuario(){
		return{
				restrict: 'E',
				scope:{
					cliente:"="
				},
				templateUrl: './usuario/popup_update_usuario/popup_update_usuario.html',
				controller:'ControllerUpdateCliente'
			}
	}

})();