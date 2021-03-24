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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
require("./style.css");
var React = require("react");
var react_redux_1 = require("react-redux");
var BookStore = require("../../store/Books");
var CartStore = require("../../store/Cart");
var creator = __assign(__assign({}, BookStore.actionCreators), CartStore.actionCreators);
var BookDetail = function (props) {
    React.useEffect(function () {
        var id = props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1);
        props.requestBook(parseInt(id));
    }, []);
    if (props.isLoading) {
        return React.createElement(core_1.Grid, { container: true, justify: "center", style: { 'marginTop': '20vh' } },
            React.createElement(core_1.Typography, null, "Loading..."));
    }
    var addToCart = function () {
        props.addToCart({
            userId: props.authenticate.id || -1,
            bookId: parseInt(props.location.pathname.substring(props.location.pathname.lastIndexOf("/") + 1)),
            quantity: 1
        });
    };
    return React.createElement("main", { className: "container" },
        React.createElement("div", { className: "left-column" },
            React.createElement("img", { className: "active", src: "https://1.bp.blogspot.com/-Yqc7dYMjV4k/WPByXopDvrI/AAAAAAAAIWU/d-z3mInf5YIvjSYK2XCVQi_QBhB-HHM-gCLcB/s320/The%2BObject%2BOriented%2Bthought%2Bprocess.jpeg", alt: "Book", width: "80%" })),
        React.createElement("div", { className: "right-column" },
            React.createElement("div", { className: "product-description" },
                React.createElement("span", null, props.books[0].category && props.books[0].category.name),
                React.createElement("h1", null, props.books[0] && props.books[0].name),
                React.createElement("h2", null, props.books[0] && props.books[0].author),
                React.createElement("p", null, "S\u00E1ch \u0111\u1ED9c quy\u1EC1n ch\u1EC9 \u0111\u01B0\u1EE3c b\u00E1n t\u1EA1i BookStore v\u1EDBi nhi\u1EC1u \u01B0u \u0111\u00E3i h\u1EA5p d\u1EABn!"),
                React.createElement("p", null,
                    "S\u1ED1 l\u01B0\u1EE3ng: ",
                    props.books[0] && props.books[0].quantity)),
            React.createElement("div", { className: "product-price" },
                React.createElement("span", null,
                    props.books[0] && props.books[0].price,
                    " VN\u0110"),
                React.createElement("button", { onClick: addToCart, className: "cart-btn" }, "Add to cart"))));
};
exports.default = react_redux_1.connect(function (state) {
    return __assign(__assign({}, state.books), state.authenticate);
}, __assign(__assign({}, BookStore.actionCreators), CartStore.actionCreators))(BookDetail);
//# sourceMappingURL=index.js.map