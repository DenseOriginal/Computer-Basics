# Pseudocode

## GenericOperator constructor

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
