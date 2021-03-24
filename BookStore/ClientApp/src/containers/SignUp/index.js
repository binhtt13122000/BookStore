"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Avatar_1 = require("@material-ui/core/Avatar");
var Button_1 = require("@material-ui/core/Button");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var TextField_1 = require("@material-ui/core/TextField");
var Link_1 = require("@material-ui/core/Link");
var Grid_1 = require("@material-ui/core/Grid");
var Box_1 = require("@material-ui/core/Box");
var LockOutlined_1 = require("@material-ui/icons/LockOutlined");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var Container_1 = require("@material-ui/core/Container");
var react_hook_form_1 = require("react-hook-form");
var AuthenticationStore = require("../../store/Authentication");
var react_redux_1 = require("react-redux");
var Warning_1 = require("@material-ui/icons/Warning");
var axios_1 = require("axios");
var react_router_1 = require("react-router");
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
function SignUp(props) {
    var history = react_router_1.useHistory();
    var classes = useStyles();
    var _a = react_hook_form_1.useForm(), handleSubmit = _a.handleSubmit, clearErrors = _a.clearErrors, errors = _a.errors, setError = _a.setError, register = _a.register, watch = _a.watch;
    var password = React.useRef({});
    password.current = watch("password", "");
    var _b = React.useState(false), loading = _b[0], setLoading = _b[1];
    var submitHandler = function (data) {
        clearErrors();
        setLoading(true);
        axios_1.default.post("/api/users/register", data)
            .then(function (res) {
            if (res.status === 200) {
                console.log("Successful!");
                setLoading(true);
            }
        })
            .catch(function (ex) {
            console.log(ex.response);
            setError("REGISTER_FAIL", {
                type: "manual",
                message: "Create fail!"
            });
        });
    };
    if (props.status) {
        if (props.authenticate.roleId === 1) {
            return React.createElement(react_router_1.Redirect, { to: "/home" });
        }
        else {
            return React.createElement(react_router_1.Redirect, { to: "/admin/home" });
        }
    }
    return (React.createElement(Container_1.default, { component: "main", maxWidth: "xs" },
        React.createElement(CssBaseline_1.default, null),
        React.createElement("div", { className: classes.paper },
            React.createElement(Avatar_1.default, { className: classes.avatar },
                React.createElement(LockOutlined_1.default, null)),
            React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "Sign up"),
            React.createElement("form", { className: classes.form, noValidate: true, onSubmit: handleSubmit(submitHandler) },
                React.createElement(Grid_1.default, { container: true, spacing: 2 },
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, id: "lastName", label: "FullName", name: "name", error: errors["name"] !== null && errors["name"] !== undefined, inputRef: register({ required: "Fullname is required!" }) }),
                        errors["name"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["name"].message))),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", error: errors["email"] !== null && errors["email"] !== undefined, inputRef: register({ required: "Email is required!" }) }),
                        errors["email"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["email"].message))),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", error: errors["password"] !== null && errors["password"] !== undefined, inputRef: register({ required: "Password is required!" }) }),
                        errors["password"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["password"].message))),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, name: "confirm", label: "Confirm Password", type: "password", id: "confirm", error: errors["confirm"] !== null && errors["confirm"] !== undefined, inputRef: register({
                                validate: function (value) {
                                    return value === password.current || "The passwords do not match";
                                }
                            }) }),
                        errors["confirm"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["confirm"].message)))),
                React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit }, "Sign Up"),
                errors["REGISTER_FAIL"] &&
                    React.createElement("div", { className: classes.warming },
                        React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                        React.createElement("span", null, errors["REGISTER_FAIL"].message)),
                React.createElement(Grid_1.default, { container: true, justify: "flex-end" },
                    React.createElement(Grid_1.default, { item: true },
                        React.createElement(Link_1.default, { href: "/", variant: "body2" }, "Already have an account? Sign in"))))),
        React.createElement(Box_1.default, { mt: 5 },
            React.createElement(Copyright, null))));
}
exports.default = react_redux_1.connect(function (state) { return state.authenticate; }, AuthenticationStore.actionCreators)(SignUp);
//# sourceMappingURL=index.js.map