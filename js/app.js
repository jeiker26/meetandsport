var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {}
};

$(document).on("ready", function () {
    app.router = new app.routers.AppRouter();
    app.utils.templates.load(["HomeView", "PracticeView","CalendarView","MenuView","MenuTopView","RutesView","FriendsView","UserView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        });
});