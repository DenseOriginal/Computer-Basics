# Object Oriented Design Patterns

## Encapsulation

- GenericOperator doesn't expose customDraw to the outside, as it's protected, so only child classes can override this method.
- Nodes doesn't expose it's relative- or parent-position, instead it only exposes a pos property, that is readonly.
- GenericNode has a private mouseClicked method, to check if the mouse clicked the node, then calls a protected method.

## Abstraction

GenericOperator handles all the complex things about being an operator, such as:

- Creating input- and output-nodes
- Drawing
- Dragging

This means that child operators only need to extend the generic class, and call super with the necessary information.

## Inheritance

This is the core principal that makes it very easy to add any new operators, it can simply just extend the generic class, and implement it's own logic method.

## Polymorphism

Operators can have different forms, from logic gates to buttons.
Another example is nodes, both input- and output-nodes have very similarly behavior, with the key distinction that inputNodes can only have one wire, and outputNodes can have multiple. This mean that we can an abstract node class, and then inputs and outputs can implement their own methods according to their number of wires.
