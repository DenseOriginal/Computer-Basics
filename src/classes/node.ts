import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { Status, Wire } from "./wire";

const radius = 15;

// This is stuff for creating a new wire between to nodes
let selectedNode: OutputNode | undefined;
function selectNode(node: InputNode | OutputNode): void {
  if(!selectedNode && node instanceof OutputNode) { selectedNode = node; return; }
  if(selectedNode && node instanceof OutputNode) { return; }
  if(!selectedNode) return;

  if(selectedNode && node instanceof InputNode) {
    const newWire = new Wire();
    newWire.connect(node, selectedNode);
  
    selectedNode = undefined;
  }

}

export class InputNode implements Drawable {
  private wire?: Wire;
  readonly id = Math.random().toString();

  get status(): Status { return this.wire?.status || Wire.LOW; }

  constructor(
    public pos: Vector
  ) {
    document.addEventListener('click', () => this.mouseClicked())
  }

  public connectWire(wire: Wire): void {
    this.wire = wire;
  }

  public draw(): void {
    push();

    noStroke();

    fill(selectedNode?.id == this.id ? '#395699' : '#677087');
    circle(this.pos.x, this.pos.y, radius);

    if(selectedNode?.id == this.id) {
      strokeWeight(4);
      stroke('#383838');
      line(this.pos.x, this.pos.y, mouseX, mouseY);
    }
    pop();
  }

  private mouseClicked() {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < radius) {
      selectNode(this);
    }
  }
}

export class OutputNode implements Drawable {
  private wires: Wire[] = [];
  readonly id = Math.random().toString();

  constructor(
    public pos: Vector
  ) {
    document.addEventListener('click', () => this.mouseClicked())
  }

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

    fill(selectedNode?.id == this.id ? '#395699' : '#677087');
    circle(this.pos.x, this.pos.y, radius);

    if(selectedNode?.id == this.id) {
      strokeWeight(4);
      stroke('#383838');
      line(this.pos.x, this.pos.y, mouseX, mouseY);
    }
    pop();
  }

  private mouseClicked() {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < radius) {
      selectNode(this);
    }
  }
}