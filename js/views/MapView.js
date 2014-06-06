app.views.MapView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    map: function() {
        /*FUNCIONES MAPA*/
        var map;
        var routes;
        var polyline;
        var pos = RUTES.getPos();
        if (pos) {
            var mapOptions = {
                center: new google.maps.LatLng(pos.lat, pos.long),
                zoom: 20,
                mapTypeId: google.maps.MapTypeId.ROADMAP ,
                draggable: true
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

            routes = new google.maps.MVCArray();


            var array_positions = RUTES.getArrayPositions();

            for (var i = 0; i < array_positions.length; i++) {
                routes.push(array_positions[i]);
            }
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
        } else {
            alert("No iniciado la session");
        }

    }


});