import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';
import {GeometryPrimitive} from '../shared/models/three-geometry/primitive.model';

@Component({
  selector: 'three-scene',
  imports: [],
  standalone: true,
  templateUrl: './three-scene.component.html',
  styleUrl: './three-scene.component.scss'
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateCameraAndRenderer();
  }

  @ViewChild('sceneContainer', { static: false }) containerRef!: ElementRef;

  public geometryPrimitivesArray = input.required<GeometryPrimitive[]>();

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;
  private widthContainer!: number;
  private heightContainer!: number;

  constructor() {
    effect(() => {
      const primitives = this.geometryPrimitivesArray().map(item=> item.element)
      if (this.scene) {
        primitives.length ? this.scene.add(...primitives) : this.scene.clear()
        this.render();
      }
    });
  }

  ngAfterViewInit():void {
    const container = this.containerRef.nativeElement;
    this.widthContainer = container.clientWidth;
    this.heightContainer = container.clientHeight;

    this.initThree();
    this.render();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }
  private initThree(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.widthContainer / this.heightContainer,
      0.1,
      100
    );

    this.camera.updateProjectionMatrix();
    this.camera.position.set(0, 0, 30);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.widthContainer, this.heightContainer);
    this.containerRef.nativeElement.appendChild(this.renderer.domElement);
  }

  private updateCameraAndRenderer(): void {
    this.camera.aspect = this.widthContainer / this.heightContainer;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.widthContainer, this.heightContainer);
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}

