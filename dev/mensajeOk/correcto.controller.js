(function(){
	angular
		.module('app.Okey')
		.controller('ControllerCorrecto', ControllerCorrecto);
		ControllerCorrecto.$inject=['$state', '$scope', '$compile', 'HelpersFactory'];

		function ControllerCorrecto ($state, $scope, $compile, HelpersFactory){
			var helper = HelpersFactory;
			$scope.CerrarMensaje = function(){
				helper.mensajeClose();
				console.log('cerar')
			}
		}
})();