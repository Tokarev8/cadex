import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {ThreeSceneComponent} from '../three-scene/three-scene.component';
import {GeometryPrimitivesService} from '../services/geometry-primitives.service';
import {PopupComponent} from '../shared/popup/popup.component.ts';
import {PrimitiveFormValue} from '../shared/models/three-geometry/primitive.model';

@Component({
  selector: 'app-root',
  imports: [
    ListComponent,
    ThreeSceneComponent,
    PopupComponent,
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  public isPopupVisible: boolean = false;

  constructor(public geometryPrimitivesService:GeometryPrimitivesService) {}

  public openPopup() {
    this.isPopupVisible = true;
  }

  public addPrimitives(geometryPrimitives: PrimitiveFormValue) {
    this.isPopupVisible=false;
    this.geometryPrimitivesService.addPrimitives(geometryPrimitives)
  }

  public closePopup() {
    this.isPopupVisible = false;
  }
}
