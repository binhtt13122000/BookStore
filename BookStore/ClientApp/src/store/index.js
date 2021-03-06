"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducers = void 0;
var WeatherForecasts = require("./WeatherForecasts");
var Counter = require("./Counter");
var Books = require("./Books");
var Authentication = require("./Authentication");
var Categories = require("./Category");
var Cart = require("./Cart");
var Orders = require("./Orders");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    books: Books.reducer,
    authenticate: Authentication.reducer,
    categories: Categories.reducer,
    cart: Cart.reducer,
    orders: Orders.reducer
};
//# sourceMappingURL=index.js.map