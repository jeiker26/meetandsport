(function() {
    var root = this;
    var play = $("#play");
    var stop = $("#stop");
    var pause = $("#pause");
    var rut_position = [];
    var distanceTotal = 0;
    var pos = false;
    var cronometro;
    var contador_s = 0, contador_m = 0, contador_h = 0, contador_ml = 0;
    var aux_contador_m = 0, aux_contador_s = 0, aux_contador_h = 0, aux_contador_ml = 0;
    var dataSession;
    /*Cronometro*/
    function reset()
    {
        clearInterval(cronometro);
        $("#time-rutes").text("00 : 00 : 00");
        contador_ml = 00;
        contador_s = 00;
        contador_m = 00;
        contador_h = 00;
        distanceTotal = 00;
        $("#distance").text(distanceTotal);
        $("#promedio").text(0);
    }

    function pausa() {
        loop(true);
        clearInterval(cronometro);
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

                    var promedio = ((distanceTotal) / (((contador_m * 60) + aux_contador_s))).toFixed(2);
                    $("#time-rutes").text(aux_contador_h + ":" + aux_contador_m + ":" + aux_contador_s + ":" + aux_contador_ml);
                    //button_chronometer.append("<i class='sprite sprite-conometro-dark-blue float-right'></i>");
                    contador_ml++;
                    $("#distance").text(distanceTotal);
                    $("#promedio").text(promedio);
                    dataSession = {
                        "time": aux_contador_h + ":" + aux_contador_m + ":" + aux_contador_s + ":" + aux_contador_ml,
                        "average": promedio,
                        "distance": distanceTotal
                    };
                }
        , 16.6666667);
    }
    /* Fin Cronometro*/

    /*GPS*/
    var onSuccess = function(position) {
        if (pos) {
            distanceTotal = distanceTotal + Dist(pos.lat, pos.long, position.coords.latitude, position.coords.longitude);
        }
        pos = {"lat": position.coords.latitude, "long": position.coords.longitude};
        rut_position.push(pos);
        $("#distance").text(distanceTotal);
        $("#promedio").text(Math.round(((distanceTotal) / (((contador_m * 60) + aux_contador_s)))));
        if (position.coords.altitude) {
            $("#content-altitude").removeClass("hide");
            $("#altitude").text(position.coords.altitude);
        }
        if (position.coords.speed) {
            $("#speed").text(position.coords.speed);
            $("#content-speed").removeClass("hide");
        }
        setTimeout(loop, 10000);
    };
    function onError(error) {
        alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
    }

    function loop(pause) {
        if (!pause) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 2000, timeout: 15000, enableHighAccuracy: true});
        }
    }

    function Dist(lat1, lon1, lat2, lon2)
    {
        rad = function(x) {
            return x * Math.PI / 180;
        }

        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return Math.round(d * 1000); //Retorna tres decimales
    }


    /*Fin GPS*/


    function getArrayPositions() {
        return rut_position;
    }
    function getPos() {
        return pos;
    }


    function hideButton() {
        $("#stop").parent().parent().addClass("hide");
        $("#play").parent().parent().removeClass("hide");
    }

    function getDataSession() {
        return dataSession;
    }
    
    function clock(){
    var clock = $('digiclock');
        console.log(clock);
        // But there is a little problem
        // we need to pad 0-9 with an extra
        // 0 on the left for hours, seconds, minutes

        var pad = function(x) {
            return x < 10 ? '0' + x : x;
        };

        var ticktock = function() {
            var d = new Date();

            var h = pad(d.getHours());
            var m = pad(d.getMinutes());
            var s = pad(d.getSeconds());

            var current_time = [h, m, s].join(':');

            clock.text(current_time);

        };

        ticktock();

        // Calling ticktock() every 1 second
        setInterval(ticktock, 1000);
    }
    
    if (!root.RUTES) {
        root.RUTES = {};
    }

    root.RUTES.reset = reset;
    root.RUTES.carga = carga;
    root.RUTES.loop = loop;
    root.RUTES.hideButton = hideButton;
    root.RUTES.getArrayPositions = getArrayPositions;
    root.RUTES.pausa = pausa;
    root.RUTES.getPos = getPos;
    root.RUTES.getDataSession = getDataSession;
    root.RUTES.clock = clock;
}).call(this);