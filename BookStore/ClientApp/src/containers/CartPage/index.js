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
var material_table_1 = require("material-table");
var React = require("react");
var react_redux_1 = require("react-redux");
var CartStore = require("../../store/Cart");
var es6_promise_1 = require("es6-promise");
var core_1 = require("@material-ui/core");
var react_hook_form_1 = require("react-hook-form");
var axios_1 = require("axios");
var Warning_1 = require("@material-ui/icons/Warning");
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function (theme) { return ({
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
var CartPage = function (props) {
    var _a = react_hook_form_1.useForm(), handleSubmit = _a.handleSubmit, clearErrors = _a.clearErrors, errors = _a.errors, setError = _a.setError, register = _a.register;
    var classes = useStyles();
    var columnsOfTable = [
        { title: 'Tên sách', field: 'book.name', editable: 'never' },
        { title: 'Giá bán', field: 'book.price', type: "numeric", editable: 'never' },
        { title: 'Số lượng', field: 'quantity', type: "numeric", editable: "onUpdate" },
    ];
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var _c = React.useState(false), loading = _c[0], setLoading = _c[1];
    React.useEffect(function () {
        props.requestCart(props.authenticate.id || -1);
    }, []);
    var handleRowUpdate = function (newData, oldData, resolve) {
        props.updateCart(newData, newData.id || -1, oldData.tableData.id, newData.quantity || -1, resolve);
    };
    var handleRowRemove = function (oldData, resolve) {
        props.deleteCart(oldData.id || -1, resolve);
    };
    var openConfirmModal = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var submitHandler = function (data) {
        clearErrors();
        setLoading(true);
        axios_1.default.post("api/orders/users/" + props.authenticate.id + "/books/productcarts", {
            PhoneNumber: data.phone,
            Address: data.address
        })
            .then(function (res) {
            if (res.status === 200) {
                console.log("Successful!");
                setLoading(false);
                setOpen(false);
                props.deleteAll();
            }
        })
            .catch(function (ex) {
            setLoading(false);
            console.log(ex.response);
            setError("ERROR", {
                type: "manual",
                message: "Thanh toán thất bại!"
            });
        });
    };
    return React.createElement(React.Fragment, null,
        React.createElement(core_1.Grid, { spacing: 2, container: true },
            React.createElement(core_1.Grid, { item: true, xs: 12 },
                React.createElement(core_1.Container, { style: { 'width': '100%' } },
                    React.createElement(core_1.Button, { disabled: props.cartDetails.length < 1, onClick: openConfirmModal, variant: "contained", color: "primary", style: { 'float': 'right' } }, "Thanh To\u00E1n"))),
            React.createElement(core_1.Grid, { item: true, xs: 12 },
                React.createElement(core_1.Container, { style: { 'width': '100%' } },
                    React.createElement(material_table_1.default, { style: { 'width': "100%" }, title: "Gi\u1ECF H\u00E0ng", isLoading: props.isLoading, columns: columnsOfTable, data: props.cartDetails, options: {
                            actionsColumnIndex: -1,
                            paging: false
                        }, editable: {
                            onRowUpdate: function (newData, oldData) {
                                return new es6_promise_1.Promise(function (resolve) {
                                    handleRowUpdate(newData, oldData, resolve);
                                });
                            },
                            onRowDelete: function (oldData) {
                                return new es6_promise_1.Promise(function (resolve) {
                                    handleRowRemove(oldData, resolve);
                                });
                            },
                        } })))),
        React.createElement(core_1.Dialog, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
            React.createElement("form", { onClick: handleSubmit(submitHandler) },
                React.createElement(core_1.DialogTitle, { id: "form-dialog-title" }, "Confirm"),
                React.createElement(core_1.DialogContent, null,
                    "T\u00EAn kh\u00E1ch h\u00E0ng: ",
                    props.authenticate.name,
                    React.createElement(core_1.Divider, { style: { 'marginTop': '10px', 'marginBottom': '10px' } }),
                    React.createElement(core_1.Grid, { container: true, spacing: 1 },
                        React.createElement(core_1.Grid, { item: true, xs: 4 }, "T\u00EAn s\u1EA3n ph\u1EA9m"),
                        React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, "S\u1ED1 l\u01B0\u1EE3ng"),
                        React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, "Th\u00E0nh ti\u1EC1n")),
                    props.cartDetails.map(function (cartDetail) {
                        return React.createElement(core_1.Grid, { container: true, spacing: 1, key: cartDetail.id },
                            React.createElement(core_1.Grid, { item: true, xs: 4 }, cartDetail.book && cartDetail.book.name),
                            React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, cartDetail.quantity),
                            React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, cartDetail.quantity * (cartDetail.book && cartDetail.book.price)));
                    }),
                    React.createElement(core_1.Divider, { style: { 'marginTop': '10px', 'marginBottom': '10px' } }),
                    React.createElement(core_1.Grid, { container: true },
                        React.createElement(core_1.Grid, { item: true, xs: 6 }, "T\u1ED5ng s\u1ED1 ti\u1EC1n:"),
                        React.createElement(core_1.Grid, { item: true, xs: 6, style: { 'textAlign': 'right' } }, props.cartDetails.map(function (cartDetail) { return cartDetail.quantity * (cartDetail.book && cartDetail.book.price); }).reduce(function (a, b) {
                            return a + b;
                        }, 0))),
                    React.createElement(core_1.DialogContentText, null, "Vui l\u00F2ng nh\u1EADp s\u1ED1 \u0111i\u1EC7n tho\u1EA1i li\u00EAn h\u1EC7 v\u00E0 \u0111\u1ECBa ch\u1EC9 \u0111\u1EC3 h\u1ED7 tr\u1EE3 v\u1EADn chuy\u1EC3n!"),
                    React.createElement(core_1.TextField, { autoFocus: true, margin: "dense", id: "address", onFocus: function () { return clearErrors("ERROR"); }, name: "address", label: "\u0110\u1ECBa ch\u1EC9", type: "text", fullWidth: true, error: errors["address"] !== null && errors["address"] !== undefined, inputRef: register({ required: "Địa chỉ được yêu cầu!", maxLength: { value: 50, message: "Tối đa 50 kí tự!" } }) }),
                    errors["address"] &&
                        React.createElement("div", { className: classes.warming },
                            React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                            React.createElement("span", null, errors["address"].message)),
                    React.createElement(core_1.TextField, { margin: "dense", id: "phone", onFocus: function () { return clearErrors("ERROR"); }, name: "phone", label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", type: "tel", fullWidth: true, error: errors["phone"] !== null && errors["phone"] !== undefined, inputRef: register({
                            required: "Số điện thoại được yêu cầu!", pattern: {
                                value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                message: "Số điện thoại không hợp lệ"
                            }
                        }) }),
                    errors["phone"] &&
                        React.createElement("div", { className: classes.warming },
                            React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                            React.createElement("span", null, errors["phone"].message)),
                    errors["ERROR"] &&
                        React.createElement("div", { className: classes.warming },
                            React.createElement(Warning_1.default, { className: classes.warmingIcon }),
                            React.createElement("span", null, errors["ERROR"].message))),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(core_1.Button, { onClick: handleClose, color: "primary" }, "Tho\u00E1t"),
                    React.createElement(core_1.Button, { type: "submit", color: "primary" }, "Thanh To\u00E1n")))));
};
exports.default = react_redux_1.connect(function (state) {
    return __assign(__assign({}, state.cart), state.authenticate);
}, CartStore.actionCreators)(CartPage);
//# sourceMappingURL=index.js.map