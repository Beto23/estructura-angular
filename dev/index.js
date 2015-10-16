window.$ = require('jquery');
require('angular');
require('angular-ui-router');
require('./js-vendor/swiper');

require('./app.module');
require('./login/_login');

function hola(){
	console.log("Hola Beto")
}

hola();
var swiper= new Swiper('.swiper-container',{
	loop:true,
	autoplay:3000
});
