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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from "react";
import { Tag } from "./components/Tag";
import { classSelectors } from "./utils/selectors";
var ReactTagInput = (function (_super) {
    __extends(ReactTagInput, _super);
    function ReactTagInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { input: "" };
        _this.inputRef = React.createRef();
        _this.onInputChange = function (e) {
            var _a, _b;
            var placeholder = _this.props.placeholder;
            (_a = _this.inputRef.current) === null || _a === void 0 ? void 0 : _a.setAttribute("size", (_b = placeholder) === null || _b === void 0 ? void 0 : _b.length.toString());
            _this.setState({ input: e.target.value });
        };
        _this.onInputKeyDown = function (e) {
            var _a, _b;
            var input = _this.state.input;
            var _c = _this.props, validator = _c.validator, removeOnBackspace = _c.removeOnBackspace, delimiters = _c.delimiters;
            if (e.keyCode === 9 && e.altKey) {
                (_a = _this.inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
            }
            else if (e.keyCode === 13 || ((_b = delimiters) === null || _b === void 0 ? void 0 : _b.includes(e.keyCode))) {
                e.preventDefault();
                if (input === "") {
                    return;
                }
                var valid = validator !== undefined ? validator(input) : true;
                if (!valid) {
                    return;
                }
                _this.addTag(input);
            }
            else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {
                if (input !== "") {
                    return;
                }
                _this.removeTag(_this.props.tags.length - 1);
            }
        };
        _this.onPaste = function (e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            var splitText = text.split(/[ ,\n\r\t\v\f\0]+/);
            var tags = __spreadArrays(_this.props.tags);
            splitText.map(function (tag) {
                if (!tags.includes(tag) && tag !== "") {
                    tags.push(tag);
                }
            });
            _this.props.onChange(tags);
        };
        _this.addTag = function (value) {
            var tags = __spreadArrays(_this.props.tags);
            if (!tags.includes(value)) {
                tags.push(value);
                _this.props.onChange(tags);
            }
            _this.setState({ input: "" });
        };
        _this.removeTag = function (i) {
            var tags = __spreadArrays(_this.props.tags);
            tags.splice(i, 1);
            _this.props.onChange(tags);
        };
        _this.updateTag = function (i, value) {
            var tags = __spreadArrays(_this.props.tags);
            var numOccurencesOfValue = tags.reduce(function (prev, currentValue, index) { return prev + (currentValue === value && index !== i ? 1 : 0); }, 0);
            if (numOccurencesOfValue > 0) {
                tags.splice(i, 1);
            }
            else {
                tags[i] = value;
            }
            _this.props.onChange(tags);
        };
        return _this;
    }
    ReactTagInput.prototype.render = function () {
        var _this = this;
        var input = this.state.input;
        var _a = this.props, id = _a.id, tags = _a.tags, _b = _a.placeholder, placeholder = _b === void 0 ? "Type and press enter" : _b, maxTags = _a.maxTags, editable = _a.editable, readOnly = _a.readOnly, validator = _a.validator, removeOnBackspace = _a.removeOnBackspace, _c = _a.delimiters, delimiters = _c === void 0 ? [9, 13, 188, 32] : _c;
        var maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;
        var isEditable = readOnly ? false : (editable || false);
        var showInput = !readOnly && !maxTagsReached;
        return (React.createElement("div", { id: id, className: classSelectors.wrapper },
            tags.map(function (tag, i) { return (React.createElement(Tag, { key: i, value: tag, index: i, editable: isEditable, readOnly: readOnly || false, inputRef: _this.inputRef, update: _this.updateTag, remove: _this.removeTag, validator: validator, removeOnBackspace: removeOnBackspace, delimiters: delimiters })); }),
            showInput &&
                React.createElement("input", { ref: this.inputRef, value: input, className: classSelectors.input, placeholder: placeholder, onChange: this.onInputChange, onKeyDown: this.onInputKeyDown, onPaste: this.onPaste })));
    };
    return ReactTagInput;
}(React.Component));
export default ReactTagInput;
//# sourceMappingURL=index.js.map