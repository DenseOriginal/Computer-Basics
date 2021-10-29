/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndGate = void 0;
var generic_operators_1 = __webpack_require__(2);
var AndGate = /** @class */ (function (_super) {
    __extends(AndGate, _super);
    function AndGate(pos) {
        return _super.call(this, pos, 'AND') || this;
    }
    AndGate.prototype.logic = function () {
        this.output.setStatus(this.inputA.status && this.inputB.status);
    };
    return AndGate;
}(generic_operators_1.GenericOperator));
exports.AndGate = AndGate;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenericOperator = void 0;
var node_1 = __webpack_require__(3);
var GenericOperator = /** @class */ (function () {
    function GenericOperator(pos, label, height) {
        if (height === void 0) { height = 50; }
        this.pos = pos;
        this.label = label;
        this.height = height;
        this.width = textWidth(label) + 40;
        this.inputA = new node_1.InputNode(this.pos.copy().add(createVector(-this.width / 1.7, -height * 0.3)));
        this.inputB = new node_1.InputNode(this.pos.copy().add(createVector(-this.width / 1.7, +height * 0.3)));
        this.output = new node_1.OutputNode(pos.copy().add(createVector(this.width / 1.7, 0)));
    }
    GenericOperator.prototype.draw = function () {
        this.logic();
        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);
        fill('#fff');
        textSize(14);
        text(this.label, this.pos.x, this.pos.y);
        pop();
        this.inputA.draw();
        this.inputB.draw();
        this.output.draw();
    };
    return GenericOperator;
}());
exports.GenericOperator = GenericOperator;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutputNode = exports.InputNode = void 0;
var wire_1 = __webpack_require__(5);
var radius = 15;
// This is stuff for creating a new wire between to nodes
var outputNode;
function selectNode(node) {
    if (node instanceof OutputNode) {
        if (!outputNode) {
            outputNode = node;
            return;
        }
        if (outputNode.id == node.id) {
            outputNode = undefined;
        }
    }
    else {
        if (outputNode) {
            new wire_1.Wire().connect(node, outputNode);
            outputNode = undefined;
        }
    }
}
var InputNode = /** @class */ (function () {
    function InputNode(pos) {
        var _this = this;
        this.pos = pos;
        this.id = Math.random().toString();
        document.addEventListener('click', function () { return _this.mouseClicked(); });
    }
    Object.defineProperty(InputNode.prototype, "status", {
        get: function () { var _a; return ((_a = this.wire) === null || _a === void 0 ? void 0 : _a.status) || wire_1.Wire.LOW; },
        enumerable: false,
        configurable: true
    });
    InputNode.prototype.connectWire = function (wire) {
        this.wire = wire;
    };
    InputNode.prototype.draw = function () {
        push();
        noStroke();
        fill('#677087');
        circle(this.pos.x, this.pos.y, radius);
        pop();
    };
    InputNode.prototype.mouseClicked = function () {
        var distSq = Math.pow((this.pos.x - mouseX), 2) + Math.pow((this.pos.y - mouseY), 2);
        var dist = Math.sqrt(distSq);
        if (dist < radius) {
            selectNode(this);
        }
    };
    return InputNode;
}());
exports.InputNode = InputNode;
var OutputNode = /** @class */ (function () {
    function OutputNode(pos) {
        var _this = this;
        this.pos = pos;
        this.wires = [];
        this.id = Math.random().toString();
        document.addEventListener('click', function () { return _this.mouseClicked(); });
    }
    OutputNode.prototype.connectWire = function (wire) {
        this.wires.push(wire);
    };
    OutputNode.prototype.flip = function () {
        this.wires.forEach(function (wire) { return wire.status = !wire.status; });
    };
    OutputNode.prototype.setStatus = function (status) {
        this.wires.forEach(function (wire) { return wire.status = status; });
    };
    OutputNode.prototype.draw = function () {
        push();
        noStroke();
        this.wires.forEach(function (wire) { return wire.draw(); });
        fill((outputNode === null || outputNode === void 0 ? void 0 : outputNode.id) == this.id ? '#395699' : '#677087');
        circle(this.pos.x, this.pos.y, radius);
        if ((outputNode === null || outputNode === void 0 ? void 0 : outputNode.id) == this.id) {
            strokeWeight(4);
            stroke('#383838');
            line(this.pos.x, this.pos.y, mouseX, mouseY);
        }
        pop();
    };
    OutputNode.prototype.mouseClicked = function () {
        var distSq = Math.pow((this.pos.x - mouseX), 2) + Math.pow((this.pos.y - mouseY), 2);
        var dist = Math.sqrt(distSq);
        if (dist < radius) {
            selectNode(this);
        }
    };
    return OutputNode;
}());
exports.OutputNode = OutputNode;


/***/ }),
/* 4 */,
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wire = void 0;
var Wire = /** @class */ (function () {
    function Wire() {
        this.status = false;
    }
    Wire.prototype.draw = function () {
        push();
        strokeWeight(4);
        stroke(this.status ? '#f55151' : '#383838');
        if (this.input && this.output) {
            line(this.output.pos.x, this.output.pos.y, this.input.pos.x, this.input.pos.y);
        }
        pop();
    };
    Wire.prototype.connect = function (input, output) {
        this.input = input;
        this.output = output;
        input.connectWire(this);
        output.connectWire(this);
    };
    Wire.HIGH = true;
    Wire.LOW = false;
    return Wire;
}());
exports.Wire = Wire;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
var node_1 = __webpack_require__(3);
var buttonSize = 50;
var Button = /** @class */ (function () {
    function Button(pos) {
        var _this = this;
        this.pos = pos;
        this.output = new node_1.OutputNode(pos.copy().add(createVector(buttonSize / 1.7, 0)));
        document.addEventListener('click', function () { return _this.mouseClicked(); });
    }
    Button.prototype.draw = function () {
        push();
        rectMode(CENTER);
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);
        fill('#db0000');
        circle(this.pos.x, this.pos.y, buttonSize * 0.7);
        pop();
        this.output.draw();
    };
    Button.prototype.mouseClicked = function () {
        var distSq = Math.pow((this.pos.x - mouseX), 2) + Math.pow((this.pos.y - mouseY), 2);
        var dist = Math.sqrt(distSq);
        if (dist < buttonSize * 0.7 / 2) {
            this.output.flip();
        }
    };
    return Button;
}());
exports.Button = Button;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotGate = void 0;
var node_1 = __webpack_require__(3);
var NotGate = /** @class */ (function () {
    function NotGate(pos, height) {
        if (height === void 0) { height = 50; }
        this.pos = pos;
        this.height = height;
        this.width = textWidth('NOT') + 40;
        this.inputA = new node_1.InputNode(this.pos.copy().add(createVector(-this.width / 1.7, 0)));
        this.output = new node_1.OutputNode(pos.copy().add(createVector(this.width / 1.7, 0)));
    }
    NotGate.prototype.draw = function () {
        this.output.setStatus(!this.inputA.status);
        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);
        fill('#fff');
        textSize(14);
        text('NOT', this.pos.x, this.pos.y);
        pop();
        this.inputA.draw();
        this.output.draw();
    };
    return NotGate;
}());
exports.NotGate = NotGate;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrGate = void 0;
var generic_operators_1 = __webpack_require__(2);
var OrGate = /** @class */ (function (_super) {
    __extends(OrGate, _super);
    function OrGate(pos) {
        return _super.call(this, pos, 'OR') || this;
    }
    OrGate.prototype.logic = function () {
        this.output.setStatus(this.inputA.status || this.inputB.status);
    };
    return OrGate;
}(generic_operators_1.GenericOperator));
exports.OrGate = OrGate;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/// <reference path="../node_modules/@types/p5/global.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
var and_gate_1 = __webpack_require__(1);
var button_1 = __webpack_require__(6);
var not_gate_1 = __webpack_require__(7);
var or_gate_1 = __webpack_require__(8);
var things = [];
window.setup = function () {
    var _a;
    createCanvas(windowWidth, windowHeight);
    (_a = document.querySelector('canvas')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return mousePressed(); });
};
window.draw = function () {
    background(255);
    things.forEach(function (cur) { return cur.draw(); });
};
function mousePressed() {
    var newThing;
    var tool = document.getElementById('tool-selection').value;
    switch (tool) {
        case 'andGate':
            newThing = new and_gate_1.AndGate(createVector(mouseX, mouseY));
            break;
        case 'button':
            newThing = new button_1.Button(createVector(mouseX, mouseY));
            break;
        case 'notGate':
            newThing = new not_gate_1.NotGate(createVector(mouseX, mouseY));
            break;
        case 'orGate':
            newThing = new or_gate_1.OrGate(createVector(mouseX, mouseY));
            break;
    }
    if (newThing)
        things.push(newThing);
}

})();

/******/ })()
;