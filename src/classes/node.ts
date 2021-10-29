import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { Status, Wire } from "./wire";

const radius = 15;

// This is stuff for creating a new wire between to nodes
let outputNode: OutputNode | undefined;
function selectNode(node: InputNode | OutputNode): void {
  if(node instanceof OutputNode) {
    
    if(!outputNode) { outputNode = node; return; }
    if(outputNode.id == node.id) { outputNode = undefined; }

  } else {

    if(outputNode) {
      new Wire().connect(node, outputNode);
      outputNode = undefined;
    }

  }
}

abstract class GenericNode implements Drawable {
  readonly id = Math.random().toString();
  get pos(): Vector { return this.parentPos.copy().add(this.relativePos); }

  constructor(
    private relativePos: Vector,
    private parentPos: Vector,
  ) {
    document.addEventListener('click', () => this.mouseClicked());
  }

  public abstract connectWire(wire: Wire): void

  abstract draw(): void;
  private mouseClicked() {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < radius) {
      selectNode(this as unknown as InputNode | OutputNode);
    }
  }
}

export class InputNode extends GenericNode {
  private wire?: Wire;

  get status(): Status { return this.wire?.status || Wire.LOW; }

  public connectWire(wire: Wire): void {
    this.wire = wire;
  }

  public draw(): void {
    push();

    noStroke();

    fill('#677087');
    circle(this.pos.x, this.pos.y, radius);
    pop();
  }
}

export class OutputNode extends GenericNode {
  private wires: Wire[] = [];

  public connectWire(wire: Wire): void {
    this.wires.push(wire);
  }

  public flip(): void {
    this.wires.forEach(wire => wire.status = !wire.status);
  }

  public setStatus(status: Status): void {
    this.wires.forEach(wire => wire.status = status);
  }

  public draw(): void {
    push();

    noStroke();
    this.wires.forEach(wire => wire.draw());

    fill(outputNode?.id == this.id ? '#395699' : '#677087');
    circle(this.pos.x, this.pos.y, radius);

    if(outputNode?.id == this.id) {
      strokeWeight(4);
      stroke('#383838');
      line(this.pos.x, this.pos.y, mouseX, mouseY);
    }
    pop();
  }
}