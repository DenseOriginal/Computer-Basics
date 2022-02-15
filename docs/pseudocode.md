# Pseudocode

## GenericOperator constructor (Micro)

```txt
The constructor takes in 4 parameters: position, inputs, outputs & (label or width)
  IF were passed a label THEN
    SET width to textWidth of the label plus 40 pixels padding
  ELSE
    SET width to whatever we were passed in the constructor
    SET label to undefined
  
  Find which side has the most nodes
  SET height to amount of nodes times 25
  IF height is less than 50 pixels THEN
    SET height to 50 pixels

  Generate the right amount of inputs, and space them out correcly
  Generate the right amount of outputs, and space them out correcly

  END
```

## New operator event listener (Micro)

```txt
This event listener fires when the button 'New Operator' is clicked in the UI
  Prompt the user to enter a name for this new operator
  SET name to the users response

  IF name is empty THEN
    Alert the user that an operator cannot be created without a name
    Stop the execution of this event

  Copy all the current operators to somewhere, so that we can reference them later
  Remove all the operators from the screen, but keep them where we copied them to

  Create a new HTML Button element
  Insert that button in the DOM
  Setup event listener for the button, and create a combined operator when it's clicked

  END
```

## Flow through operators (Macro)

```text
Operators aren't connected directly to other operators.
Instead operators have nodes, which are connected with wires.

Wires can only connect to 1 inputNode & 1 outputNode
InputNodes can only have 1 wire (one to one releation: 1 Node <--> 1 Wire)
OuputNodes can have many wires (one to many releation: 1 Node <--> Many Wires)

InputNodes can only read status from wires
OutputNodes can only set status on wires

Example of an AND-gate's logic method that is being called every frame
  GET status from inputNode[1]
  GET status from inputNode[2]

  IF inputNode[1] AND inputNode[2] THEN
    SET outputNode[1] to true
  ELSE
    SET outputNode[1] to false
  
  END

In this example the logic method starts out by telling both inputNodes to read data from their respective wires
Then it simply checks if both wires are true
And if they are the code tells the outputNode to set all of it's wires to true
If the check returns false then the code tells the outputNode to set all of it's wires to false
```
