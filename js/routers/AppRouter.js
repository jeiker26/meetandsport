app.routers.AppRouter = Backbone.Router.extend({
    routes: {
        "":                         "home",
        "practice":                 "practiceView",
        "calendar":                 "calendarView",
        "rutes":                    "rutesView",
        "friends":                  "friendsView",
        "profile":                  "userView",
        "calen/:day":               "calendarDay",
        "map":                      "map"
    },

    initialize: function () {
        app.todo = $('#todo');
        app.menu = $('#menu');
        app.menuTop = $('#menuTop');
        app.contentDay = $('#content-day');
    },

    home: function () {
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents();
        }
        app.todo.append(app.homeView.$el);
    },
    
    menu: function (){
        if (!app.menuView) {
            app.menuView = new app.views.MenuView();
            app.menuView.render();
        } else {
            console.log('reusing menu view');
            app.menuView.delegateEvents();
        }
        app.menu.append(app.menuView.$el);
    },
    menutop: function(){
        if (!app.menuTopView) {
            app.menuTopView = new app.views.MenuTopView();
            app.menuTopView.render();
        } else {
            console.log('reusing menu top view');
            app.menuTopView.delegateEvents();
        }
        app.menuTop.append(app.menuTopView.$el);
    },

    practiceView: function () {
         if (!app.practiceView) {
            app.practiceView = new app.views.PracticeView();
            app.practiceView.render();
        } else {
            console.log('reusing practice view');
            app.practiceView.delegateEvents(); 
        }
        app.todo.html(app.practiceView.$el); 
        this.menutop();
        this.menu();
        app.menuView.practice();
    },
    
    calendarView: function () {
         if (!app.calendarView) {
            app.calendarView = new app.views.CalendarView();
            app.calendarView.render();
        } else {
            console.log('reusing calendar view');
            app.calendarView.delegateEvents(); 
        }
        app.todo.html(app.calendarView.$el);

        app.menuView.calendar();
        app.calendarView.initialize();
        app.calendarView.mySessions();
    },
    
    rutesView: function () {
         if (!app.rutesView) {
            app.rutesView = new app.views.RutesView();
            app.rutesView.render();
        } else {
            console.log('reusing rutes view');
            app.rutesView.delegateEvents(); 
        }
        app.todo.html(app.rutesView.$el);

        app.menuView.rutes();
    },
    
    friendsView: function () {
         if (!app.friendsView) {
            app.friendsView = new app.views.FriendsView();
            app.friendsView.render();
        } else {
            console.log('reusing friends view');
            app.friendsView.delegateEvents(); 
        }
        app.todo.html(app.friendsView.$el);

        app.menuView.friends();
    },
    
    userView: function () {
         if (!app.userView) {
            app.userView = new app.views.UserView();
            app.userView.render();
        } else {
            console.log('reusing user view');
            app.userView.delegateEvents(); 
        }
        app.todo.html(app.userView.$el);
        //app.menuTopView.selectedIcon();
        app.userView.checkUser();
        app.menuView.reset();
    },
    map: function () {
         if (!app.mapView) {
            app.mapView = new app.views.MapView();
            app.mapView.render();
        } else {
            console.log('reusing map view');
            app.mapView.delegateEvents(); 
        }
        app.todo.html(app.mapView.$el);
        //app.menuTopView.selectedIcon();
        app.menuView.map();
        app.mapView.map();
    },
    calendarDay: function(){
        if (!app.calendarDay) {
            app.calendarDay = new app.views.CalendarDay();
            app.calendarDay.render();
        } else {
            console.log('reusing calendarDay view');
            app.calendarDay.delegateEvents(); 
        }
        app.contentDay.html(app.calendarDay.$el);
    }
    
});