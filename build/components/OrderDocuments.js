"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _constants = require("../_constants");

var _router = require("part:@sanity/base/router");

var _index = _interopRequireDefault(require("../index.css"));

var _functions = require("../functions");

var _data = require("../data");

var _DraggableSection = _interopRequireDefault(require("./organisms/DraggableSection"));

var _TypeSection = _interopRequireDefault(require("./organisms/TypeSection"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var client = _client["default"].withConfig({
  apiVersion: _constants.CLIENT_API_VERSION
});

var PAGE_SIZE = 25; // note: going above 25 can lead to Promises not resolving

var OrderDocuments = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(OrderDocuments, _React$Component);

  var _super = _createSuper(OrderDocuments);

  function OrderDocuments() {
    var _this;

    (0, _classCallCheck2["default"])(this, OrderDocuments);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      count: 0,
      documents: [],
      types: [],
      type: {
        label: "",
        value: ""
      },
      field: {
        label: _data.DEFAULT_FIELD_LABEL,
        value: _data.DEFAULT_FIELD_VALUE
      },
      fields: []
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadMore", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var length, newDocuments, documents;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              length = _this.state.documents.length;
              _context.next = 3;
              return client.fetch("*[!(_id in path(\"drafts.**\")) && _type == $types] | order(".concat(_this.state.field.value, " asc, order asc, _updatedAt desc)[").concat(length, "...").concat(length + PAGE_SIZE, "]"), {
                types: _this.state.type.value
              });

            case 3:
              newDocuments = _context.sent;
              documents = [].concat((0, _toConsumableArray2["default"])(_this.state.documents), (0, _toConsumableArray2["default"])(newDocuments));

              _this.setState({
                documents: documents
              });

              _context.next = 8;
              return (0, _functions.setListOrder)(newDocuments, _this.state.field.value, length);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getTypes", function () {
      var types = (0, _functions.getDocumentTypeNames)();

      _this.setState({
        types: types
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getFields", function () {
      var _this$state = _this.state,
          type = _this$state.type,
          types = _this$state.types;
      var selectedType = types.find(function (_ref2) {
        var name = _ref2.name;
        return name === type.value;
      });
      var fields = (selectedType ? selectedType.fields : []).map(function (_ref3) {
        var name = _ref3.name,
            title = _ref3.title;
        return {
          value: name,
          label: title
        };
      });

      _this.setState({
        fields: fields
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "refreshTypes", function () {
      _this.getTypes();

      _this.getFields();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "refreshDocuments", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var count, documents;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return client.fetch("count(*[!(_id in path(\"drafts.**\")) && _type == $types])", {
                types: _this.state.type.value
              });

            case 2:
              count = _context2.sent;
              _context2.next = 5;
              return client.fetch("*[!(_id in path(\"drafts.**\")) && _type == $types] | order(".concat(_this.state.field.value, " asc, order asc, _updatedAt desc)[0...").concat(PAGE_SIZE, "]"), {
                types: _this.state.type.value
              });

            case 5:
              documents = _context2.sent;

              _this.setState({
                documents: documents,
                count: count
              });

              if (!(documents.length > 0)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 10;
              return (0, _functions.setListOrder)(documents, _this.state.field.value);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isSafeToProceed", function (documents, field, type) {
      var shouldShowWarning = (0, _functions.willUserOverrideData)(documents, field.value);
      var shouldProceed = true;

      if (shouldShowWarning) {
        shouldProceed = window.confirm("It looks like you are already storing data for:\n \u2022 Type: ".concat(type.label, "\n \u2022 Field: ").concat(field.label, "\n\nOverride existing data? This is a one-time operation and cannot be reversed."));
      }

      return shouldProceed;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleTypeChange", /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
        var value, label, count, documents, shouldProceed, firstDocument, firstDocumentOrderField, isFirstOrderUndefined, i, document, orderField, isOrderUndefined;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                value = _ref5.value, label = _ref5.label;
                _context3.next = 3;
                return client.fetch("count(*[!(_id in path(\"drafts.**\")) && _type == $types])", {
                  types: value
                });

              case 3:
                count = _context3.sent;
                _context3.next = 6;
                return client.fetch("*[!(_id in path(\"drafts.**\")) && _type == $types] | order(".concat(_this.state.field.value, " asc, order asc, _updatedAt desc)[0...").concat(PAGE_SIZE, "]"), {
                  types: value
                });

              case 6:
                documents = _context3.sent;
                shouldProceed = _this.isSafeToProceed(documents, _this.state.field, {
                  value: value,
                  label: label
                });

                if (!(documents && documents.length > 0 && shouldProceed)) {
                  _context3.next = 31;
                  break;
                }

                // check if the first document has no order field
                firstDocument = documents[0];
                firstDocumentOrderField = firstDocument[_this.state.field.value];
                isFirstOrderUndefined = firstDocumentOrderField === undefined; // if the first document has an order field, the plugin has been used at least once, and so we want to put documents with no order at the front

                if (isFirstOrderUndefined) {
                  _context3.next = 27;
                  break;
                }

                i = documents.length;

              case 14:
                if (!(i > 0)) {
                  _context3.next = 27;
                  break;
                }

                document = documents[i - 1];
                orderField = document[_this.state.field.value];
                isOrderUndefined = orderField === undefined;

                if (!isOrderUndefined) {
                  _context3.next = 23;
                  break;
                }

                documents.pop();
                documents.unshift(document);
                _context3.next = 24;
                break;

              case 23:
                return _context3.abrupt("break", 27);

              case 24:
                i--;
                _context3.next = 14;
                break;

              case 27:
                _this.setState({
                  type: {
                    value: value,
                    label: label
                  },
                  documents: documents,
                  count: count
                }, function () {
                  _this.getFields();
                });

                if (!(documents.length > 0)) {
                  _context3.next = 31;
                  break;
                }

                _context3.next = 31;
                return (0, _functions.setListOrder)(documents, _this.state.field.value);

              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref6.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFieldChange", /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref7) {
        var value, label, count, documents, shouldProceed;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                value = _ref7.value, label = _ref7.label;
                _context4.next = 3;
                return client.fetch("count(*[!(_id in path(\"drafts.**\")) && _type == $types])", {
                  types: _this.state.type.value
                });

              case 3:
                count = _context4.sent;
                _context4.next = 6;
                return client.fetch("*[!(_id in path(\"drafts.**\")) && _type == $types] | order(".concat(value, " asc, order asc, _updatedAt desc)[0...").concat(PAGE_SIZE, "]"), {
                  types: _this.state.type.value
                });

              case 6:
                documents = _context4.sent;
                shouldProceed = _this.isSafeToProceed(documents, {
                  value: value,
                  label: label
                }, _this.state.type);

                if (!shouldProceed) {
                  _context4.next = 13;
                  break;
                }

                _this.setState({
                  field: {
                    value: value,
                    label: label
                  },
                  documents: documents,
                  count: count
                });

                if (!(documents.length > 0)) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 13;
                return (0, _functions.setListOrder)(_this.state.documents, value);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x2) {
        return _ref8.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "moveCard", /*#__PURE__*/function () {
      var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(beforeIndex, afterIndex) {
        var card1, card2;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                card1 = _this.state.documents[beforeIndex];
                card2 = _this.state.documents[afterIndex];

                _this.setState({
                  documents: (0, _immutabilityHelper["default"])(_this.state.documents, {
                    $splice: [[beforeIndex, 1], [afterIndex, 0, card1]]
                  })
                });

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x3, _x4) {
        return _ref9.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onDragEnd", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _functions.setListOrder)(_this.state.documents, _this.state.field.value);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    return _this;
  }

  (0, _createClass2["default"])(OrderDocuments, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getTypes();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
        backend: _reactDndHtml5Backend.HTML5Backend
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].orderDocumentsFlexContainer
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].orderDocumentsOuterWrapper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].orderDocumentsInnerWrapper
      }, /*#__PURE__*/_react["default"].createElement(_TypeSection["default"], (0, _extends2["default"])({}, this.state, {
        handleTypeChange: this.handleTypeChange,
        handleFieldChange: this.handleFieldChange,
        refreshTypes: this.refreshTypes
      })), /*#__PURE__*/_react["default"].createElement(_DraggableSection["default"], {
        documents: this.state.documents,
        count: this.state.count,
        type: this.state.type,
        moveCard: this.moveCard,
        onDragEnd: this.onDragEnd,
        refreshDocuments: this.refreshDocuments,
        loadMore: this.loadMore
      })))));
    }
  }]);
  return OrderDocuments;
}(_react["default"].Component);

var _default = (0, _router.withRouterHOC)(OrderDocuments);

exports["default"] = _default;