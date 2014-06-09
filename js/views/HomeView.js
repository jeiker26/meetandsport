app.views.HomeView = Backbone.View.extend({
    initialize: function() {
        var user = JSON.parse(window.localStorage.getItem("user"));
        if (user) {
            app.user = user;
            app.router.navigate('practice', {trigger: true});
        }
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
            var idFacebook = data.id;

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
                    app.user.facebookId = idFacebook;
                    window.localStorage.setItem("user", JSON.stringify(app.user));
                    app.router.navigate('practice', {trigger: true});
                }).fail(function() {
                    console.log("error add USER ");
                });
            }
        });
    }

});