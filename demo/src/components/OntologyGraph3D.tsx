import ForceGraph3D from 'react-force-graph-3d';
import type { Concept, ConceptLink } from '../types/demo';
import { Tooltip } from './Tooltip';

type GraphNode = Concept & { name: string; val: number; group: string };
type GraphLink = ConceptLink & { value: number };

export function OntologyGraph3D({ concepts, links }: { concepts: Concept[]; links: ConceptLink[] }) {
  const graphData = {
    nodes: concepts.map<GraphNode>((concept) => ({
      ...concept,
      name: `${concept.label} · ${concept.stateLabel}`,
      val: concept.active ? 8 : 4,
      group: concept.active ? 'active' : 'template',
    })),
    links: links.map<GraphLink>((link) => ({ ...link, value: 1 })),
  };

  return (
    <Tooltip
      id="tip-graph"
      title="지식 구조"
      body="전체 온톨로지 템플릿과 누적 활성 개념을 함께 보여줍니다."
      requirement="3D 그래프는 어댑터로 분리하고 WebGL 실패 시 하단 목록으로 상태를 확인합니다."
    >
      <section className="graph-card" tabIndex={0}>
        <div className="graph-canvas" aria-label="3D ontology graph">
          <ForceGraph3D
            graphData={graphData}
            nodeLabel="name"
            nodeColor={(node) => ((node as GraphNode).active ? '#111111' : '#8a8a8a')}
            linkColor={() => '#b8b8b8'}
            backgroundColor="#f8f8f8"
            width={620}
            height={360}
            showNavInfo={false}
          />
        </div>
        <div className="graph-fallback" aria-label="Graph state fallback list">
          {concepts.map((concept) => (
            <span key={concept.id} className={concept.active ? 'pill pill-strong' : 'pill'}>
              {concept.label} · {concept.stateLabel} · 근거 {concept.evidenceIds.join(', ') || '없음'}
            </span>
          ))}
        </div>
      </section>
    </Tooltip>
  );
}
