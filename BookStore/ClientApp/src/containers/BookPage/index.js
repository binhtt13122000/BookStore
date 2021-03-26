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
var React = require("react");
var Container_1 = require("@material-ui/core/Container");
var Grid_1 = require("@material-ui/core/Grid");
var styles_1 = require("@material-ui/core/styles");
var react_redux_1 = require("react-redux");
var BookStore = require("../../store/Books");
var CartStore = require("../../store/Cart");
var BookCard_1 = require("../../components/BookCard");
var SideBar_1 = require("../../components/SideBar");
var core_1 = require("@material-ui/core");
var creator = __assign(__assign({}, BookStore.actionCreators), CartStore.actionCreators);
var BookPage = function (props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        center: {
            margin: '0 auto'
        }
    }); });
    var _a = React.useState(""), message = _a[0], setMessage = _a[1];
    var addToCart = function (bookId) {
        props.addToCart({
            userId: props.authenticate.id || -1,
            bookId: bookId,
            quantity: 1
        }, setMessage);
        setOpen(true);
    };
    React.useEffect(function () {
        props.requestBooks();
    }, []);
    var classes = useStyles();
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var handleClose = function (event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (React.createElement(Grid_1.default, { container: true },
        React.createElement(Grid_1.default, { item: true, md: 3 },
            React.createElement(core_1.Hidden, { smDown: true },
                React.createElement(SideBar_1.default, null))),
        React.createElement(Grid_1.default, { item: true, xs: 12, md: 9 },
            React.createElement(Container_1.default, null,
                React.createElement(Grid_1.default, { className: classes.center, container: true, spacing: 4 }, props.books.map(function (book, index) {
                    return React.createElement(Grid_1.default, { item: true, key: index, xs: 12, sm: 4 },
                        React.createElement(BookCard_1.default, { book: book, addToCart: addToCart }));
                }))),
            message && React.createElement(core_1.Snackbar, { open: open, autoHideDuration: 4000, onClose: handleClose, message: message }))));
};
exports.default = react_redux_1.connect(function (state) { return __assign(__assign({}, state.books), state.authenticate); }, __assign(__assign({}, BookStore.actionCreators), CartStore.actionCreators))(BookPage);
//# sourceMappingURL=index.js.map