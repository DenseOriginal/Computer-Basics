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
