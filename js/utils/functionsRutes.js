(function() {
    var root = this;

    var play = $("#play");
    var stop = $("#stop");
    var pause = $("#pause");
    var addSeg = $("#add-seg");
    var viewSeg = $("#view-seg");
    var viewMap = $("#view-map");
    var n_segmentos = 1;

    function hideButton() {
        $("#stop").parent().parent().addClass("hide");
        $("#play").parent().parent().removeClass("hide");
    }


    var x = !x;

    var cronometro;
    var contador_s = 0, contador_m = 0, contador_h = 0, contador_ml = 0;
    var aux_contador_m = 0, aux_contador_s = 0, aux_contador_h = 0, aux_contador_ml = 0;

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
        $("#time-rutes").text("00 : 00 : 00");
        contador_s = 1;
        contador_m = 0;
    }

    function carga()
    {
        cronometro = setInterval(
                function() {
                    if (contador_ml == 60)
                    {
                        contador_ml = 00;
                        contador_s++;

                        if (contador_s == 60)
                        {
                            contador_s = 00;
                            contador_m++;

                            if (contador_m == 60)
                            {
                                contador_m = 00;
                                contador_h++;
                                
                            }
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
                    
                    if (contador_h < 10)
                    {
                        aux_contador_h = "0" + contador_h;
                    }
                    else {
                        aux_contador_h = contador_h;
                    }
                    
                    if (contador_ml < 10)
                    {
                        aux_contador_ml = "0" + contador_ml;
                    }
                    else {
                        aux_contador_ml = contador_ml;
                    }


                    $("#time-rutes").text(aux_contador_h + ":" + aux_contador_m + ":" + aux_contador_s + ":" + aux_contador_ml);
                    //button_chronometer.append("<i class='sprite sprite-conometro-dark-blue float-right'></i>");
                    contador_ml++;
                    $("#distance").text(distanceTotal + " m");
                    $("#promedio").text(((distanceTotal) / (((contador_m * 60) + aux_contador_s))) + " m/s");
                }
        , 16.6666667);

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
        $("#distance").text(distanceTotal + " m");
        //$("#promedio").text(((distanceTotal/1000)*(((contador_m*60)+aux_contador_s)/3600)) + " km/h");
        $("#promedio").text(Math.round(((distanceTotal) / (((contador_m * 60) + aux_contador_s)))) + " m/s");
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
    function addSegment() {
        $(".td-segmentos").append("<tr><td>" + n_segmentos++ + "</td><td>" + contador_m + ":" + aux_contador_s + " min</td><td>" + (distanceTotal / 1000).toFixed(2) + "</td><td>14</td></tr>");
    }


    if (!root.RUTES) {
        root.RUTES = {};
    }

    root.RUTES.carga = carga;
    root.RUTES.map = map;
    root.RUTES.loop = loop;
    root.RUTES.hideButton = hideButton;
    root.RUTES.addSeg = addSegment;
    root.RUTES.pausa = pausa;


}).call(this);