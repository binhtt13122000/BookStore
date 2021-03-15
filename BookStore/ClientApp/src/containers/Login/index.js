"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Avatar_1 = require("@material-ui/core/Avatar");
var Button_1 = require("@material-ui/core/Button");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var TextField_1 = require("@material-ui/core/TextField");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var Link_1 = require("@material-ui/core/Link");
var Paper_1 = require("@material-ui/core/Paper");
var Box_1 = require("@material-ui/core/Box");
var Grid_1 = require("@material-ui/core/Grid");
var LockOutlined_1 = require("@material-ui/icons/LockOutlined");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
function Copyright() {
    return (React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", align: "center" },
        'Copyright © ',
        React.createElement(Link_1.default, { color: "inherit", href: "https://material-ui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}); });
function Login() {
    var classes = useStyles();
    return (React.createElement(Grid_1.default, { container: true, component: "main", className: classes.root },
        React.createElement(CssBaseline_1.default, null),
        React.createElement(Grid_1.default, { item: true, xs: false, sm: 4, md: 7, className: classes.image }),
        React.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 5, component: Paper_1.default, elevation: 6, square: true },
            React.createElement("div", { className: classes.paper },
                React.createElement(Avatar_1.default, { className: classes.avatar },
                    React.createElement(LockOutlined_1.default, null)),
                React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign in"),
                React.createElement("form", { className: classes.form, noValidate: true },
                    React.createElement(TextField_1.default, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true }),
                    React.createElement(TextField_1.default, { variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" }),
                    React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { value: "remember", color: "primary" }), label: "Remember me" }),
                    React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit }, "Sign In"),
                    React.createElement(Grid_1.default, { container: true },
                        React.createElement(Grid_1.default, { item: true, xs: true },
                            React.createElement(Link_1.default, { href: "#", variant: "body2" }, "Forgot password?")),
                        React.createElement(Grid_1.default, { item: true },
                            React.createElement(Link_1.default, { href: "/signup", variant: "body2" }, "Don't have an account? Sign Up"))),
                    React.createElement(Box_1.default, { mt: 5 },
                        React.createElement(Copyright, null)))))));
}
exports.default = Login;
//# sourceMappingURL=index.js.map