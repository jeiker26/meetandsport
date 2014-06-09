app.views.UserView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    events: {
      "click #closeSession" : "closeS"  
    },
    checkUser: function() {
        if (!app.user) {
            $("#name-user").val("default");
            /*userDefault(function(data){
                console.log(data);
                
            });*/
            
            
            function userDefault(callback) {
                $.ajax({
                    type: 'GET',
                    url: 'http://meetserver-jeikersport.rhcloud.com/user/539230d0aa96aaa297fb6320',
                    dataType: 'json'
                }).done(function(data) {
                    callback(data);
                }).fail(function() {
                    console.log("error USER DEFAULT");
                });
            }
        }else{
            alert(app.user.facebookId);
            $.ajax({
                type: "GET",
                url: "http://graph.facebook.com/" + app.user.facebookId + "?fields=id,name,picture",
                dataType: "json"
            }).done(function(photo) {
                alert(photo.picture.data.url);
                $("#photo-user").attr("src",photo.picture.data.url);
            }).fail(function(err){
                alert("err" + err);
            });
            $("#name-user").val(app.user.name);
            //$("#photo-user").attr("src",app.user.photo);
        }
    },
    closeS: function(){
        window.localStorage.clear();
        FB.revoke();
        app.menu.html("");
        app.menuTop.html("");
        app.router.navigate("/", {trigger: true});
    }

});