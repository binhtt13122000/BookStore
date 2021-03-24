"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoute = void 0;
var React = require("react");
var react_router_1 = require("react-router");
var PublicRoute = function (props) {
    var Component = props.component, rest = __rest(props, ["component"]);
    console.log(localStorage && localStorage.getItem("loggedIn") === "1");
    return React.createElement(react_router_1.Route, __assign({}, rest, { render: function (props) { return localStorage && localStorage.getItem("loggedIn") === "1" ? React.createElement(react_router_1.Redirect, { from: "*", to: "/home" }) : React.createElement(Component, __assign({}, props)); } }));
};
exports.PublicRoute = PublicRoute;
//# sourceMappingURL=PublicRoute.js.map