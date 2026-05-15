declare module 'react-force-graph-3d' {
  import type { ComponentType } from 'react';

  type ForceGraphProps = {
    graphData: { nodes: object[]; links: object[] };
    nodeLabel?: string;
    nodeColor?: (node: object) => string;
    linkColor?: () => string;
    backgroundColor?: string;
    width?: number;
    height?: number;
    showNavInfo?: boolean;
  };

  const ForceGraph3D: ComponentType<ForceGraphProps>;
  export default ForceGraph3D;
}
