import { Component, OnInit, OnDestroy } from '@angular/core';
import { Engine, Render, Composites, Mouse, Events, Runner, World, Body, Bodies, Constraint, MouseConstraint } from 'matter-js';

@Component({
  selector: 'app-plinko',
  templateUrl: './plinko.component.html',
  styleUrls: ['./plinko.component.css']
})
export class PlinkoComponent implements OnInit {
  constructor() {}
  
  private engine!: Engine;
  private render!: Render;
  private runner!: Runner;
  private firing = false;

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
    this.plinko();
    // this.drawDots();
    this.drawPlinko();
  }

  ngOnDestroy() {
    Render.stop(this.render);
    Runner.stop(this.runner);
    World.clear(this.engine.world, true);
    Engine.clear(this.engine);
    this.render.canvas.remove();
  }

  plinko() {
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

    // // Create ball and sling to shoot
    // let ball = Bodies.circle(300, 600, 20);
    // let sling = Constraint.create({
    //   pointA: {x:300, y:600},
    //   bodyB: ball,
    //   stiffness: 0.05
    // })

    // // Creates stack of objects to knock over
    // let stack = Composites.stack(1100, 270, 4, 4, 0, 0, function(x: number, y: number) {
    //   return Bodies.polygon(x,y,8,30);
    // })

    // let firing = false;
    // Events.on(mouseConstraint, 'enddrag', function(e: any) {
    //   if (e.body === ball) firing = true;
    // });
    // Events.on(this.engine, 'afterUpdate', () => {
    //   if (firing && Math.abs(ball.position.x-300)<20 && Math.abs(ball.position.y-600)<20) {
    //     ball = Bodies.circle(300, 600, 20);
    //     World.add(this.engine.world, ball);
    //     // addBody(ball);
    //     sling.bodyB = ball;
    //     firing = false;
    //   }
    // })

    // Events.on(this.engine, 'afterUpdate', () =)
    
    World.add(this.engine.world, [ground, mouseConstraint])

    Runner.run(this.engine)
    Render.run(this.render)
  }

  dropBall() {
    World.add(this.engine.world, Bodies.circle(800, 0, 17))
  }

  drawDots() {
    World.add(this.engine.world, Bodies.circle(800, 100, 10, {
      isStatic: true
    }))
  }

  drawPlinko() {
    const numRows = 8;
    const numCols = 15;
    const dotSpacing = 70;
    const xOffset = (dotSpacing * (numCols - 1)) / 2 - 800;
    const yOffset = dotSpacing / 2 + 50;

    for (let row = 0; row < numRows; row++) {
      const y = row * dotSpacing + yOffset;
      const startX = row % 2 == 0 ? 0: dotSpacing / 2;
      for (let col = 0; col < numCols; col++) {
        const x = startX + col * dotSpacing - xOffset;
        const dot = Bodies.circle(x, y, 6, {
          isStatic: true,
          render: {
            fillStyle: '#999',
            strokeStyle: '#999',
            lineWidth: 1,
          },
        });
        World.add(this.engine.world, dot);
      }
    }

    const bucketWidth = 200 / numCols;

    // loop over each column and draw a rectangle below the dots
    for (let i = 0; i < numCols - 2; i++) {
      const x = (i + 0.5) * 100 + 170; // calculate the center x position
      const y = 800 - 150 / 2; // calculate the y position
      const bucket = Bodies.rectangle(x, y, bucketWidth, 100, {
        isStatic: true,
        render: {
          fillStyle: '#999',
          strokeStyle: '#aaa',
          lineWidth: 1
        }
      });
      World.add(this.engine.world, bucket);
    }
  }

  clearEnv() {
    Engine.clear(this.engine);
  }
}
