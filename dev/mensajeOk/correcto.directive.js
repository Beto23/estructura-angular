(function(){
	angular
		.module('app.Okey')
		.directive('mensajeOkey', mensajeOkey)

		function mensajeOkey (){
			return {
				restrict: 'E',
				scope: {
					correcto: "@"
				},
				templateUrl: './mensajeOk/correcto.html',
				controller: 'ControllerOkey'
			}
		}
})()