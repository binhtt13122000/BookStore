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
var OrderStore = require("../../store/Orders");
var core_1 = require("@material-ui/core");
var columnOfTablesAdmin = [
    { title: "Thời gian giao dịch", field: "createTime", type: "datetime" },
    { title: "Tổng số tiền", field: "total", align: "right" },
    { title: "Người mua", field: "user.name" },
    { title: "Số điện thoại", field: "phoneNumber" },
    { title: "Địa chỉ", field: "address" }
];
var columnOfTablesUser = [
    { title: "Thời gian giao dịch", field: "createTime", type: "datetime" },
    { title: "Tổng số tiền", field: "total", align: "right" },
];
var HistoryPage = function (props) {
    React.useEffect(function () {
        if (props.authenticate.roleId == 1) {
            props.requestOrdersOfUser(props.authenticate.id);
        }
        else {
            props.requestOrders();
        }
    }, []);
    return React.createElement(material_table_1.default, { style: { 'width': '100%' }, isLoading: props.isLoading, title: "L\u1ECBch s\u1EED giao d\u1ECBch", columns: props.authenticate.roleId == 1 ? columnOfTablesUser : columnOfTablesAdmin, data: props.orders, detailPanel: function (rowData) {
            return (React.createElement(React.Fragment, null,
                React.createElement(core_1.Paper, { elevation: 3, style: { 'boxSizing': "border-box", 'padding': '10px' } },
                    React.createElement(core_1.Grid, { container: true, spacing: 1 },
                        React.createElement(core_1.Grid, { item: true, xs: 4 }, "T\u00EAn s\u1EA3n ph\u1EA9m"),
                        React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, "S\u1ED1 l\u01B0\u1EE3ng"),
                        React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, "Th\u00E0nh ti\u1EC1n")),
                    React.createElement(core_1.Divider, { style: { 'marginTop': '10px', 'marginBottom': '10px' } }),
                    rowData.orderDetails.map(function (cartDetail) {
                        return React.createElement(core_1.Grid, { container: true, spacing: 1, key: cartDetail.id },
                            React.createElement(core_1.Grid, { item: true, xs: 4 }, cartDetail.book && cartDetail.book.name),
                            React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, cartDetail.quantity),
                            React.createElement(core_1.Grid, { item: true, xs: 4, style: { 'textAlign': 'right' } }, cartDetail.quantity * (cartDetail.book && cartDetail.book.price)));
                    }),
                    React.createElement(core_1.Divider, { style: { 'marginTop': '10px', 'marginBottom': '10px' } }),
                    React.createElement(core_1.Grid, { container: true },
                        React.createElement(core_1.Grid, { item: true, xs: 6 }, "T\u1ED5ng s\u1ED1 ti\u1EC1n:"),
                        React.createElement(core_1.Grid, { item: true, xs: 6, style: { 'textAlign': 'right' } }, rowData.orderDetails.map(function (cartDetail) { return cartDetail.quantity * (cartDetail.book && cartDetail.book.price); }).reduce(function (a, b) {
                            return a + b;
                        }, 0))))));
        } });
};
exports.default = react_redux_1.connect(function (state) {
    return __assign(__assign({}, state.orders), state.authenticate);
}, OrderStore.actionCreators)(HistoryPage);
//# sourceMappingURL=index.js.map