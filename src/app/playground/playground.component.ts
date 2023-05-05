import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Engine, Render, Runner, World, Mouse, Composites, Body, Bodies, Constraint, Vector, MouseConstraint } from 'matter-js';
// import { PlaygroundFormComponent } from '../playground-form/playground-form.component';
import { ObjectData } from '../playground-form/playground-form.component';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  
  @Input() type?: string;
  constructor() {}
  
  private engine!: Engine;
  private render!: Render;
  private runner!: Runner;

  ngOnInit() {
    this.engine = Engine.create();
    this.render = Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: 1600,
        height: 800,
        wireframes: false,
        background: 'rgb(38,70,83)',
      }
    });
    this.runner = Runner.create();
    this.play();
  }

  ngOnDestroy() {
    Render.stop(this.render);
    Runner.stop(this.runner);
    World.clear(this.engine.world, true);
    Engine.clear(this.engine);
    this.render.canvas.remove();
  }

  play() {
    let ground = Bodies.rectangle(800, 765, 1620, 60, {
      isStatic: true,
    })
    
    let boxA = Bodies.rectangle(400, 200, 160, 160);
    let ballA = Bodies.circle(380, 100, 40, {});
    let ballB = Bodies.circle(460, 10, 40, {});
    let poly1 = Bodies.polygon(500, 100, 3, 100);
    let poly2 = Bodies.polygon(660, 100, 5, 120);

    var stack1 = Composites.stack(250, 255, 1, 6, 0, 0, function(x: number, y: number) {
      return Bodies.rectangle(x, y, 30, 30);
    });

    // add bodies
    var group = Body.nextGroup(true);
    var catapult = Bodies.rectangle(400, 690, 320, 20, { collisionFilter: { group: group } });


    let stack = Composites.stack(1160, 300, 4, 4, 0, 0, function(x: number, y: number) {
      return Bodies.polygon(x,y,8,30);
    })

    let mouse = Mouse.create(this.render.canvas);
    let mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        render: {visible: false} // Hides click highlights
      }
    });

    this.render.mouse = mouse;
    
    World.add(this.engine.world, [boxA, ballA, ballB, catapult, poly1, poly2, stack, ground, mouseConstraint,
      // Bodies.rectangle(250, 720, 20, 50, { isStatic: true, render: { fillStyle: '#060a19' } }),
      Bodies.rectangle(400, 720, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } }), Constraint.create({ 
      bodyA: catapult, 
      pointB: Vector.clone(catapult.position),
      stiffness: 1,
      length: 0
  })])

    Runner.run(this.engine)
    Render.run(this.render)
  }

  newObject(data: ObjectData) {
    if (data.type == 'circle') {
      World.add(this.engine.world, Bodies.circle(800, 0, data.size!))
    }
    else if (data.type == 'rectangle') {
      World.add(this.engine.world, Bodies.rectangle(800, 0, data.w!, data.h!))
    }
    else if (data.type == 'polygon') {
      World.add(this.engine.world, Bodies.polygon(800, 0, data.vertices!, data.size!))
    }

  }

  // changeGravity(x: number, y: number) {
  //   this.xGravity = x;
  //   this.yGravity = y;
  //   this.engine.gravity.x = x;
  //   this.engine.gravity.y = y;
  // }

  // addBall() {
  //   let newBall = Bodies.circle(800, 100, 40)
  //   World.add(this.engine.world, [newBall])
  // }

  // addSquare() {
  //   let newSquare = Bodies.rectangle(800, 100, 80, 80);
  //   World.add(this.engine.world, [newSquare]);
  // }

  // addTrapezoid() {
  //   let newTrap = Bodies.trapezoid(800, 100, 80, 80, 2);
  //   World.add(this.engine.world, [newTrap]);
  // }

  clearEnv() {
    Engine.clear(this.engine);
  }
}
