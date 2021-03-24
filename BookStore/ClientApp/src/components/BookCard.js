"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var Card_1 = require("@material-ui/core/Card");
var CardActionArea_1 = require("@material-ui/core/CardActionArea");
var CardActions_1 = require("@material-ui/core/CardActions");
var CardContent_1 = require("@material-ui/core/CardContent");
var CardMedia_1 = require("@material-ui/core/CardMedia");
var Button_1 = require("@material-ui/core/Button");
var Typography_1 = require("@material-ui/core/Typography");
var Grid_1 = require("@material-ui/core/Grid");
var react_router_1 = require("react-router");
var useStyles = styles_1.makeStyles({
    root: {},
    media: {
        height: 140,
    },
});
function BookCard(props) {
    var history = react_router_1.useHistory();
    var classes = useStyles();
    var book = props.book, addToCart = props.addToCart;
    return (React.createElement(Card_1.default, { className: classes.root },
        React.createElement(CardActionArea_1.default, { onClick: function (e) { return history.push('/book/' + book.id); } },
            React.createElement(CardMedia_1.default, { className: classes.media, image: "https://material-ui.com/static/images/cards/contemplative-reptile.jpg", title: "Contemplative Reptile" }),
            React.createElement(CardContent_1.default, null,
                React.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "h2" }, book.name),
                React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", component: "p" },
                    "T\u00E1c gi\u1EA3: ",
                    book.author),
                React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", component: "p" },
                    "Lo\u1EA1i s\u00E1ch: ",
                    book.category && book.category.name),
                React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", component: "p" },
                    "Gi\u00E1 b\u00E1n: ",
                    book.price,
                    " VN\u0110"))),
        React.createElement(CardActions_1.default, null,
            React.createElement(Grid_1.default, { container: true, justify: "flex-end" },
                React.createElement(Button_1.default, { onClick: function () { return addToCart(book.id); }, variant: "contained", size: "small", color: "primary" }, "Add to Cart")))));
}
exports.default = BookCard;
//# sourceMappingURL=BookCard.js.map