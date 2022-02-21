import { Vector } from 'p5';
import { getRandID } from '../helpers';
import { Drawable, HasID } from './interfaces';
import { Status, Wire } from './wire';

const radius = 15;

// This is stuff for creating a new wire between to nodes
let selectedOutputNode: OutputNode | undefined;
function selectNode(node: InputNode | OutputNode): void {
  if (node instanceof OutputNode) {
    // If the clicked node is an output
    // And we haven't selected an outputNode already
    // Then set selectedOutputNode to the node that was clicked on
    if (!selectedOutputNode) { selectedOutputNode = node; return; }

    // If the clicked node is the same node, that was already pressed
    // Then just cancel the selection
    if (selectedOutputNode.id == node.id) { selectedOutputNode = undefined; }
  } else {
    // If we have already selected an outputNode
    // And we have clicked an input node, then connect the two nodes with a wire
    if (selectedOutputNode) {
      new Wire().connect(node, selectedOutputNode);
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
abstract class GenericNode implements Drawable, HasID {
  readonly id = getRandID();
  get pos(): Vector { return this.parentPos.copy().add(this.relativePos); }

  constructor(
    private relativePos: Vector,
    private parentPos: Vector,
  ) {
    document.addEventListener('click', () => this.mouseClicked());
  }

  // Abstract methods for connecting and removing a wire
  // The input and output nodes will implement a slightly different method
  // This is because the output node can have multiple wires, and the input can only have 1
  public abstract connectWire(wire: Wire): void
  public abstract removeWire(wire: Wire): void

  abstract draw(): void;
  protected clickHandler(): void {} // Empty handler for clicking on the node (only used by output node)
  private mouseClicked() {
    const distSq = ((this.pos.x - mouseX) ** 2) + ((this.pos.y - mouseY) ** 2);
    const dist = Math.sqrt(distSq);

    if (dist < radius) {
      // If the mouse is over the node
      // Then call the clickHandler on this node
      // And call the selectNode function
      this.clickHandler();
      selectNode(this as unknown as InputNode | OutputNode);
    }
  }

  // Abstract method to remove all wires
  // This is because input and output nodes handle wires differently
  public abstract destroy(): void
}

export class InputNode extends GenericNode {
  private wire?: Wire;

  get status(): Status { return this.wire?.status || Wire.LOW; }

  public connectWire(wire: Wire): void {
    this.wire = wire;
  }

  public removeWire(wire: Wire): void {
    if (this.wire?.id == wire.id) {
      this.wire = undefined;
    }
  }

  public draw(): void {
    push();

    noStroke();

    fill('#677087');
    circle(this.pos.x, this.pos.y, radius);
    pop();
  }

  protected override clickHandler(): void {
    // Shift click to delete the node
    if (!selectedOutputNode && this.wire && keyCode == SHIFT) {
      this.wire.destroy();
    }
  }

  public destroy(): void {
    this.wire?.destroy();
  }
}

export class OutputNode extends GenericNode {
  private wires: Wire[] = [];

  public connectWire(wire: Wire): void {
    this.wires.push(wire);
  }

  public removeWire(wire: Wire): void {
    // When removing a wire, look through the wires array
    // And filter out the one with a matching id
    this.wires = this.wires.filter((w) => w.id != wire.id);
  }

  public flip(): void {
    // Simply flip all the wires
    this.wires.forEach((wire) => (wire.status = !wire.status));
  }

  public setStatus(status: Status): void {
    this.wires.forEach((wire) => (wire.status = status));
  }

  public draw(): void {
    push();

    noStroke();
    // Call the draw method on all it's wires
    this.wires.forEach((wire) => wire.draw());

    fill(selectedOutputNode?.id == this.id ? '#395699' : '#677087');
    circle(this.pos.x, this.pos.y, radius);

    // If this node is clicked, then highlight it with a different color
    // And draw a line from the node to the mouse
    if (selectedOutputNode?.id == this.id) {
      strokeWeight(4);
      stroke('#383838');
      line(this.pos.x, this.pos.y, mouseX, mouseY);
    }
    pop();
  }

  public destroy(): void {
    this.wires.forEach((wire) => wire.destroy());
  }
}
