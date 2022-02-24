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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndGate = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var AndGate = /** @class */ (function (_super) {
    __extends(AndGate, _super);
    function AndGate() {
        return _super.call(this, 2, 1, 'AND') || this;
    }
    AndGate.prototype.logic = function () {
        this.outputs[0].setStatus(this.inputs[0].status && this.inputs[1].status);
    };
    return AndGate;
}(generic_operators_1.GenericOperator));
exports.AndGate = AndGate;
(0, helpers_1.registerOperator)(AndGate);


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOperator = exports.registerOperator = exports.getRandID = void 0;
var getRandID = function () { return __spreadArray([], Array(6), true).map(function () { return Math.floor(Math.random() * 16).toString(16); }).join(''); };
exports.getRandID = getRandID;
var operatorMap = new Map();
function registerOperator(constructor) {
    var name = constructor.name;
    operatorMap.set(name, constructor);
}
exports.registerOperator = registerOperator;
function getOperator(name) {
    return operatorMap.get(name);
}
exports.getOperator = getOperator;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenericOperator = void 0;
var helpers_1 = __webpack_require__(2);
var node_1 = __webpack_require__(4);
// Generic class for creating operators
// This parent class has functionality for creating the input/output nodes
// Aswell as other important features that is required in every operator such as:
//   Drawing itself and nodes
//   Checking if the mouse is hovering over
//   Draggin and dropping
//   Destorying this operator
//
// This class is an abstract class, meaning that you cannot create an instance of this class
// You can only extend this class, this is because every operator needs to have different logic
// Every child operator can also implement it's own draw method by overriding the customDraw() method
// By default the customDraw() method just draws the label, if the operator has one.
var GenericOperator = /** @class */ (function () {
    function GenericOperator(inputsN, outputsN, labelOrWidth) {
        if (labelOrWidth === void 0) { labelOrWidth = 50; }
        this.inputs = [];
        this.outputs = [];
        this.dragging = false;
        this.pos = createVector();
        this._id = (0, helpers_1.getRandID)();
        // Calculate the width and label
        // Depending on what type labelOrWidth is
        this.width = typeof labelOrWidth === 'string' ? textWidth(labelOrWidth) + 40 : labelOrWidth;
        this.label = typeof labelOrWidth === 'string' ? labelOrWidth : undefined;
        // Calculate the height of this operator
        // For every node give it 25 pixels of space
        // If there's 1 node or less, then just set the height as 50 pixels
        var most = Math.max(inputsN, outputsN);
        this.height = Math.max(most * 25, 50);
        // Generate input nodes and space evenly on the left side
        for (var i = 0; i < inputsN; i++) {
            this.inputs.push(new node_1.InputNode(createVector(-this.width / 1.7, ((-this.height / 2) + (i * this.height / inputsN)) + (this.height / inputsN / 2)), this));
        }
        // Generate output nodes and space evenly on the right side
        for (var i = 0; i < outputsN; i++) {
            this.outputs.push(new node_1.OutputNode(createVector(this.width / 1.7, ((-this.height / 2) + (i * this.height / outputsN)) + (this.height / outputsN / 2)), this));
        }
    }
    Object.defineProperty(GenericOperator.prototype, "id", {
        get: function () { return this._id; } // eslint-disable-line no-underscore-dangle
        ,
        enumerable: false,
        configurable: true
    });
    GenericOperator.prototype.setId = function (id) { this._id = id; }; // eslint-disable-line no-underscore-dangle
    GenericOperator.prototype.draw = function () {
        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        // Draw the darkgrey background
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);
        this.customDraw();
        // If mouse is over the operator, draw a white border
        if (this.mouseOver()) {
            stroke('#95d8ff');
            strokeWeight(3);
            noFill();
            rect(this.pos.x, this.pos.y, this.width * 1.15, this.height * 1.15, 5, 5, 5, 5);
        }
        pop();
        this.logic();
        // Draw all the nodes attached to this operator
        this.inputs.forEach(function (input) { return input.draw(); });
        this.outputs.forEach(function (output) { return output.draw(); });
    };
    GenericOperator.prototype.customDraw = function () {
        // This method just draws the label of the operator by default
        // Child classes can overwrite this method and implement their own draw
        if (this.label) {
            fill('#fff');
            textSize(14);
            text(this.label, this.pos.x, this.pos.y);
        }
    };
    GenericOperator.prototype.mouseOver = function () {
        return mouseX > this.pos.x - (this.width / 2)
            && mouseX < this.pos.x + (this.width / 2)
            && mouseY > this.pos.y - (this.height / 2)
            && mouseY < this.pos.y + (this.height / 2);
    };
    GenericOperator.prototype.dragStart = function () {
        this.dragging = true;
    };
    GenericOperator.prototype.drag = function () {
        if (this.dragging) {
            this.pos.x = mouseX;
            this.pos.y = mouseY;
        }
    };
    GenericOperator.prototype.dragEnd = function () {
        this.dragging = false;
    };
    GenericOperator.prototype.destroy = function () {
        // This method will tell all nodes to destroy all wires
        // So that no other operators are connected to this
        this.inputs.forEach(function (cur) { return cur.destroy(); });
        this.outputs.forEach(function (cur) { return cur.destroy(); });
    };
    return GenericOperator;
}());
exports.GenericOperator = GenericOperator;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutputNode = exports.InputNode = void 0;
var helpers_1 = __webpack_require__(2);
var wire_1 = __webpack_require__(5);
var radius = 15;
// This is stuff for creating a new wire between to nodes
var selectedOutputNode;
function selectNode(node) {
    if (node instanceof OutputNode) {
        // If the clicked node is an output
        // And we haven't selected an outputNode already
        // Then set selectedOutputNode to the node that was clicked on
        if (!selectedOutputNode) {
            selectedOutputNode = node;
            return;
        }
        // If the clicked node is the same node, that was already pressed
        // Then just cancel the selection
        if (selectedOutputNode.id == node.id) {
            selectedOutputNode = undefined;
        }
    }
    else {
        // If we have already selected an outputNode
        // And we have clicked an input node, then connect the two nodes with a wire
        if (selectedOutputNode) {
            new wire_1.Wire().connect(node, selectedOutputNode);
            selectedOutputNode = undefined;
        }
    }
}
// Generic class for the two types of nodes
// The main difference between the input & ouput nodes, are that
// Input nodes only have one wire, and output nodes can have multiple wire
// This means that the methods should reflect this difference
// The class is abstract because even though the implmentation is going to be different
// The method names should remain the same
var GenericNode = /** @class */ (function () {
    function GenericNode(relativePos, parent) {
        var _this = this;
        this.relativePos = relativePos;
        this.parent = parent;
        this.id = (0, helpers_1.getRandID)();
        document.addEventListener('click', function () { return _this.mouseClicked(); });
    }
    Object.defineProperty(GenericNode.prototype, "pos", {
        get: function () { return this.parent.pos.copy().add(this.relativePos); },
        enumerable: false,
        configurable: true
    });
    GenericNode.prototype.getNodeNumber = function () {
        var _this = this;
        // Because the nodes are two different types, and exist in two different arrays
        // So we need to check what type the calling node is
        // This check is instead of making this method abstract
        if (this.type == 'input')
            return this.parent.inputs.findIndex(function (node) { return node.id == _this.id; });
        // If it isn't input, then it's output
        return this.parent.outputs.findIndex(function (node) { return node.id == _this.id; });
    };
    GenericNode.prototype.clickHandler = function () { }; // Empty handler for clicking on the node (only used by output node)
    GenericNode.prototype.mouseClicked = function () {
        var distSq = (Math.pow((this.pos.x - mouseX), 2)) + (Math.pow((this.pos.y - mouseY), 2));
        var dist = Math.sqrt(distSq);
        if (dist < radius) {
            // If the mouse is over the node
            // Then call the clickHandler on this node
            // And call the selectNode function
            this.clickHandler();
            selectNode(this);
        }
    };
    return GenericNode;
}());
var InputNode = /** @class */ (function (_super) {
    __extends(InputNode, _super);
    function InputNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'input';
        return _this;
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
        // Shift click to delete the node
        if (!selectedOutputNode && this.wire && keyCode == SHIFT) {
            this.wire.destroy();
        }
    };
    InputNode.prototype.destroy = function () {
        var _a;
        (_a = this.wire) === null || _a === void 0 ? void 0 : _a.destroy();
    };
    InputNode.prototype.getWireRelation = function () {
        var _a;
        return (_a = this.wire) === null || _a === void 0 ? void 0 : _a.describeRelation();
    };
    return InputNode;
}(GenericNode));
exports.InputNode = InputNode;
var OutputNode = /** @class */ (function (_super) {
    __extends(OutputNode, _super);
    function OutputNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wires = [];
        _this.type = 'output';
        return _this;
    }
    OutputNode.prototype.connectWire = function (wire) {
        this.wires.push(wire);
    };
    OutputNode.prototype.removeWire = function (wire) {
        // When removing a wire, look through the wires array
        // And filter out the one with a matching id
        this.wires = this.wires.filter(function (w) { return w.id != wire.id; });
    };
    OutputNode.prototype.flip = function () {
        // Simply flip all the wires
        this.wires.forEach(function (wire) { return (wire.status = !wire.status); });
    };
    OutputNode.prototype.setStatus = function (status) {
        this.wires.forEach(function (wire) { return (wire.status = status); });
    };
    OutputNode.prototype.draw = function () {
        push();
        noStroke();
        // Call the draw method on all it's wires
        this.wires.forEach(function (wire) { return wire.draw(); });
        fill((selectedOutputNode === null || selectedOutputNode === void 0 ? void 0 : selectedOutputNode.id) == this.id ? '#395699' : '#677087');
        circle(this.pos.x, this.pos.y, radius);
        // If this node is clicked, then highlight it with a different color
        // And draw a line from the node to the mouse
        if ((selectedOutputNode === null || selectedOutputNode === void 0 ? void 0 : selectedOutputNode.id) == this.id) {
            strokeWeight(4);
            stroke('#383838');
            line(this.pos.x, this.pos.y, mouseX, mouseY);
        }
        pop();
    };
    OutputNode.prototype.destroy = function () {
        this.wires.forEach(function (wire) { return wire.destroy(); });
    };
    return OutputNode;
}(GenericNode));
exports.OutputNode = OutputNode;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wire = void 0;
var helpers_1 = __webpack_require__(2);
// Wire class that describes a connection between an input- and output-node
// A wire can only be connected to 1 input and 1 output
var Wire = /** @class */ (function () {
    // eslint-disable-next-line no-useless-constructor
    function Wire(id) {
        if (id === void 0) { id = (0, helpers_1.getRandID)(); }
        this.id = id;
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
    Wire.prototype.destroy = function () {
        var _a, _b;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.removeWire(this);
        (_b = this.output) === null || _b === void 0 ? void 0 : _b.removeWire(this);
    };
    Wire.prototype.describeRelation = function () {
        // If this wire isn't fully connected return undefined
        if (!this.output || !this.input)
            return;
        return {
            id: this.id,
            from: { id: this.output.parent.id, node: this.output.getNodeNumber() },
            to: { id: this.input.parent.id, node: this.input.getNodeNumber() },
        };
    };
    Wire.HIGH = true;
    Wire.LOW = false;
    return Wire;
}());
exports.Wire = Wire;


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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var buttonSize = 50;
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super.call(this, 0, 1, buttonSize) || this;
        _this.state = false;
        document.addEventListener('click', function () { return _this.mouseClicked(); });
        return _this;
    }
    Input.prototype.customDraw = function () {
        push();
        rectMode(CENTER);
        noStroke();
        fill('#383838');
        rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);
        fill('#db0000');
        circle(this.pos.x, this.pos.y, buttonSize * 0.7);
        pop();
    };
    Input.prototype.logic = function () {
        this.outputs[0].setStatus(this.state);
    };
    Input.prototype.mouseClicked = function () {
        var distSq = (Math.pow((this.pos.x - mouseX), 2)) + (Math.pow((this.pos.y - mouseY), 2));
        var dist = Math.sqrt(distSq);
        if (dist < buttonSize * 0.7 / 2) {
            this.state = !this.state;
        }
    };
    return Input;
}(generic_operators_1.GenericOperator));
exports.Input = Input;
(0, helpers_1.registerOperator)(Input);


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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Clock = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var wire_1 = __webpack_require__(5);
var size = 50;
var cycle = 1000;
// This is to prevent the wire being high for 1 frame
var activationTime = 50;
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super.call(this, 0, 1) || this;
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
(0, helpers_1.registerOperator)(Clock);


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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CombinedOperators = void 0;
var generic_operators_1 = __webpack_require__(3);
var input_1 = __webpack_require__(6);
var output_1 = __webpack_require__(9);
var CombinedOperators = /** @class */ (function (_super) {
    __extends(CombinedOperators, _super);
    function CombinedOperators(operators, name) {
        var _this = this;
        // Extract the inputs and outputs from all the operators
        // And the sort them in order of their pos.y component
        // This is so that the input/output nodes will match up with the internal input/output operators
        var inputOperators = operators.filter(function (op) { return op instanceof input_1.Input; }).sort(function (a, b) { return b.pos.y - a.pos.y; });
        var outputOperators = operators.filter(function (op) { return op instanceof output_1.Output; }).sort(function (a, b) { return b.pos.y - a.pos.y; });
        // Pass the number of inputs and outputs to the GenericOperator
        // So that it can create the appopriate amount of nodes
        _this = _super.call(this, inputOperators.length, outputOperators.length, name) || this;
        _this.inputOperators = inputOperators;
        _this.outputOperators = outputOperators;
        _this.childOperators = operators;
        return _this;
    }
    CombinedOperators.prototype.logic = function () {
        var _this = this;
        // Loop over every input node, and set every internal input operator to the state
        this.inputs.forEach(function (inp, idx) { return (_this.inputOperators[idx].state = inp.status); });
        // Loop over all the operators and run their logic
        this.childOperators.forEach(function (op) {
            op.logic();
        });
        // Loop over every output node, and set it's state the match the internal output opetators state
        this.outputs.forEach(function (out, idx) { return out.setStatus(_this.outputOperators[idx].state); });
    };
    return CombinedOperators;
}(generic_operators_1.GenericOperator));
exports.CombinedOperators = CombinedOperators;


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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Output = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var Output = /** @class */ (function (_super) {
    __extends(Output, _super);
    function Output() {
        var _this = _super.call(this, 1, 0) || this;
        _this.state = false;
        return _this;
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
    Output.prototype.logic = function () {
        this.state = this.inputs[0].status;
    };
    return Output;
}(generic_operators_1.GenericOperator));
exports.Output = Output;
(0, helpers_1.registerOperator)(Output);


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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotGate = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var NotGate = /** @class */ (function (_super) {
    __extends(NotGate, _super);
    function NotGate() {
        return _super.call(this, 1, 1, 'NOT') || this;
    }
    NotGate.prototype.logic = function () {
        this.outputs[0].setStatus(!this.inputs[0].status);
    };
    return NotGate;
}(generic_operators_1.GenericOperator));
exports.NotGate = NotGate;
(0, helpers_1.registerOperator)(NotGate);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrGate = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var OrGate = /** @class */ (function (_super) {
    __extends(OrGate, _super);
    function OrGate() {
        return _super.call(this, 2, 1, 'OR') || this;
    }
    OrGate.prototype.logic = function () {
        this.outputs[0].setStatus(this.inputs[0].status || this.inputs[1].status);
    };
    return OrGate;
}(generic_operators_1.GenericOperator));
exports.OrGate = OrGate;
(0, helpers_1.registerOperator)(OrGate);


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PulseButton = void 0;
var helpers_1 = __webpack_require__(2);
var generic_operators_1 = __webpack_require__(3);
var buttonSize = 50;
var pulse = 30;
var PulseButton = /** @class */ (function (_super) {
    __extends(PulseButton, _super);
    function PulseButton() {
        var _this = _super.call(this, 0, 1) || this;
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
        text('1', this.pos.x + (buttonSize * 0.7 / 2), this.pos.y + (buttonSize * 0.7 / 2));
        pop();
    };
    PulseButton.prototype.logic = function () { };
    PulseButton.prototype.mouseClicked = function () {
        var _this = this;
        var distSq = (Math.pow((this.pos.x - mouseX), 2)) + (Math.pow((this.pos.y - mouseY), 2));
        var dist = Math.sqrt(distSq);
        if (dist < buttonSize * 0.7 / 2) {
            this.outputs[0].setStatus(true);
            setTimeout(function () { return _this.outputs[0].setStatus(false); }, pulse);
        }
    };
    return PulseButton;
}(generic_operators_1.GenericOperator));
exports.PulseButton = PulseButton;
(0, helpers_1.registerOperator)(PulseButton);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadAllCircuits = exports.loadCircuitFromLocalStorage = exports.saveCircuitInLocalStorage = exports.parseOperators = exports.stringifyOperators = void 0;
var wire_1 = __webpack_require__(5);
var helpers_1 = __webpack_require__(2);
function stringifyOperators(operators) {
    var relations = {
        operators: [],
        connections: [],
    };
    // Loop over all the operators that we're givin
    operators.forEach(function (op) {
        if (op.constructor.name == 'CombinedOperators')
            throw new Error('Can\'t do CombinedOperators yet...');
        // Register the current operators
        relations.operators.push({
            id: op.id,
            className: op.constructor.name,
        });
        // We only need to loop over every input
        // Because we can be sure that every wire is between an output and an input
        // Therefore we only need to check inputs or outputs, not both of them.
        // If we do check both then we'll encounter wires we have already looked at.
        op.inputs.forEach(function (node) {
            // A connection goes from Output -> Input
            var connection = node.getWireRelation();
            if (!connection)
                return; // If the relation is undefined, just skip it
            relations.connections.push(connection);
        });
    });
    return JSON.stringify(relations);
}
exports.stringifyOperators = stringifyOperators;
function parseOperators(input) {
    var relations = JSON.parse(input);
    var operators = new Map();
    // Loop over every operator
    // And instatiate them
    relations.operators.forEach(function (opDescription) {
        // Destructure the operator description
        var id = opDescription.id, className = opDescription.className;
        // Try to retrieve the operator class, from the operatorMap
        var operatorClass = (0, helpers_1.getOperator)(className);
        // If the operatorClass wasn't found then throw an error
        if (!operatorClass)
            throw new Error("Unknown class '".concat(className, "'"));
        // eslint-disable-next-line new-cap
        var newOperator = new operatorClass();
        // Give the new operator the correct ID
        newOperator.setId(id);
        // Add the new operator to the Map with the id as the key
        operators.set(id, newOperator);
    });
    relations.connections.forEach(function (connection) {
        // Destructure the connection
        var id = connection.id, from = connection.from, to = connection.to;
        // Instantiate the new wire, with the correct ID
        var newWire = new wire_1.Wire(id);
        // Retriwve the correct opeators from the Map
        var fromOperator = operators.get(from.id);
        var toOperator = operators.get(to.id);
        // Check if both operators exist
        if (!fromOperator)
            throw new Error("Incorrect id for fromOperator: ".concat(from.id));
        if (!toOperator)
            throw new Error("Incorrect id for toOperator: ".concat(to.id));
        // Connect the wire to the correct nodes
        newWire.connect(toOperator.inputs[to.node], fromOperator.outputs[from.node]);
    });
    return Array.from(operators.values());
}
exports.parseOperators = parseOperators;
function saveCircuitInLocalStorage(operators, name) {
    var stringifiedOperators = stringifyOperators(operators);
    var stringToSave = "".concat(name, "|").concat(stringifiedOperators);
    // Prefix the key with 'circuit' to avoid collision between other keys
    localStorage.setItem("circuit-".concat(name), stringToSave);
}
exports.saveCircuitInLocalStorage = saveCircuitInLocalStorage;
function loadCircuitFromLocalStorage(name) {
    var rawItem = localStorage.getItem("circuit-".concat(name));
    if (!rawItem)
        return undefined;
    // Split the raw item by the delimeter '|'
    // And  get the second item in the array
    var stringifiedOperators = rawItem.split('|')[1];
    // Parse and return the operators
    return parseOperators(stringifiedOperators);
}
exports.loadCircuitFromLocalStorage = loadCircuitFromLocalStorage;
function loadAllCircuits() {
    var _a;
    var circuits = [];
    for (var idx = 0; idx < localStorage.length; idx++) {
        var key_1 = localStorage.key(idx);
        if (key_1 && key_1.startsWith('circuit-')) {
            // Get pretty name from the item
            var name_1 = (_a = localStorage.getItem(key_1)) === null || _a === void 0 ? void 0 : _a.split('|')[0];
            // If the name exists, then push it to the circuits array
            if (name_1)
                circuits.push(name_1);
        }
    }
    return circuits;
}
exports.loadAllCircuits = loadAllCircuits;
window.loadAllCircuits = loadAllCircuits;


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
var and_gate_1 = __webpack_require__(1);
var input_1 = __webpack_require__(6);
var clock_1 = __webpack_require__(7);
var combined_operators_1 = __webpack_require__(8);
var not_gate_1 = __webpack_require__(10);
var or_gate_1 = __webpack_require__(11);
var output_1 = __webpack_require__(9);
var pulse_button_1 = __webpack_require__(12);
var save_load_1 = __webpack_require__(13);
var operators = [];
var savedCombinedOperator = {};
window.setup = function () {
    createCanvas(windowWidth, windowHeight);
};
window.draw = function () {
    background(255);
    operators.forEach(function (cur) { return cur.draw(); });
};
// Add event listener for dragend event on all list events with data-tool value
document.querySelectorAll('[data-tool]').forEach(function (cur) {
    cur.addEventListener('dragend', function () {
        // When an HTML Element is dragged and then dropped
        // Then find out what tool it is, and create a new tool
        var tool = cur.getAttribute('data-tool');
        createOperator(tool);
    });
});
function createOperator(tool) {
    var newOperator;
    switch (tool) {
        case 'andGate':
            newOperator = new and_gate_1.AndGate();
            break;
        case 'pulse':
            newOperator = new pulse_button_1.PulseButton();
            break;
        case 'clock':
            newOperator = new clock_1.Clock();
            break;
        case 'output':
            newOperator = new output_1.Output();
            break;
        case 'input':
            newOperator = new input_1.Input();
            break;
        case 'notGate':
            newOperator = new not_gate_1.NotGate();
            break;
        case 'orGate':
            newOperator = new or_gate_1.OrGate();
            break;
        default:
            var exhaustiveCheck = tool;
            throw new Error("Unhandled tool case: ".concat(exhaustiveCheck));
    }
    newOperator.pos.set(createVector(mouseX, mouseY));
    operators.push(newOperator);
}
// Listen for when the 'Create Operator' is pressed
// Then combine all the current operators into one
(_a = document.getElementById('new-operator')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var _a;
    // Ask the user what it should be called
    var name = prompt('What will you call this new operator');
    if (!name)
        return alert('You can\'t create an operator without a name');
    // Copy all the current operators to the savedCombinedOperator object Under the user given name
    // Very important that we don't just write `savedCombinedOperator[name] = operator`, because then we only copy the reference
    // And then when we erase all the current operators, it will also erase all the saved onces
    savedCombinedOperator[name] = [];
    operators.forEach(function (op) { return savedCombinedOperator[name].push(op); });
    // Then erase the current operators
    operators.length = 0;
    // Save the operators to localStorage
    (0, save_load_1.saveCircuitInLocalStorage)(savedCombinedOperator[name], name);
    // Create the tool button in the UI
    var toolButton = document.createElement('li');
    toolButton.draggable = true;
    toolButton.innerText = name;
    // Insert the button before the spacer
    (_a = document.getElementById('insert-before-here')) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('beforebegin', toolButton);
    // Setup ondragend handler
    toolButton.addEventListener('dragend', function () {
        var newOperator = new combined_operators_1.CombinedOperators(savedCombinedOperator[name], name);
        newOperator.pos.set(createVector(mouseX, mouseY));
        operators.push(newOperator);
    });
});
// Get the deletion zone element, and show it when the user is dragging an operator around
var deletionZone = document.getElementById('deletion-zone');
// Loop over all operators and find the first one that is clicked
// Then drag it to the mouse position
var draggingItem;
window.mousePressed = function () {
    var clicked = operators.find(function (cur) { return cur.mouseOver(); });
    if (clicked) {
        clicked.dragStart();
        draggingItem = clicked;
    }
};
window.mouseDragged = function () {
    // If there's an item being dragged, then call the drag() method on them
    if (draggingItem) {
        draggingItem.drag();
        // Show the deletion zone
        deletionZone === null || deletionZone === void 0 ? void 0 : deletionZone.classList.remove('hidden');
    }
};
window.mouseReleased = function () {
    // When ever the mouse is released, call the dragEnd() method on the item
    // Wether or not we're actually dragging an item, using the optional chaining
    draggingItem === null || draggingItem === void 0 ? void 0 : draggingItem.dragEnd();
    // Hide the deletion zone, even if it wasn't show
    deletionZone === null || deletionZone === void 0 ? void 0 : deletionZone.classList.add('hidden');
    // If the user dropped the an operator in the deletionZone
    // Then destroy it
    if (draggingItem && mouseY < 100) {
        // Tell the operator to destroy all it's connections
        draggingItem.destroy();
        // Find an remove the operator from the array of operators
        var indexOfOperator = operators.findIndex(function (op) { return op == draggingItem; });
        operators.splice(indexOfOperator, 1);
    }
    draggingItem = undefined;
};

})();

/******/ })()
;