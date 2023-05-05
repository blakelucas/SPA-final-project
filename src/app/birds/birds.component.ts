import { Component, OnInit } from '@angular/core';
import { Engine, Render, Runner, Composites, Events, Common, World, Mouse, Body, Bodies, Constraint, MouseConstraint } from 'matter-js';

@Component({
  selector: 'app-birds',
  templateUrl: './birds.component.html',
  styleUrls: ['./birds.component.css']
})
export class BirdsComponent implements OnInit {
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
        background: 'rgb(38,70,83)'
      }
    });
    this.runner = Runner.create();
    this.stage1();
  }

  ngOnDestroy() {
    Render.stop(this.render);
    Runner.stop(this.runner);
    World.clear(this.engine.world, true);
    Engine.clear(this.engine);
    this.render.canvas.remove();
  }

  stage1() {
    //Structure
    let rect1 = Bodies.rectangle(1200, 340, 130, 15);
    let rect2 = Bodies.rectangle(1200, 470, 180, 15);
    let rect3 = Bodies.rectangle(1130, 580, 20, 120);
    let rect4 = Bodies.rectangle(1260, 550, 20, 120);
    let rect5 = Bodies.rectangle(1145, 440, 15, 120);
    let rect6 = Bodies.rectangle(1253, 440, 15, 120);

    var bird1 = Bodies.trapezoid(1200, 420, 50, 50, 1);
    var plat1 = Bodies.rectangle(1200, 600, 300, 20, {
      isStatic: true,
    })

    let ground = Bodies.rectangle(800, 765, 1620, 60, {
      isStatic: true,
    })

    let mouse = Mouse.create(this.render.canvas);
    let mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        render: {visible: false} // Hides click highlights
      }
    });

    this.render.mouse = mouse;

    // Create ball and sling to shoot
    let ball = Bodies.circle(300, 600, 20);
    let sling = Constraint.create({
      pointA: {x:300, y:600},
      bodyB: ball,
      stiffness: 0.05
    })

    let firing = false;
    Events.on(mouseConstraint, 'enddrag', function(e: any) {
      if (e.body === ball) firing = true;
    });
    Events.on(this.engine, 'afterUpdate', () => {
      if (firing && Math.abs(ball.position.x-300)<20 && Math.abs(ball.position.y-600)<20) {
        ball = Bodies.circle(300, 600, 20);
        World.add(this.engine.world, ball);
        sling.bodyB = ball;
        firing = false;
      }
    })

    // Creates stack of objects to knock over
    let stack = Composites.stack(1100, 150, 4, 8, 0, 0, function(x: number, y: number) {
      return Bodies.polygon(x,y,8,30);
    })
    World.add(this.engine.world, [ground, plat1, stack, ball, sling, mouseConstraint])
    
    // World.add(this.engine.world, [ground, rect1, rect2, rect3, rect4, rect5, rect6, plat1, bird1, ball, sling, mouseConstraint])

    Runner.run(this.engine)
    Render.run(this.render)
  }

  // restart() {
  //   Engine.clear(this.engine);
  // }

  // nextStage() {

  // }
}
