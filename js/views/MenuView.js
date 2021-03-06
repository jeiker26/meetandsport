app.views.MenuView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    playClock: function(){
      RUTES.clock();  
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
    },
    withOutUser: function (){
        $('#menu-calendar').addClass("hide");
        //$('#menu-friends').addClass("hide");
        $('#menu-calendar-block').removeClass("hide");
        //$('#menu-friends-block').removeClass("hide");
    }

});