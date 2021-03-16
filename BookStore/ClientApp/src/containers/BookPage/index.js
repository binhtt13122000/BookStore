"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Container_1 = require("@material-ui/core/Container");
var Grid_1 = require("@material-ui/core/Grid");
var styles_1 = require("@material-ui/core/styles");
var react_redux_1 = require("react-redux");
var BookStore = require("../../store/Books");
var BookCard_1 = require("../../components/BookCard");
var BookPage = function (props) {
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        center: {
            margin: '0 auto'
        }
    }); });
    React.useEffect(function () {
        props.requestBooks();
    }, []);
    var classes = useStyles();
    return (React.createElement(Container_1.default, null,
        React.createElement(Grid_1.default, { className: classes.center, container: true, spacing: 4 }, props.books.map(function (book, index) {
            return React.createElement(Grid_1.default, { item: true, key: index, xs: 12, sm: 4 },
                React.createElement(BookCard_1.default, { book: book }));
        }))));
};
exports.default = react_redux_1.connect(function (state) { return state.books; }, BookStore.actionCreators)(BookPage);
//# sourceMappingURL=index.js.map