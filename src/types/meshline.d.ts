import type { Object3DNode } from "@react-three/fiber";
import type { MeshLineGeometry, MeshLineMaterial } from "meshline";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

declare module "meshline" {
  import type { BufferGeometry, Material } from "three";

  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: Array<{ x: number; y: number; z: number }>): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: Record<string, unknown>);
  }
}

export {};
