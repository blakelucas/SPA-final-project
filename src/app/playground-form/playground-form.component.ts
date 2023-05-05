import { Component, Output, EventEmitter } from '@angular/core';
import { PlaygroundComponent } from '../playground/playground.component';

@Component({
  selector: 'app-playground-form',
  templateUrl: './playground-form.component.html',
  styleUrls: ['./playground-form.component.css']
})
export class PlaygroundFormComponent {
  @Output() objectCreated = new EventEmitter<ObjectData>();
  
  type!: string;
  size?: number;
  width?: number;
  height?: number;
  vertices?: number;

  submitted = false;
  onSubmit() {
    const data: ObjectData = {
      type: this.type,
      size: this.size,
      w: this.width,
      h: this.height,
      vertices: this.vertices
    }
    this.objectCreated.emit(data);
  }

  isSizeDisabled(): boolean {
    return this.type !== 'circle' && this.type !== 'polygon';
  }

  isWidthDisabled(): boolean {
    return this.type !== 'rectangle';
  }

  isHeightDisabled(): boolean {
    return this.type !== 'rectangle';
  }

  isVerticesDisabled(): boolean {
    return this.type !== 'polygon';
  }
}

export interface ObjectData {
  type: string;
  size?: number;
  w?: number;
  h?: number;
  vertices?: number;
}
