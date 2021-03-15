"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Container_1 = require("@material-ui/core/Container");
var react_redux_1 = require("react-redux");
var columns = [
    { title: 'STT', field: 'id', editable: 'never' },
    { title: 'Tên sách', field: 'name' },
    { title: 'Tác giả', field: 'author' },
    { title: 'Giá bán', field: 'price', type: 'numeric' },
    { title: 'Số lượng', field: 'quantity', type: 'numeric' },
    {
        title: 'Trạng thái',
        field: 'status',
        lookup: { false: 'Đã xóa', true: 'Bình thường' },
        editable: 'onUpdate'
    },
];
function BookManage() {
    var _a = React.useState([]), data = _a[0], setData = _a[1];
    return (React.createElement(Container_1.default, null, "cc"));
}
exports.default = react_redux_1.connect()(BookManage);
//# sourceMappingURL=index.js.map