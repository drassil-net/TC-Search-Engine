/*jslint browser: true, white: true, plusplus: true*/
/*global angular, console, alert*/

(function () {
    'use strict';

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

    var app = angular.module('status');

    switch (QueryString.realm) {
        case "azerothshard":
            /* Edit with path of TC-JSON-API */
            app.api = "http://azerothshard.org/modules/TC-JSON-API/public/index.php/";

            app.serverName = "AzerothShard";
            break;
        case "newage":
            /* Edit with path of TC-JSON-API */
            app.api = "http://server.wownewage.com/TC-JSON-API/public/index.php/";

            app.serverName = "NewAge";
            break;
    }

    /* Edit with path of the SpellWork API e.g http://trinitycore.cloudapp.net/spells/ */
    app.spellsApi = "";

}());
