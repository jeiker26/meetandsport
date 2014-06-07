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
        var polyline;


        var mapOptions = {
            //center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            center: new google.maps.LatLng(40.544853, -3.898491),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable: true
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        refresh();
        function refresh() {
            var array_positions = RUTES.getArrayPositions();
            if (array_positions) {
                var routes = new google.maps.MVCArray();
                pos = RUTES.getPos();
                if (pos) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(pos.lat, pos.long),
                        map: map,
                        title: 'Tu posición',
                        icon: "./img/Flag-small.png"
                    });
                    map.setCenter(marker.position);
                    map.setZoom(18);
                }
                polyline = new google.maps.Polyline({
                    path: routes
                    , map: map
                    , strokeColor: '#ff0000'
                    , strokeWeight: 3
                    , strokeOpacity: 0.4
                    , clickable: false
                });

                var path = polyline.getPath();

                for (var i = 0; i < array_positions.length; i++) {
                    var e = new google.maps.LatLng(array_positions[i].lat, array_positions[i].long);
                    path.push(e);
                }
            }
            //setTimeout(refresh, 10000);
        }
    }


});