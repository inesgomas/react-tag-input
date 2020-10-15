var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { classSelectors } from "../utils/selectors";
import { ContentEditable } from "./ContentEditable";
export var CloseIcon = function () { return (React.createElement("svg", { width: "8", height: "8", viewBox: "0 0 8 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L7.85355 7.14645C8.04882 7.34171 8.04882 7.65829 7.85355 7.85355C7.65829 8.04882 7.34171 8.04882 7.14645 7.85355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z", fill: "#7E90B2" }),
    React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L0.853553 7.85355C0.658291 8.04882 0.341709 8.04882 0.146447 7.85355C-0.0488155 7.65829 -0.0488155 7.34171 0.146447 7.14645L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447Z", fill: "#7E90B2" }))); };
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.innerEditableRef = React.createRef();
        _this.remove = function () { return _this.props.remove(_this.props.index); };
        return _this;
    }
    Tag.prototype.render = function () {
        var _a = this.props, value = _a.value, index = _a.index, editable = _a.editable, inputRef = _a.inputRef, validator = _a.validator, update = _a.update, removeOnBackspace = _a.removeOnBackspace, delimiters = _a.delimiters;
        return (React.createElement("div", { className: classSelectors.tag },
            !editable && React.createElement("div", { className: classSelectors.tagContent }, value),
            editable && (React.createElement(ContentEditable, { value: value, inputRef: inputRef, innerEditableRef: this.innerEditableRef, className: classSelectors.tagContent, change: function (newValue) { return update(index, newValue); }, remove: this.remove, validator: validator, removeOnBackspace: removeOnBackspace, delimiters: delimiters })),
            React.createElement("div", { className: classSelectors.tagRemove, onClick: this.remove },
                React.createElement(CloseIcon, null))));
    };
    return Tag;
}(React.Component));
export { Tag };
//# sourceMappingURL=Tag.js.map