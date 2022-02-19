import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";
import { Wire } from "./wire";

const size = 50;
const cycle = 1000;

// This is to prevent the wire being high for 1 frame
const activationTime = 50;

export class Clock extends GenericOperator {
  private lastTrigger: number = 0;

  constructor(
    pos: Vector,
  ) {
    super(pos, 0, 1);
  }

  override customDraw(): void {
    push();

    const deltaTime = millis() - this.lastTrigger;
    
    // Draw arc for the cycle, TWO_PI is the full circle
    const arcAngle = map(deltaTime, 0, cycle, 0, TWO_PI);
    stroke('#f9f9f9');
    strokeWeight(4);
    noFill();
    arc(this.pos.x, this.pos.y, size * 0.6, size * 0.6, 0, arcAngle);

    if(deltaTime > cycle - activationTime) { this.outputs[0].setStatus(Wire.HIGH) }
    else { this.outputs[0].setStatus(Wire.LOW) }

    if(deltaTime > cycle) this.lastTrigger = millis();

    pop();
  }

  logic(): void { }
}