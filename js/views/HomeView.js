app.views.HomeView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    events: {
        "click #logFB": "loginFB"
    },
    loginFB: function() {
        FB.login(function(data) {
            alert(data);
            alert(data.name);
            userAdd(data);
            
            function userAdd(datos) {
                $.ajax({
                    type: 'POST',
                    url: 'http://meetserver-jeikersport.rhcloud.com/user',
                    dataType: 'json',
                    data: {
                        name: datos.name,
                        provider: "Facebook",
                        photo: datos.photo,
                        email: datos.email
                    }
                }).done(function(data) {
                    app.user = data;
                    alert("ok");
                    alert(app.user.name);
                    alert(app.user._id);
                    app.router.navigate('practice', {trigger: true});
                }).fail(function() {
                    console.log("error add USER ");
                });
            }
        });
    }

});