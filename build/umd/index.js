(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global = global || self, global.ReactTagInput = factory(global.React));
}(this, (function (React) { 'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

    var classSelectors = {
        wrapper: "react-tag-input",
        input: "react-tag-input__input",
        tag: "react-tag-input__tag",
        tagContent: "react-tag-input__tag__content",
        tagRemove: "react-tag-input__tag__remove",
        tagRemoveReadOnly: "react-tag-input__tag__remove-readonly",
    };

    function removeLineBreaks(value) {
        return value.replace(/(\r\n|\n|\r)/gm, "");
    }
    var htmlEntityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
    };
    function escapeHtml(value) {
        return String(value).replace(/[&<>"'`=\/]/g, function (s) {
            return htmlEntityMap[s];
        });
    }
    function safeHtmlString(value) {
        return escapeHtml(removeLineBreaks(value));
    }

    var __extends = (undefined && undefined.__extends) || (function () {
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
    var ContentEditable = (function (_super) {
        __extends(ContentEditable, _super);
        function ContentEditable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.focused = false;
            _this.removed = false;
            _this.preFocusedValue = "";
            _this.onPaste = function (e) {
                e.preventDefault();
                var text = e.clipboardData.getData("text/plain");
                var splitText = text.split(/,| /);
                var firstString = splitText[0];
                document.execCommand("insertHTML", false, safeHtmlString(firstString));
            };
            _this.onFocus = function () {
                _this.preFocusedValue = _this.getValue();
                _this.focused = true;
            };
            _this.onBlur = function () {
                _this.focused = false;
                var ref = _this.props.innerEditableRef.current;
                var _a = _this.props, validator = _a.validator, change = _a.change;
                if (!_this.removed && ref) {
                    if (ref.innerText === "") {
                        _this.props.remove();
                        return;
                    }
                    if (validator) {
                        var valid = validator(_this.getValue());
                        if (!valid) {
                            ref.innerText = _this.preFocusedValue;
                            return;
                        }
                    }
                    change(ref.innerText);
                }
            };
            _this.onKeyDown = function (e) {
                var _a;
                var delimiters = _this.props.delimiters;
                if (e.keyCode === 13 || ((_a = delimiters) === null || _a === void 0 ? void 0 : _a.includes(e.keyCode))) {
                    e.preventDefault();
                    _this.focusInputRef();
                    return;
                }
                var removeOnBackspace = _this.props.removeOnBackspace;
                var value = _this.getValue();
                if (removeOnBackspace && e.keyCode === 8 && value === "") {
                    _this.removed = true;
                    _this.props.remove();
                    _this.focusInputRef();
                    return;
                }
            };
            _this.getValue = function () {
                var ref = _this.getRef();
                return ref ? ref.innerText : "";
            };
            _this.getRef = function () {
                return _this.props.innerEditableRef.current;
            };
            _this.focusInputRef = function () {
                var inputRef = _this.props.inputRef;
                if (inputRef && inputRef.current) {
                    inputRef.current.focus();
                }
            };
            return _this;
        }
        ContentEditable.prototype.componentDidMount = function () {
            this.preFocusedValue = this.getValue();
        };
        ContentEditable.prototype.render = function () {
            var _a = this.props, value = _a.value, className = _a.className, innerEditableRef = _a.innerEditableRef;
            return (React.createElement("div", { ref: innerEditableRef, className: className, contentEditable: true, onPaste: this.onPaste, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, dangerouslySetInnerHTML: { __html: safeHtmlString(value) } }));
        };
        return ContentEditable;
    }(React.Component));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
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
    var CloseIcon = function () { return (React.createElement("svg", { width: "8", height: "8", viewBox: "0 0 8 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L7.85355 7.14645C8.04882 7.34171 8.04882 7.65829 7.85355 7.85355C7.65829 8.04882 7.34171 8.04882 7.14645 7.85355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z", fill: "#7E90B2" }),
        React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L0.853553 7.85355C0.658291 8.04882 0.341709 8.04882 0.146447 7.85355C-0.0488155 7.65829 -0.0488155 7.34171 0.146447 7.14645L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447Z", fill: "#7E90B2" }))); };
    var Tag = (function (_super) {
        __extends$1(Tag, _super);
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

    var __extends$2 = (undefined && undefined.__extends) || (function () {
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
    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var ReactTagInput = (function (_super) {
        __extends$2(ReactTagInput, _super);
        function ReactTagInput() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = { input: "" };
            _this.inputRef = React.createRef();
            _this.onInputChange = function (e) {
                _this.setState({ input: e.target.value });
            };
            _this.onInputKeyDown = function (e) {
                var _a, _b;
                var input = _this.state.input;
                var _c = _this.props, validator = _c.validator, removeOnBackspace = _c.removeOnBackspace, _d = _c.delimiters, delimiters = _d === void 0 ? [9, 13, 188, 32] : _d;
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
            var _a = this.props, tags = _a.tags, placeholder = _a.placeholder, maxTags = _a.maxTags, editable = _a.editable, readOnly = _a.readOnly, validator = _a.validator, removeOnBackspace = _a.removeOnBackspace, delimiters = _a.delimiters;
            var maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;
            var isEditable = readOnly ? false : (editable || false);
            var showInput = !readOnly && !maxTagsReached;
            return (React.createElement("div", { className: classSelectors.wrapper },
                tags.map(function (tag, i) { return (React.createElement(Tag, { key: i, value: tag, index: i, editable: isEditable, readOnly: readOnly || false, inputRef: _this.inputRef, update: _this.updateTag, remove: _this.removeTag, validator: validator, removeOnBackspace: removeOnBackspace, delimiters: delimiters })); }),
                showInput &&
                    React.createElement("input", { ref: this.inputRef, value: input, className: classSelectors.input, placeholder: placeholder || "Type and press enter", onChange: this.onInputChange, onKeyDown: this.onInputKeyDown, onPaste: this.onPaste })));
        };
        return ReactTagInput;
    }(React.Component));

    return ReactTagInput;

})));
//# sourceMappingURL=index.js.map
