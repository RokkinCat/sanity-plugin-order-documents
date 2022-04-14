"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOrder = exports.setListOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("part:@sanity/base/client"));

var _data = require("../data");

var _constants = require("../_constants");

var client = _client["default"].withConfig({
  apiVersion: _constants.CLIENT_API_VERSION
});

var setOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_id, index) {
    var field,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            field = _args.length > 2 && _args[2] !== undefined ? _args[2] : _data.DEFAULT_FIELD_VALUE;
            return _context.abrupt("return", client.patch(_id).set((0, _defineProperty2["default"])({}, field, index)).commit());

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function setOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.setOrder = setOrder;

var setListOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(list) {
    var field,
        start,
        transaction,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            field = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _data.DEFAULT_FIELD_VALUE;
            start = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 0;
            transaction = list.reduce(function (trx, _ref3, index) {
              var _id = _ref3._id;
              return trx.patch(client.patch(_id).set((0, _defineProperty2["default"])({}, field, index + start)));
            }, client.transaction());
            return _context2.abrupt("return", transaction.commit());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function setListOrder(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setListOrder = setListOrder;