declare module 'react-force-graph-3d' {
  import type { ComponentType } from 'react';
  import type { Object3D } from 'three';

  type ForceGraphProps = {
    graphData: { nodes: object[]; links: object[] };
    nodeLabel?: string | ((node: object) => string);
    nodeColor?: (node: object) => string;
    nodeThreeObject?: (node: object) => Object3D;
    nodeThreeObjectExtend?: boolean;
    linkColor?: (link: object) => string;
    linkWidth?: number | ((link: object) => number);
    linkOpacity?: number;
    linkDirectionalParticles?: number | ((link: object) => number);
    linkDirectionalParticleWidth?: number | ((link: object) => number);
    linkDirectionalParticleSpeed?: number | ((link: object) => number);
    backgroundColor?: string;
    width?: number;
    height?: number;
    showNavInfo?: boolean;
    onNodeClick?: (node: object) => void;
    onBackgroundClick?: () => void;
  };

  const ForceGraph3D: ComponentType<ForceGraphProps>;
  export default ForceGraph3D;
}
