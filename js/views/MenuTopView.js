app.views.MenuTopView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    changeIco: function(){
        $(".icon-profile").addClass("hide");
        $(".icon-profile2").removeClass("hide");
    },
    selectedIcon: function(){
        $(".icon-profile").children().addClass("check-top");
    }

});