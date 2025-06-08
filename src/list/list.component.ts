import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {GeometryPrimitive} from '../shared/models/three-geometry/primitive.model';
import {PositionToString} from '../shared/pipe/position-to-string.pipe';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'list',
  imports: [
    MatList,
    MatListItem,
    MatCardModule,
    MatButtonModule,
    PositionToString,
    NgStyle
  ],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  public geometryPrimitivesArray = input.required<GeometryPrimitive[]>();

  public addGroup = output<void>();
  public clearPrimitives = output<void>();
  public selectPrimitives = output<number>();
}
