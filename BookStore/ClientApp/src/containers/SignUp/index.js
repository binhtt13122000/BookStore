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
var Grid_1 = require("@material-ui/core/Grid");
var Box_1 = require("@material-ui/core/Box");
var LockOutlined_1 = require("@material-ui/icons/LockOutlined");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var Container_1 = require("@material-ui/core/Container");
function Copyright() {
    return (React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", align: "center" },
        'Copyright © ',
        React.createElement(Link_1.default, { color: "inherit", href: "https://material-ui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}); });
function SignUp() {
    var classes = useStyles();
    return (React.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
        React.createElement(CssBaseline_1.default, null),
        React.createElement("div", { className: classes.paper },
            React.createElement(Avatar_1.default, { className: classes.avatar },
                React.createElement(LockOutlined_1.default, null)),
            React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign up"),
            React.createElement("form", { className: classes.form, noValidate: true },
                React.createElement(Grid_1.default, { container: true, spacing: 2 },
                    React.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                        React.createElement(TextField_1.default, { autoComplete: "fname", name: "firstName", variant: "outlined", required: true, fullWidth: true, id: "firstName", label: "First Name", autoFocus: true })),
                    React.createElement(Grid_1.default, { item: true, xs: 12, sm: 6 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, id: "lastName", label: "Last Name", name: "lastName", autoComplete: "lname" })),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email" })),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "current-password" })),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(FormControlLabel_1.default, { control: React.createElement(Checkbox_1.default, { value: "allowExtraEmails", color: "primary" }), label: "I want to receive inspiration, marketing promotions and updates via email." }))),
                React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit }, "Sign Up"),
                React.createElement(Grid_1.default, { container: true, justify: "flex-end" },
                    React.createElement(Grid_1.default, { item: true },
                        React.createElement(Link_1.default, { href: "/", variant: "body2" }, "Already have an account? Sign in"))))),
        React.createElement(Box_1.default, { mt: 5 },
            React.createElement(Copyright, null))));
}
exports.default = SignUp;
//# sourceMappingURL=index.js.map