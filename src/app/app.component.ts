import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaygroundFormComponent } from './playground-form/playground-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-proj';
  constructor(private router: Router) {}
  currentComponent = 'Home';
}
