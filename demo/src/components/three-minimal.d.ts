declare module 'three' {
  export class Object3D {
    position: { set: (x: number, y: number, z: number) => void };
    scale: { set: (x: number, y: number, z: number) => void };
    add: (object: Object3D) => void;
  }

  export class Group extends Object3D {}

  export class SphereGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }

  export class MeshBasicMaterial {
    constructor(parameters?: { color?: string; transparent?: boolean; opacity?: number });
  }

  export class Mesh extends Object3D {
    constructor(geometry: SphereGeometry, material: MeshBasicMaterial);
  }

  export class CanvasTexture {
    needsUpdate: boolean;
    constructor(canvas: HTMLCanvasElement);
  }

  export class SpriteMaterial {
    constructor(parameters?: { map?: CanvasTexture; transparent?: boolean; depthWrite?: boolean });
  }

  export class Sprite extends Object3D {
    constructor(material: SpriteMaterial);
  }
}
