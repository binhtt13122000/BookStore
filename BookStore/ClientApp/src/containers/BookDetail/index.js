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
    var _a = React.useState(""), message = _a[0], setMessage = _a[1];
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var _c = React.useState(false), openSnackbar = _c[0], setOpenSnackbar = _c[1];
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
        }, setMessage);
        setOpen(false);
        setOpenSnackbar(true);
    };
    var handleClose = function (event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    return React.createElement("main", { className: "container" },
        React.createElement("div", { className: "left-column" },
            React.createElement("img", { className: "active", src: props.books[0] && props.books[0].image, alt: "Book", width: "80%" })),
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
                React.createElement("button", { disabled: props.books[0] && props.books[0].quantity === 0, onClick: function () { return setOpen(true); }, className: "cart-btn" }, "Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng")),
            React.createElement(core_1.Dialog, { open: open, onClose: function () { return setOpen(false); }, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
                React.createElement(core_1.DialogTitle, { id: "alert-dialog-title" }, "Bạn xác nhận thêm sản phẩm này vào giỏ hàng?"),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(core_1.Button, { onClick: addToCart, color: "primary" }, "\u0110\u1ED3ng \u00FD"),
                    React.createElement(core_1.Button, { onClick: function () { return setOpen(false); }, color: "primary" }, "Tho\u00E1t")))),
        message && React.createElement(core_1.Snackbar, { open: openSnackbar, autoHideDuration: 4000, onClose: handleClose, message: message }));
};
exports.default = react_redux_1.connect(function (state) {
    return __assign(__assign({}, state.books), state.authenticate);
}, __assign(__assign({}, BookStore.actionCreators), CartStore.actionCreators))(BookDetail);
//# sourceMappingURL=index.js.map