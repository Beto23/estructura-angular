(function(){
	angular
		.module('app.Okey')
		.controller('ControllerCorrecto', ControllerCorrecto);
		ControllerCorrecto.$inject=['$state', '$scope', '$compile', 'HelpersFactory'];

		function ControllerCorrecto ($state, $scope, $compile, HelpersFactory){
			console.log("I'm inside of you")
			var helper = HelpersFactory;
			$scope.CerrarMensaje = function(){
				helper.mensajeClose();
				console.log('cerar')
				$state.reload();
			}
			$scope.saludo=console.log('hola alee');
			console.log('ControllerCorrecto');
		}

})();