app.views.UserView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    checkUser: function() {
        if (!app.user) {
            userDefault(function(data){
                console.log(data);
                $("#name-user").val(data.name);
            });
            
            
            function userDefault(callback) {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/user/539230d0aa96aaa297fb6320',
                    dataType: 'json'
                }).done(function(data) {
                    callback(data);
                }).fail(function() {
                    console.log("error USER DEFAULT");
                });
            }
        }
    }

});