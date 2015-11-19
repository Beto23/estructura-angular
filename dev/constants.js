(function () {

angular
    .module('app.constants',[])
    .constant('URL', {
        API: 'http://localhost/estructura-angular/backend/index.php/',
        IMG_DEFAULT: 'http://localhost/estructura-angular/backend/uploads/default.jpg'
    });

})();