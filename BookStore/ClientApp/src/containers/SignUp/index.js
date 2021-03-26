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
var core_1 = require("@material-ui/core");
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
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var handleClose = function (event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        history.push("/");
    };
    var _c = React.useState(false), loading = _c[0], setLoading = _c[1];
    var submitHandler = function (data) {
        clearErrors();
        setLoading(true);
        axios_1.default.post("/api/users/register", data)
            .then(function (res) {
            if (res.status === 200) {
                console.log("Successful!");
                setOpen(true);
                setLoading(false);
            }
        })
            .catch(function (ex) {
            setLoading(false);
            console.log(ex.response);
            setError("REGISTER_FAIL", {
                type: "manual",
                message: "Đăng kí thất bại!"
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
            React.createElement(Typography_1.default, { component: "h1", variant: "h5" }, "\u0110\u0103ng K\u00ED"),
            React.createElement("form", { className: classes.form, noValidate: true, onSubmit: handleSubmit(submitHandler) },
                React.createElement(Grid_1.default, { container: true, spacing: 2 },
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, id: "lastName", label: "H\u1ECD v\u00E0 T\u00EAn", name: "name", error: errors["name"] !== null && errors["name"] !== undefined, inputRef: register({ required: "Họ và Tên không được để trống!" }) }),
                        errors["name"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["name"].message))),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, id: "email", label: "\u0110\u1ECBa ch\u1EC9 Email", name: "email", autoComplete: "email", error: errors["email"] !== null && errors["email"] !== undefined, inputRef: register({
                                required: "Email không được để trống!", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email không hợp lệ!"
                                }
                            }) }),
                        errors["email"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["email"].message))),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, name: "password", label: "M\u1EADt kh\u1EA9u", type: "password", id: "password", error: errors["password"] !== null && errors["password"] !== undefined, inputRef: register({ required: "Mật khẩu không được để trống!" }) }),
                        errors["password"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["password"].message))),
                    React.createElement(Grid_1.default, { item: true, xs: 12 },
                        React.createElement(TextField_1.default, { variant: "outlined", required: true, fullWidth: true, name: "confirm", label: "Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u", type: "password", id: "confirm", error: errors["confirm"] !== null && errors["confirm"] !== undefined, inputRef: register({
                                validate: function (value) {
                                    return value === password.current || "Không khớp với mật khẩu";
                                }
                            }) }),
                        errors["confirm"] &&
                            React.createElement("div", { className: classes.warming },
                                React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                                React.createElement("span", null, errors["confirm"].message)))),
                React.createElement(Button_1.default, { type: "submit", fullWidth: true, variant: "contained", color: "primary", className: classes.submit }, loading ? React.createElement(core_1.CircularProgress, { style: { 'color': 'white' }, size: "20" }) : "Đăng kí"),
                errors["REGISTER_FAIL"] &&
                    React.createElement("div", { className: classes.warming },
                        React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                        React.createElement("span", null, errors["REGISTER_FAIL"].message)),
                React.createElement(Grid_1.default, { container: true, justify: "flex-end" },
                    React.createElement(Grid_1.default, { item: true },
                        React.createElement(Link_1.default, { href: "/", variant: "body2" }, "Already have an account? Sign in"))))),
        React.createElement(Box_1.default, { mt: 5 },
            React.createElement(Copyright, null)),
        React.createElement(core_1.Snackbar, { open: open, autoHideDuration: 4000, onClose: handleClose, message: "Register Successfully" })));
}
exports.default = react_redux_1.connect(function (state) { return state.authenticate; }, AuthenticationStore.actionCreators)(SignUp);
//# sourceMappingURL=index.js.map