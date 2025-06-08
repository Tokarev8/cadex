import { Pipe, PipeTransform } from '@angular/core';
import {MeshPosition} from '../models/three-geometry/primitive.model';

@Pipe({
  name: 'positionToString',
  pure: true, // default (оптимизация производительности)
  standalone: true
})
export class PositionToString implements PipeTransform {
  transform(value: MeshPosition): string {
    if (!value) return '';
    return `x:${value.x.toFixed()},y:${value.y.toFixed()}, z:${value.z.toFixed()}`;
  }
}

