app.views.HomeView = Backbone.View.extend({

    initialize: function () {
       
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },
    /*
    events: {
        "click #more-later":    "goPractice"
    },

    goPractice: function () {
        
    }*/

});