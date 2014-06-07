(function() {
    var root = this;

    openFB.init('1427009024230738'); // Defaults to sessionStorage for storing the Facebook token

//  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
//  openFB.init('YOUR_FB_APP_ID', 'http://localhost/openfb/oauthcallback.html', window.localStorage);

    function login(callback) {
        openFB.login('email',
                function() {
                    getInfo(callback);
                },
                function(error) {
                    alert('Facebook login failed: ' + error.error_description);
                });
    }

    function getInfo(callback) {
        openFB.api({
            path: '/me',
            success: function(data) {
                //console.log(JSON.stringify(data));
               
                callback(data);
                
            },
            error: errorHandler});
    }
    /*{"id":"100008232495480","email":"jesusgraficap@gmail.com","first_name":"Jesus","gender":"male","last_name":"Javega","link":"https://www.facebook.com/profile.php?id=100008232495480","locale":"es_ES","name":"Jesus Javega","timezone":2,"updated_time":"2014-06-07T11:31:07+0000","verified":true} */
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
    if (!root.FB) {
        root.FB = {};
    }

    root.FB.login = login;
    root.FB.getInfo = getInfo;


}).call(this);