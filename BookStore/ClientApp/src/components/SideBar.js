"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
        },
    });
});
function CheckboxList(props) {
    var classes = useStyles();
    var _a = React.useState([0]), checked = _a[0], setChecked = _a[1];
    var handleToggle = function (value) { return function () {
        var currentIndex = checked.indexOf(value);
        var newChecked = __spreadArrays(checked);
        if (currentIndex === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    }; };
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Typography, { variant: "h5", style: { 'marginBottom': '15px' } }, "Categories"),
        React.createElement(List_1.default, { className: classes.root }, props.categories.map(function (category, index) {
            var labelId = 'category-' + category.id;
            return (React.createElement(ListItem_1.default, { key: index, role: undefined, dense: true, button: true, onClick: handleToggle(category.id) },
                React.createElement(ListItemIcon_1.default, null,
                    React.createElement(Checkbox_1.default, { edge: "start", checked: checked.indexOf(category.id) !== -1, tabIndex: -1, disableRipple: true, inputProps: { 'aria-labelledby': labelId } })),
                React.createElement(ListItemText_1.default, { id: labelId, primary: "" + category.name })));
        }))));
}
exports.default = react_redux_1.connect(function (state) { return state.categories; })(CheckboxList);
//# sourceMappingURL=SideBar.js.map