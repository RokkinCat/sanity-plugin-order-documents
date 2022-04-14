"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _spinner = _interopRequireDefault(require("part:@sanity/components/loading/spinner"));

var _preview = _interopRequireDefault(require("part:@sanity/base/preview"));

var _schema = _interopRequireDefault(require("part:@sanity/base/schema"));

var _index = _interopRequireDefault(require("../../index.css"));

var _Card = require("../molecules/Card");

var _RefreshIcon = _interopRequireDefault(require("../atoms/RefreshIcon"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DraggableSection = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DraggableSection, _React$Component);

  var _super = _createSuper(DraggableSection);

  function DraggableSection() {
    (0, _classCallCheck2["default"])(this, DraggableSection);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DraggableSection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          documents = _this$props.documents,
          count = _this$props.count,
          type = _this$props.type,
          moveCard = _this$props.moveCard,
          onDragEnd = _this$props.onDragEnd,
          refreshDocuments = _this$props.refreshDocuments,
          loadMore = _this$props.loadMore;

      if (!(type && type.value) && !documents.length) {
        return null;
      }

      if (type && type.value && !documents.length) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].orderDocumentsMarginTop
        }, /*#__PURE__*/_react["default"].createElement(_spinner["default"], {
          message: "Loading...",
          center: true
        }));
      }

      var hasReachedEnd = documents.length === count;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("hr", {
        className: _index["default"].orderDocumentsRule
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].orderDocumentsSubheading
      }, /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Step 2: Drag and Drop to Re-order")), /*#__PURE__*/_react["default"].createElement("button", {
        className: _index["default"].orderDocumentsRefreshButton,
        onClick: refreshDocuments
      }, /*#__PURE__*/_react["default"].createElement(_RefreshIcon["default"], {
        title: "Refresh Documents"
      }))), /*#__PURE__*/_react["default"].createElement("ul", {
        className: _index["default"].orderDocumentsList
      }, documents.map(function (document, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: document._id,
          className: _index["default"].orderDocumentsListItem
        }, /*#__PURE__*/_react["default"].createElement(_Card.Card, {
          key: document._id,
          index: index,
          id: document._id,
          text: document.title,
          moveCard: moveCard,
          onDragEnd: onDragEnd,
          jsx: /*#__PURE__*/_react["default"].createElement(_preview["default"], {
            value: document,
            type: _schema["default"].get(document._type)
          })
        }));
      })), hasReachedEnd ? null : /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].orderDocumentsButtonWrapper
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: _index["default"].orderDocumentsButton,
        onClick: loadMore
      }, "Load More")));
    }
  }]);
  return DraggableSection;
}(_react["default"].Component);

var _default = DraggableSection;
exports["default"] = _default;