(function() {

	//modulo al qe pertenece
	angular.module('app.Administrador')
	.controller('ControllerAgregarMecanico', ControllerAgregarMecanico);
	ControllerAgregarMecanico.$inject = ['$scope', '$compile','AdminService', '$state','HelpersFactory'];

	function ControllerAgregarMecanico($scope, $compile, AdminService, $state,HelpersFactory){
		
		var helper = HelpersFactory;
		var body = angular.element(document).find('body');


		$scope.mecanico={};
		$scope.addMecanico = function(){
			console.log("agregando mecanicos");
			AdminService.agregarMecanicos($scope.mecanico).then(function(response){
				$scope.mecanicos.push(response)
				//helper.popupClose();
				//$state.reload()
				if(response.estatus == 'ok'){
					helper.popupClose();
					body.append($compile("<mensaje-okey correcto='"+ response.msj +"'></mensaje-okey>")($scope));
					//$state.reload()
				} else {
					console.log(response.msj);
				}
			}).catch(function(err){
				console.log(err)
			});
		}
	}

})();