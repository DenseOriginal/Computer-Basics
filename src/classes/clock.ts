import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { OutputNode } from "./node";
import { Wire } from "./wire";

const size = 50;
const cycle = 1000;

// This is to prevent the wire being high for 1 frame
const activationTime = 50;

export class Clock implements Drawable {
  public output: OutputNode;
  private lastTrigger: number = 0;

  constructor(
    public pos: Vector
  ) {
    this.output = new OutputNode(createVector(size / 1.7, 0), pos);
  }

  public draw(): void {
    push();

    rectMode(CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, size, size, 5, 5, 5, 5);

    const deltaTime = millis() - this.lastTrigger;
    
    // Draw arc for the cycle, TWO_PI is the full circle
    const arcAngle = map(deltaTime, 0, cycle, 0, TWO_PI);
    stroke('#f9f9f9');
    strokeWeight(4);
    noFill();
    arc(this.pos.x, this.pos.y, size * 0.6, size * 0.6, 0, arcAngle);

    if(deltaTime > cycle - activationTime) { this.output.setStatus(Wire.HIGH) }
    else { this.output.setStatus(Wire.LOW) }

    if(deltaTime > cycle) this.lastTrigger = millis();


    pop();

    this.output.draw();
  }
}