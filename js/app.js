var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    user: {}
};

$(document).on("ready", function () {
    app.router = new app.routers.AppRouter();
    app.utils.templates.load(["HomeView", "PracticeView","CalendarView","MenuView","MenuTopView","RutesView","FriendsView","UserView","CalendarDay","MapView"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        });
});