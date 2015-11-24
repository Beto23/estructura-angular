(function(){
	angular
		.module('app.Error')
		.directive('mensajeError', mensajeError);

		function mensajeError(){
			return {
				restrict: 'E',
				scope: {
					error: "@"
				},
				templateUrl: './mensajeError/error.html',
				controller: 'ControllerError'
			}
		}
})();