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
var CartPage = function (props) {
    var columnsOfTable = [
        { title: 'ID', field: 'id', editable: 'never' },
        { title: 'Tên sách', field: 'book.name', editable: 'never' },
        { title: 'Giá bán', field: 'book.price', type: "numeric", editable: 'never' },
        { title: 'Số lượng', field: 'quantity', type: "numeric", editable: "onUpdate" },
    ];
    React.useEffect(function () {
        props.requestCart(props.authenticate.id || -1);
    }, []);
    var handleRowUpdate = function (newData, oldData, resolve) {
        console.log("a");
        props.updateCart(newData, newData.id || -1, oldData.tableData.id, newData.quantity || -1, resolve);
    };
    var handleRowRemove = function (oldData, resolve) {
        props.deleteCart(oldData.id || -1, resolve);
    };
    return React.createElement(React.Fragment, null,
        React.createElement(core_1.Grid, { spacing: 2, container: true },
            React.createElement(core_1.Grid, { item: true, xs: 12 },
                React.createElement(core_1.Container, { style: { 'width': '100%' } },
                    React.createElement(core_1.Button, { variant: "contained", color: "primary", style: { 'float': 'right' } }, "Checkout"))),
            React.createElement(core_1.Grid, { item: true, xs: 12 },
                React.createElement(core_1.Container, { style: { 'width': '100%' } },
                    React.createElement(material_table_1.default, { style: { 'width': "100%" }, title: "Cart Details", isLoading: props.isLoading, columns: columnsOfTable, data: props.cartDetails, options: {
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
                        } })))));
};
exports.default = react_redux_1.connect(function (state) {
    return __assign(__assign({}, state.cart), state.authenticate);
}, CartStore.actionCreators)(CartPage);
//# sourceMappingURL=index.js.map