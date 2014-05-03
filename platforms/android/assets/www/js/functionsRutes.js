var play = $("#play");
var stop = $("#stop");
var pause = $("#pause");
var addSeg = $("#add-seg");
var viewSeg = $("#view-seg");
var viewMap = $("#view-map");
var n_segmentos = 1;


play.click(function() {
    initGpsRunner();
    stop.parent().removeClass("hide");
    pause.parent().removeClass("hide");
    play.parent().addClass("hide");
});
stop.click(function() {
    pausa();
    hideButton();
});
pause.click(function() {
    pausa();
    hideButton();
});
viewMap.click(function() {
    $("#map-canvas").parent().removeClass("hide");
    $("#segmentos").parent().addClass("hide");
    map();
});
viewSeg.click(function() {
    $("#map-canvas").parent().addClass("hide");
    $("#segmentos").parent().removeClass("hide");
});

addSeg.click(function(){
    $(".td-segmentos").append("<tr><td>" + n_segmentos++ + "</td><td>" + contador_m + ":" + aux_contador_s + " min</td><td>" + (distanceTotal/1000).toFixed(2) + "</td><td>14</td></tr>");
});

function hideButton() {
    stop.parent().addClass("hide");
    pause.parent().addClass("hide");
    play.parent().removeClass("hide");
}


var x = !x;
button_chronometer = $("#time-rutes");
button_chronometer_stop = $("#time-stop");
var distance = $("#distance");
var promedio = $("#promedio");
/*
 button_chronometer_stop.click(function() {
 reset();
 });
 
 button_chronometer.click(function() {
 if (x) {
 console.log(x);
 carga();
 x = !x;
 } else {
 console.log(x);
 pause();
 x = !x;
 }
 });*/

//setInterval
var cronometro;
var contador_s = 0, contador_m = 0;
var aux_contador_m = 0, aux_contador_s = 0;

function pausef()
{
    clearInterval(cronometro);
}

function reset()
{
    if (!x) {
        x = !x;
    }
    clearInterval(cronometro);
    button_chronometer.text("00 : 00 : 00");
    contador_s = 1;
    contador_m = 0;
}

function carga()
{
    cronometro = setInterval(
            function() {
                if (contador_s == 60)
                {
                    contador_s = 00;
                    contador_m++;

                    if (contador_m == 60)
                    {
                        contador_m = 00;
                    }
                }

                if (contador_s < 10)
                {
                    aux_contador_s = "0" + contador_s;
                } else {
                    aux_contador_s = contador_s;
                }

                if (contador_m < 10)
                {
                    aux_contador_m = "0" + contador_m;
                }
                else {
                    aux_contador_m = contador_m;
                }
                button_chronometer.text("00" + " : " + aux_contador_m + " : " + aux_contador_s);
                //button_chronometer.append("<i class='sprite sprite-conometro-dark-blue float-right'></i>");
                contador_s++;
                distance.text(distanceTotal + " m");
                promedio.text(((distanceTotal) / (((contador_m * 60) + aux_contador_s))) + " m/s");
            }
    , 1000);

}

var rut_position = [];
var distanceTotal = 0;
var pos = false;
var map;
var routes = false;
var polyline = false;



var onSuccess = function(position) {
    if (pos) {
        distanceTotal = distanceTotal + Dist(pos.lat, pos.long, position.coords.latitude, position.coords.longitude);
    }
    pos = {"lat": position.coords.latitude, "long": position.coords.longitude};

    if (polyline) {
        var path = polyline.getPath();
        var e = new google.maps.LatLng(pos.lat, pos.long);
        path.push(e);
    }
    rut_position.push(pos);
    distance.text(distanceTotal + " m");
    //promedio.text(((distanceTotal/1000)*(((contador_m*60)+aux_contador_s)/3600)) + " km/h");
    promedio.text(Math.round(((distanceTotal) / (((contador_m * 60) + aux_contador_s)))) + " m/s");
    //$("#listCoor").append("<li>" + position.coords.latitude + "," + position.coords.longitude + "</li>");
    setTimeout(loop, 3000);
};

function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function loop(pause) {
    if (!pause) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 2000, timeout: 2000, enableHighAccuracy: true});
    }
}

function initGpsRunner() {
    console.log("entra");
    setTimeout(loop, 1000);
    carga();
}

function Dist(lat1, lon1, lat2, lon2)
{
    rad = function(x) {
        return x * Math.PI / 180;
    }

    var R = 6378.137;                          //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.round(d * 1000);                      //Retorna tres decimales
}


/*FUNCIONES MAPA*/
function map() {
    var mapOptions = {
        center: new google.maps.LatLng(pos.lat, pos.long),
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var routes = new google.maps.MVCArray();
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: 'Tu posición'
    });

    polyline = new google.maps.Polyline({
        path: routes
        , map: map
        , strokeColor: '#ff0000'
        , strokeWeight: 3
        , strokeOpacity: 0.4
        , clickable: false
    });

}

function pausa() {
    loop(true);
    pausef();
}