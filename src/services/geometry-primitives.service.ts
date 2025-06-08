import {Injectable, signal, WritableSignal} from '@angular/core';
import * as THREE from 'three';
import {
  GeometryPrimitive,
  MeshPosition,
  PrimitiveFormValue,
  PrimitiveType
} from '../shared/models/three-geometry/primitive.model';


@Injectable({
  providedIn: 'root'
})
export class GeometryPrimitivesService {

  public geometryPrimitives: WritableSignal<GeometryPrimitive[]> = signal([]);

  private positions: MeshPosition[] = [];
  private currentSelectedPrimitive!: GeometryPrimitive;

  public addPrimitives(newGeometryPrimitive: PrimitiveFormValue): void {
    const geometryPrimitivesArray: GeometryPrimitive[] = [];
    for (let i = 0; i < newGeometryPrimitive.quantity; i++) {
      geometryPrimitivesArray.push(this.createPrimitive(newGeometryPrimitive))
    }
    this.geometryPrimitives.set([...this.geometryPrimitives(),...geometryPrimitivesArray]);
  }

  public selectPrimitive(index: number):void {
    if (this.currentSelectedPrimitive) {
      this.currentSelectedPrimitive.selected = false;
      this.setPrimitiveColor(this.extractRGBFromColor(this.currentSelectedPrimitive.color));
      if (this.currentSelectedPrimitive.element.id === this.geometryPrimitives()[index].element.id) {
        return;
      }
    }

    this.currentSelectedPrimitive = this.geometryPrimitives()[index];
    this.currentSelectedPrimitive.selected = true;
    this.setPrimitiveColor([0.686,0.933,0.933]);
    this.geometryPrimitives.set([...this.geometryPrimitives()]);
  }

  public createPyramid(width: number, height: number, depth: number): THREE.BufferGeometry {
    const v0 = new THREE.Vector3(-width/2, 0, -depth/2);
    const v1 = new THREE.Vector3(width/2, 0, -depth/2);
    const v2 = new THREE.Vector3(width/2, 0, depth/2);
    const v3 = new THREE.Vector3(-width/2, 0, depth/2);

    const apex = new THREE.Vector3(0, height, 0);

    const vertices: THREE.Vector3[] = [v0, v1, v2, v3, apex];

    const indices: number[] = [
      0,1,2,
      0,2,3,
      0,1,4,
      1,2,4,
      2,3,4,
      3,0,4
    ];

    const positions: number[] = [];
    vertices.forEach(v => {
      positions.push(v.x,v.y,v.z);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
    geometry.setIndex(indices);

    geometry.computeVertexNormals();

    return geometry;
  }

  public clearPrimitives():void {
    this.geometryPrimitives.set([])
  }

  private setPrimitiveColor([r, g, b]: [number,number,number]):void {
    let material = this.currentSelectedPrimitive.element.material;
    if (Array.isArray(material)) {
      material.forEach(mat => {
        if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshBasicMaterial || mat instanceof THREE.MeshPhongMaterial) {
          mat.color.setRGB(r, g, b);
          mat.needsUpdate = true;
        }
      });
    } else {
      if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshPhongMaterial) {
        material.color.setRGB(r, g, b);
        material.needsUpdate = true;
      }
    }
  }

  private extractRGBFromColor(color: THREE.Color):[number,number,number]{
    let r = color.r
    let g = color.g
    let b = color.b
    return [r,g,b];
  }

  private generateUniquePosition(): MeshPosition {
    const minDistance = 2;
    let position: MeshPosition;
    let attempts = 0;
    const maxAttempts = 100;
    const range = 30;

    do {
      if (attempts > maxAttempts) {
        throw new Error("Не удалось найти свободную позицию");
      }
      const x = (Math.random() - 0.5) * range;
      const y = (Math.random() - 0.5) * range;
      const z = (Math.random() - 0.5) * range;
      position = { x, y, z };
      attempts++;
    } while (
      Array.from(this.positions).some(pos =>
        Math.sqrt((pos.x - position.x)**2 + (pos.y - position.y)**2 + (pos.z - position.z)**2) < minDistance
      )
      );

    this.positions.push(position);
    return position;
  }

  private createPrimitive(newPrimitive: PrimitiveFormValue): GeometryPrimitive {
    const color: THREE.Color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color});
    const geometry = newPrimitive.type === PrimitiveType.BOX
      ? new THREE.BoxGeometry(newPrimitive.width, newPrimitive.height, newPrimitive.length)
      : this.createPyramid(newPrimitive.width, newPrimitive.height, newPrimitive.length);
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);

    const edges: THREE.EdgesGeometry = new THREE.EdgesGeometry(geometry);
    //TODO Need add width line
    const borderMaterial = new THREE.LineBasicMaterial({color: 0x000000});
    const border = new THREE.LineSegments(edges, borderMaterial);
    mesh.add(border);

    let newPosition = this.generateUniquePosition();
    mesh.position.x = newPosition.x;
    mesh.position.y = newPosition.y;
    mesh.position.z = newPosition.z;

    return {
      width: newPrimitive.width ?? 1,
      height: newPrimitive.height ?? 1,
      length: newPrimitive.length ?? 1,
      type: newPrimitive.type ?? 'cube',
      title: newPrimitive.type,
      color: color,
      element: mesh,
    };
  }
}
