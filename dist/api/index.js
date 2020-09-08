"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = function _default() {
  router.get('/', function (req, res) {
    res.render('index', {
      message: req.flash('message'),
      title: 'FYMdaily',
      language: 'en',
      region: 'US'
    });
  });
  return router;
};

exports["default"] = _default;