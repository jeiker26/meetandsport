app.views.MenuView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    reset: function(){
        $("#content-menu").children().removeClass("check");
    },
    practice: function(){
        this.reset();
        $('#menu-practice').addClass("check");
    },
    calendar: function(){
        this.reset();
        $('#menu-calendar').addClass("check");
    },
    rutes: function(){
        this.reset();
        $('#menu-rutes').addClass("check");
    },
    friends: function(){
        this.reset();
        $('#menu-friends').addClass("check");
    },
    map: function(){
        this.reset();
        $('#menu-map').addClass("check");
    }

});