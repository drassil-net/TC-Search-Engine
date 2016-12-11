/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert*/

(function () {
    'use strict';

    var app = angular.module('engine');

    var QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var realm = QueryString.realm || getCookie("realm");

    switch (realm) {
        case "azerothshard":
            document.cookie = "realm=azerothshard";
            /* Edit with path of TC-JSON-API */
            app.api = "http://azerothshard.org/modules/TC-JSON-API/public/index.php/";

            app.serverName = "AzerothShard";
            break;
        case "newage":
            document.cookie = "realm=newage";
            /* Edit with path of TC-JSON-API */
            app.api = "http://server.wownewage.com/TC-JSON-API/public/index.php/";

            app.serverName = "NewAge";
            break;
    }

    /* Edit with path of the SpellWork API e.g http://trinitycore.cloudapp.net/spells/ */
    app.spellsApi = "";

}());
