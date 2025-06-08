import * as THREE from 'three';

export enum PrimitiveType {
  BOX = "Box",
  PYRAMID = "Pyramid"
}

export interface MeshPosition {
  x: number;
  y: number;
  z: number;
}

export interface PrimitiveParameters {
  width: number;
  height: number;
  length: number;
  type: string;
}

export interface PrimitiveFormValue extends PrimitiveParameters {
  quantity: number;
}

export interface GeometryPrimitive extends PrimitiveParameters {
  id?: number;
  selected?: boolean;
  title: string,
  color: THREE.Color,
  element: THREE.Mesh;
}
