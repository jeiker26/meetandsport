openFB.init('706358992754112'); // Defaults to sessionStorage for storing the Facebook token

//  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
//  openFB.init('YOUR_FB_APP_ID', 'http://localhost/openfb/oauthcallback.html', window.localStorage);

function login() {
    openFB.login('email',
            function() {
                alert('Facebook login succeeded');
                getInfo();
            },
            function(error) {
                alert('Facebook login failed: ' + error.error_description);
            });
}

function getInfo() {
    openFB.api({
        path: '/me',
        success: function(data) {
            //console.log(JSON.stringify(data));
            $.ajax({
                type: "GET",
                url: "http://graph.facebook.com/" + data.id + "?fields=id,name,picture",
                dataType: "json"
            }).done(function(photo) {
                data.photo = photo.picture.data.url;
            });
            console.log(data);
            $("#userName").text(data.name);
        },
        error: errorHandler});
}

function share() {
    openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: 'Testing Facebook APIs'
        },
        success: function() {
            alert('the item was posted on Facebook');
        },
        error: errorHandler});
}

function revoke() {
    openFB.revokePermissions(
            function() {
                alert('Permissions revoked');
            },
            errorHandler);
}

function errorHandler(error) {
    alert(error.message);
}
