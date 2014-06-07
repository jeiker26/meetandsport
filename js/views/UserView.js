app.views.UserView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
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
            alert(app.user.id);
            $.ajax({
                
                type: "GET",
                url: "http://graph.facebook.com/" + app.user.id + "?fields=id,name,picture",
                dataType: "jsonp"
            }).done(function(photo) {
                alert(photo.picture.data.url);
                $("#photo-user").attr("src",photo.picture.data.url);
            }).fail(function(err){
                alert("err" + err);
            });
            $("#name-user").val(app.user.name);
            //$("#photo-user").attr("src",app.user.photo);
        }
    }

});