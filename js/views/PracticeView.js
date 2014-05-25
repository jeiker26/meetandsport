app.views.PracticeView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    events: {
        "click #play": "play",
        "click #stop": "stop",
        "click #pause": "pause",
        "click #view-map": "viewmap",
        "click #view-seg": "viewseg",
        "click #add-seg": "addSeg"
    },
    play: function() {
        setTimeout(RUTES.loop, 1000);
        RUTES.carga();
        $("#stop").parent().parent().removeClass("hide");
        $("#play").parent().parent().addClass("hide");
    },
    stop: function() {
        RUTES.pausa();
        RUTES.hideButton();
    },
    pause: function() {
        RUTES.pausa();
        RUTES.hideButton();
    },
    viewmap: function() {
        $("#map-canvas").removeClass("hide");
        $("#segmentos").addClass("hide");
        RUTES.map();
    },
    viewseg: function() {
        $("#map-canvas").addClass("hide");
        $("#segmentos").removeClass("hide");
    },
    addSeg: function() {
        RUTES.addSeg();
    }

});