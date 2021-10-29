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
        return _super.call(this, pos, 2, 1, 'AND') || this;
    }
    AndGate.prototype.logic = function () {
        this.outputs[0].setStatus(this.inputs[0].status && this.inputs[0].status);
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
    function GenericOperator(pos, inputsN, outputsN, labelOrWidth) {
        if (labelOrWidth === void 0) { labelOrWidth = 50; }
        this.pos = pos;
        this.inputs = [];
        this.outputs = [];
        this.width = typeof labelOrWidth === 'string' ? textWidth(labelOrWidth) + 40 : labelOrWidth;
        this.label = typeof labelOrWidth === 'string' ? labelOrWidth : undefined;
        var most = Math.max(inputsN, outputsN);
        this.height = Math.max(most * 25, 50);
        // Generate input nodes and space evenly on the left side
        for (var i = 0; i < inputsN; i++) {
            this.inputs.push(new node_1.InputNode(createVector(-this.width / 1.7, (-this.height / 2 + (i * this.height / inputsN)) + this.height / inputsN / 2), pos));
        }
        // Generate output nodes and space evenly on the right side
        for (var i = 0; i < outputsN; i++) {
            this.outputs.push(new node_1.OutputNode(createVector(this.width / 1.7, (-this.height / 2 + (i * this.height / outputsN)) + this.height / outputsN / 2), pos));
        }
    }
    GenericOperator.prototype.draw = function () {
        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);
        this.customDraw();
        pop();
        this.logic();
        this.inputs.forEach(function (input) { return input.draw(); });
        this.outputs.forEach(function (output) { return output.draw(); });
    };
    GenericOperator.prototype.customDraw = function () {
        if (this.label) {
            fill('#fff');
            textSize(14);
            text(this.label, this.pos.x, this.pos.y);
        }
    };
    return GenericOperator;
}());
exports.GenericOperator = GenericOperator;


/***/ }),
/* 3 */
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
exports.OutputNode = exports.InputNode = void 0;
var wire_1 = __webpack_require__(4);
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
var GenericNode = /** @class */ (function () {
    function GenericNode(relativePos, parentPos) {
        var _this = this;
        this.relativePos = relativePos;
        this.parentPos = parentPos;
        this.id = Math.random().toString();
        document.addEventListener('click', function () { return _this.mouseClicked(); });
    }
    Object.defineProperty(GenericNode.prototype, "pos", {
        get: function () { return this.parentPos.copy().add(this.relativePos); },
        enumerable: false,
        configurable: true
    });
    GenericNode.prototype.clickHandler = function () { };
    GenericNode.prototype.mouseClicked = function () {
        var distSq = Math.pow((this.pos.x - mouseX), 2) + Math.pow((this.pos.y - mouseY), 2);
        var dist = Math.sqrt(distSq);
        if (dist < radius) {
            this.clickHandler();
            selectNode(this);
        }
    };
    return GenericNode;
}());
var InputNode = /** @class */ (function (_super) {
    __extends(InputNode, _super);
    function InputNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InputNode.prototype, "status", {
        get: function () { var _a; return ((_a = this.wire) === null || _a === void 0 ? void 0 : _a.status) || wire_1.Wire.LOW; },
        enumerable: false,
        configurable: true
    });
    InputNode.prototype.connectWire = function (wire) {
        this.wire = wire;
    };
    InputNode.prototype.removeWire = function (wire) {
        var _a;
        if (((_a = this.wire) === null || _a === void 0 ? void 0 : _a.id) == wire.id) {
            this.wire = undefined;
        }
    };
    InputNode.prototype.draw = function () {
        push();
        noStroke();
        fill('#677087');
        circle(this.pos.x, this.pos.y, radius);
        pop();
    };
    InputNode.prototype.clickHandler = function () {
        if (!outputNode && this.wire && keyCode == SHIFT) {
            this.wire.destroy();
        }
    };
    return InputNode;
}(GenericNode));
exports.InputNode = InputNode;
var OutputNode = /** @class */ (function (_super) {
    __extends(OutputNode, _super);
    function OutputNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wires = [];
        return _this;
    }
    OutputNode.prototype.connectWire = function (wire) {
        this.wires.push(wire);
    };
    OutputNode.prototype.removeWire = function (wire) {
        this.wires = this.wires.filter(function (w) { return w.id != wire.id; });
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
    return OutputNode;
}(GenericNode));
exports.OutputNode = OutputNode;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wire = void 0;
var Wire = /** @class */ (function () {
    function Wire() {
        this.status = false;
        this.id = Math.random().toString(36).substr(2, 9);
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
    Wire.prototype.destroy = function () {
        var _a, _b;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.removeWire(this);
        (_b = this.output) === null || _b === void 0 ? void 0 : _b.removeWire(this);
    };
    Wire.HIGH = true;
    Wire.LOW = false;
    return Wire;
}());
exports.Wire = Wire;


/***/ }),
/* 5 */
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
exports.Button = void 0;
var generic_operators_1 = __webpack_require__(2);
var buttonSize = 50;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(pos) {
        var _this = _super.call(this, pos, 0, 1, buttonSize) || this;
        document.addEventListener('click', function () { return _this.mouseClicked(); });
        return _this;
    }
    Button.prototype.customDraw = function () {
        push();
        rectMode(CENTER);
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);
        fill('#db0000');
        circle(this.pos.x, this.pos.y, buttonSize * 0.7);
        pop();
    };
    Button.prototype.logic = function () { };
    Button.prototype.mouseClicked = function () {
        var distSq = Math.pow((this.pos.x - mouseX), 2) + Math.pow((this.pos.y - mouseY), 2);
        var dist = Math.sqrt(distSq);
        if (dist < buttonSize * 0.7 / 2) {
            this.outputs[0].flip();
        }
    };
    return Button;
}(generic_operators_1.GenericOperator));
exports.Button = Button;


/***/ }),
/* 6 */
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
exports.Clock = void 0;
var generic_operators_1 = __webpack_require__(2);
var wire_1 = __webpack_require__(4);
var size = 50;
var cycle = 1000;
// This is to prevent the wire being high for 1 frame
var activationTime = 50;
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(pos) {
        var _this = _super.call(this, pos, 0, 1) || this;
        _this.lastTrigger = 0;
        return _this;
    }
    Clock.prototype.customDraw = function () {
        push();
        var deltaTime = millis() - this.lastTrigger;
        // Draw arc for the cycle, TWO_PI is the full circle
        var arcAngle = map(deltaTime, 0, cycle, 0, TWO_PI);
        stroke('#f9f9f9');
        strokeWeight(4);
        noFill();
        arc(this.pos.x, this.pos.y, size * 0.6, size * 0.6, 0, arcAngle);
        if (deltaTime > cycle - activationTime) {
            this.outputs[0].setStatus(wire_1.Wire.HIGH);
        }
        else {
            this.outputs[0].setStatus(wire_1.Wire.LOW);
        }
        if (deltaTime > cycle)
            this.lastTrigger = millis();
        pop();
    };
    Clock.prototype.logic = function () { };
    return Clock;
}(generic_operators_1.GenericOperator));
exports.Clock = Clock;


/***/ }),
/* 7 */
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
exports.NotGate = void 0;
var generic_operators_1 = __webpack_require__(2);
var NotGate = /** @class */ (function (_super) {
    __extends(NotGate, _super);
    function NotGate(pos) {
        return _super.call(this, pos, 1, 1, 'NOT') || this;
    }
    NotGate.prototype.logic = function () {
        this.outputs[0].setStatus(!this.inputs[0].status);
    };
    return NotGate;
}(generic_operators_1.GenericOperator));
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
        return _super.call(this, pos, 2, 1, 'OR') || this;
    }
    OrGate.prototype.logic = function () {
        this.outputs[0].setStatus(this.inputs[0].status || this.inputs[1].status);
    };
    return OrGate;
}(generic_operators_1.GenericOperator));
exports.OrGate = OrGate;


/***/ }),
/* 9 */
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
exports.PulseButton = void 0;
var generic_operators_1 = __webpack_require__(2);
var buttonSize = 50;
var pulse = 30;
var PulseButton = /** @class */ (function (_super) {
    __extends(PulseButton, _super);
    function PulseButton(pos) {
        var _this = _super.call(this, pos, 0, 1) || this;
        _this.pos = pos;
        document.addEventListener('mousedown', function () { return _this.mouseClicked(); });
        return _this;
    }
    PulseButton.prototype.customDraw = function () {
        push();
        noStroke();
        fill('#db0000');
        circle(this.pos.x, this.pos.y, buttonSize * 0.7);
        // Draw a little '1' in the lower right corner
        textAlign(CENTER, CENTER);
        textSize(buttonSize * 0.3);
        fill('#fff');
        text('1', this.pos.x + buttonSize * 0.7 / 2, this.pos.y + buttonSize * 0.7 / 2);
        pop();
    };
    PulseButton.prototype.logic = function () { };
    PulseButton.prototype.mouseClicked = function () {
        var _this = this;
        var distSq = Math.pow((this.pos.x - mouseX), 2) + Math.pow((this.pos.y - mouseY), 2);
        var dist = Math.sqrt(distSq);
        if (dist < buttonSize * 0.7 / 2) {
            this.outputs[0].setStatus(true);
            setTimeout(function () { return _this.outputs[0].setStatus(false); }, pulse);
        }
    };
    return PulseButton;
}(generic_operators_1.GenericOperator));
exports.PulseButton = PulseButton;


/***/ }),
/* 10 */
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
exports.Output = void 0;
var generic_operators_1 = __webpack_require__(2);
var Output = /** @class */ (function (_super) {
    __extends(Output, _super);
    function Output(pos) {
        return _super.call(this, pos, 1, 0) || this;
    }
    Output.prototype.customDraw = function () {
        push();
        rectMode(CENTER);
        noStroke();
        // Draw a smaller rectangle to represent the output
        // A high value is a green rectangle
        // And a low value is a darkgrey rectangle
        fill(this.inputs[0].status ? '#a0ffa0' : '#101010');
        rect(this.pos.x, this.pos.y, this.width * 0.75, this.height * 0.75, 2, 2, 2, 2);
        pop();
    };
    Output.prototype.logic = function () { };
    return Output;
}(generic_operators_1.GenericOperator));
exports.Output = Output;


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
var button_1 = __webpack_require__(5);
var clock_1 = __webpack_require__(6);
var not_gate_1 = __webpack_require__(7);
var or_gate_1 = __webpack_require__(8);
var output_1 = __webpack_require__(10);
var pulse_button_1 = __webpack_require__(9);
var things = [];
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
};
window.draw = function () {
    background(255);
    things.forEach(function (cur) { return cur.draw(); });
};
// Add event listener for dragend event on all list events with data-tool value
document.querySelectorAll('[data-tool]').forEach(function (cur) {
    cur.addEventListener('dragend', function () {
        var tool = cur.getAttribute('data-tool');
        createOperator(tool);
    });
});
function createOperator(tool) {
    var newThing;
    switch (tool) {
        case 'andGate':
            newThing = new and_gate_1.AndGate(createVector(mouseX, mouseY));
            break;
        case 'button':
            newThing = new button_1.Button(createVector(mouseX, mouseY));
            break;
        case 'pulse':
            newThing = new pulse_button_1.PulseButton(createVector(mouseX, mouseY));
            break;
        case 'clock':
            newThing = new clock_1.Clock(createVector(mouseX, mouseY));
            break;
        case 'output':
            newThing = new output_1.Output(createVector(mouseX, mouseY));
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