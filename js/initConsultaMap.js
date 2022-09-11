$(document).ready(function(){
	//window.initMap = initMap;
	$.ajaxSetup({ cache: false });
	initForm();
});

/**Variables test */
var jsonTest = [{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"TRA","latitud":"-12.094672844291521","longitud":"-77.0218664868164"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"TRA","latitud":"-12.0941021","longitud":"-76.9758269","fechaHoraSalida":"26/05/2022"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"CMD","latitud":"-12.0913325","longitud":"-76.9720288"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"CMD","latitud":"-12.0531362","longitud":"-77.067333","fechaHoraSalida":"26/05/2022"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"URG","latitud":"-12.1181806","longitud":"-77.0287092"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"URG","latitud":"-12.1140686","longitud":"-77.0034535","fechaHoraSalida":"26/05/2022"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"EME","latitud":"-12.0685804","longitud":"-77.0140321"},{"nombreCompleto":"nombre1","direccion":"suCasa1","telefono":"9684612688","producto":"EME","latitud":"-12.0962201","longitud":"-77.0316842","fechaHoraSalida":"26/05/2022"}]

/**Variables globales*/
var map;
var markers = [];
var listaPacientes = jsonTest;

/**Metodos de geolocalizacion*/
function getImage(url){
	var image = {
		url: url,
//		size: new google.maps.Size(24, 32),
		scaledSize: new google.maps.Size(12, 12),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 32)
	};
	return image;
}

function getImage1(url){
	var image = {
		url: url,
//		size: new google.maps.Size(24, 32),
		scaledSize: new google.maps.Size(17, 17),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 32)
	};
	return image;
}

function load_map(latIni,longIni) {    
    var myLatlng = new google.maps.LatLng(-12.094672844291521,-77.0218664868164);
    var myOptions = {
        zoom: 13,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($("#map_canvas").get(0), myOptions);
    setPutMarkers();
//    putMarker(-12.094672844291521,-77.0218664868164,map,getImage('img/verde_Activo.png'),"Paciente","descripcion", false);
}

function putMarker(lat, lng, map, img, title, content, animation){
	var myLatLng = new google.maps.LatLng(lat,lng);
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: img,
		title: title
	});
//	if(animation)
//		marker.setAnimation(google.maps.Animation.BOUNCE);
	markers.push(marker);
	var infowindow = new google.maps.InfoWindow({
		content: content,
		size: new google.maps.Size(100,100)
	});
	eventosMarker(marker, map, infowindow);
//	infowindow.open(map, marker);
}

function eventosMarker(marker, map, infowindow){
	google.maps.event.addListener(marker, "click", function() {
		infowindow.open(map, marker);
	});
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

/**Metodos de negocio*/

function setPutMarkers(){
	var descripcion;
	var title;
	var totPac = 0;
    if(listaPacientes.length>0){
    	for(var i=0; i<listaPacientes.length; i++){
    		descripcion = "Paciente: "+listaPacientes[i].nombreCompleto+"<br>Direcci&oacute;n: "+listaPacientes[i].direccion+"<br>Tel&eacute;fono: "+listaPacientes[i].telefono;
    		title = "Pac. "+listaPacientes[i].nombreCompleto+" - Dir: "+listaPacientes[i].direccion;
    		if(listaPacientes[i].producto == "TRA" && $("#cbAzul").is(':checked') && listaPacientes[i].latitud != undefined && listaPacientes[i].longitud != undefined){
    			if(listaPacientes[i].fechaHoraSalida != undefined && $("#cbActivo").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/azul_Activo.png'),title,descripcion, true);
    				totPac++;
    			}
    			if(listaPacientes[i].fechaHoraSalida == undefined && $("#cbPendiente").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/azul_Pendiente.png'),title,descripcion, true);
    				totPac++;
    			}
    		}
    		if(listaPacientes[i].producto == "CMD" && $("#cbVerde").is(':checked') && listaPacientes[i].latitud != undefined && listaPacientes[i].longitud != undefined){
    			if(listaPacientes[i].fechaHoraSalida != undefined && $("#cbActivo").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/verde_Activo.png'),title,descripcion, true);
    				totPac++;
    			}
    			if(listaPacientes[i].fechaHoraSalida == undefined && $("#cbPendiente").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/verde_Pendiente.png'),title,descripcion, true);
    				totPac++;
    			}
    		}
    		if(listaPacientes[i].producto == "URG" && $("#cbAmarillo").is(':checked') && listaPacientes[i].latitud != undefined && listaPacientes[i].longitud != undefined){
    			if(listaPacientes[i].fechaHoraSalida != undefined && $("#cbActivo").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/amarillo_Activo.png'),title,descripcion, true);
    				totPac++;
    			}
    			if(listaPacientes[i].fechaHoraSalida == undefined && $("#cbPendiente").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/amarillo_Pendiente.png'),title,descripcion, true);
    				totPac++;
    			}
    		}
    		if(listaPacientes[i].producto == "EME" && $("#cbRojo").is(':checked') && listaPacientes[i].latitud != undefined && listaPacientes[i].longitud != undefined){
    			if(listaPacientes[i].fechaHoraSalida != undefined && $("#cbActivo").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/rojo_Activo.png'),title,descripcion, true);
    				totPac++;
    			}
    			if(listaPacientes[i].fechaHoraSalida == undefined && $("#cbPendiente").is(':checked')){
    				putMarker(listaPacientes[i].latitud,listaPacientes[i].longitud,map,getImage('img/rojo_Pendiente.png'),title,descripcion, true);
    				totPac++;
    			}
    		}
    	}
    }
    $("#divContTotal").html("Pacientes: "+totPac);
}

function initForm(){
	$('input[name="cbOpciones"]').change(function() {
		deleteMarkers();
		setPutMarkers();
    });
}