"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Avatar_1 = require("@material-ui/core/Avatar");
var Button_1 = require("@material-ui/core/Button");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var TextField_1 = require("@material-ui/core/TextField");
var Link_1 = require("@material-ui/core/Link");
var Paper_1 = require("@material-ui/core/Paper");
var Box_1 = require("@material-ui/core/Box");
var Grid_1 = require("@material-ui/core/Grid");
var LockOutlined_1 = require("@material-ui/icons/LockOutlined");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var Warning_1 = require("@material-ui/icons/Warning");
var react_redux_1 = require("react-redux");
var AuthenticationStore = require("../../store/Authentication");
var react_hook_form_1 = require("react-hook-form");
var react_router_1 = require("react-router");
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
    warming: {
        display: "flex",
        alignItems: "center",
        color: "#f50057",
    },
    warmingIcon: {
        fontSize: "16px",
        marginBottom: "4px",
        marginRight: "4px",
    },
}); });
function Login(props) {
    var classes = useStyles();
    var history = react_router_1.useHistory();
    var _a = react_hook_form_1.useForm(), errors = _a.errors, setError = _a.setError, register = _a.register, handleSubmit = _a.handleSubmit, clearErrors = _a.clearErrors;
    React.useEffect(function () {
        if (!props.status) {
            console.log("chua dang nhap");
            return;
        }
        else {
            if (props.authenticate.roleId === 1) {
                history.push("/home");
            }
            else {
                history.push("/admin/home");
            }
        }
    }, []);
    var submitHandler = function (data) {
        console.log(props);
        clearErrors();
        props.login(data, setError);
    };
    if (props.status) {
        if (props.authenticate.roleId === 1) {
            return React.createElement(react_router_1.Redirect, { to: "/home" });
        }
        else {
            return React.createElement(react_router_1.Redirect, { to: "/admin/home" });
        }
    }
    return (React.createElement(Grid_1.default, { container: true, component: "main", className: classes.root },
        React.createElement(CssBaseline_1.default, null),
        React.createElement(Grid_1.default, { item: true, xs: false, sm: 4, md: 7, className: classes.image }),
        React.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 5, component: Paper_1.default, elevation: 6, square: true },
            React.createElement("div", { className: classes.paper },
                React.createElement(Avatar_1.default, { className: classes.avatar },
                    React.createElement(LockOutlined_1.default, null)),
                React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign in"),
                React.createElement("form", { className: classes.form, noValidate: true, autoComplete: "off", onSubmit: handleSubmit(submitHandler) },
                    React.createElement(TextField_1.default, { variant: "outlined", margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoFocus: true, error: errors["email"] !== null && errors["email"] !== undefined, inputRef: register({ required: "Email is required." }) }),
                    errors["email"] &&
                        React.createElement("div", { className: classes.warming },
                            React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                            React.createElement("span", null, errors["email"].message)),
                    React.createElement(TextField_1.default, { variant: "outlined", margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", error: errors["password"] !== null && errors["password"] !== undefined, inputRef: register({ required: "Password is required." }) }),
                    errors["password"] &&
                        React.createElement("div", { className: classes.warming },
                            React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                            React.createElement("span", null, errors["password"].message)),
                    React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit }, props.isLoading ? "Loading" : "Sign In")),
                React.createElement(Grid_1.default, { container: true },
                    React.createElement(Grid_1.default, { item: true, onClick: function () { return history.push("/signup"); } },
                        React.createElement(Typography_1.default, { style: { 'cursor': 'pointer' }, color: "primary", variant: "body2" }, "Don't have an account? Sign Up"))),
                React.createElement(Box_1.default, { mt: 5 },
                    React.createElement(Typography_1.default, { variant: "body2", color: "textSecondary", align: "center" },
                        'Copyright © ',
                        React.createElement(Link_1.default, { color: "inherit", href: "https://material-ui.com/" }, "Your Website"),
                        ' ',
                        new Date().getFullYear(),
                        '.'))))));
}
exports.default = react_redux_1.connect(function (state) { return state.authenticate; }, AuthenticationStore.actionCreators)(Login);
//# sourceMappingURL=index.js.map