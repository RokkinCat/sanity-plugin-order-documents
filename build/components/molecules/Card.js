"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var ItemTypes = {
  CARD: "card"
};
var style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
  display: "flex",
  alignItems: "center"
};

var Card = function Card(_ref) {
  var id = _ref.id,
      index = _ref.index,
      moveCard = _ref.moveCard,
      onDragEnd = _ref.onDragEnd,
      jsx = _ref.jsx;
  var ref = (0, _react.useRef)(null);

  var _useDrop = (0, _reactDnd.useDrop)({
    accept: ItemTypes.CARD,
    collect: function collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: function hover(item, monitor) {
      var _ref$current;

      if (!ref.current) {
        return;
      }

      var dragIndex = item.index;
      var hoverIndex = index; // Don't replace items with themselves

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      } // Determine rectangle on screen


      // Determine rectangle on screen
      var hoverBoundingRect = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect(); // Get vertical middle

      // Get vertical middle
      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

      // Determine mouse position
      var clientOffset = monitor.getClientOffset(); // Get pixels to the top

      // Get pixels to the top
      var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } // Dragging upwards


      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      } // Time to actually perform the action


      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex); // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  }),
      _useDrop2 = (0, _slicedToArray2["default"])(_useDrop, 2),
      handlerId = _useDrop2[0].handlerId,
      drop = _useDrop2[1];

  var _useDrag = (0, _reactDnd.useDrag)({
    type: ItemTypes.CARD,
    item: function item() {
      return {
        id: id,
        index: index
      };
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    },
    end: function end() {
      onDragEnd();
    }
  }),
      _useDrag2 = (0, _slicedToArray2["default"])(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  var opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    style: _objectSpread(_objectSpread({}, style), {}, {
      opacity: opacity
    }),
    "data-handler-id": handlerId
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      paddingRight: "1rem"
    }
  }, index + 1, "."), " ", jsx);
};

exports.Card = Card;