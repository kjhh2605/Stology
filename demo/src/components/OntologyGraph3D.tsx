import { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import type { Concept, ConceptLink } from '../types/demo';
import { Tooltip } from './Tooltip';

type GraphNode = Concept & { name: string; val: number; group: string; recordCount: number };
type GraphEndpoint = string | { id?: string };
type GraphLink = ConceptLink & { value: number; source: GraphEndpoint; target: GraphEndpoint };

type OntologyGraph3DProps = {
  concepts: Concept[];
  links: ConceptLink[];
  selectedConceptId: string | null;
  relatedConceptIds: Set<string>;
  onSelectConcept: (conceptId: string) => void;
  onClearSelection: () => void;
};

const fallbackPositions: Record<string, { x: number; y: number }> = {
  개념1: { x: 148, y: 165 },
  개념2: { x: 330, y: 205 },
  개념3: { x: 248, y: 320 },
  개념4: { x: 514, y: 142 },
  개념5: { x: 540, y: 330 },
  개념6: { x: 412, y: 278 },
  개념7: { x: 214, y: 82 },
  개념8: { x: 610, y: 248 },
};

export function OntologyGraph3D({
  concepts,
  links,
  selectedConceptId,
  relatedConceptIds,
  onSelectConcept,
  onClearSelection,
}: OntologyGraph3DProps) {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);
  const canvasClickSequence = useRef(0);
  const nodeClickSequence = useRef(0);
  const suppressNextCanvasClear = useRef(false);
  const graphData = {
    nodes: concepts.map<GraphNode>((concept) => {
      const recordCount = getRecordCount(concept);
      return {
        ...concept,
        recordCount,
        name: `${concept.label} · ${concept.stateLabel} · 기록 ${recordCount}`,
        val: getNodeSize(concept.id, concept.active, selectedConceptId, relatedConceptIds, recordCount),
        group: concept.active ? 'active' : 'template',
      };
    }),
    links: links.map<GraphLink>((link) => ({ ...link, value: 1 })),
  };

  useEffect(() => {
    setCanRender3D(canUseWebGL());
  }, []);

  const hasSelection = Boolean(selectedConceptId);
  const isHighlightedLink = (link: object) => isConnectedToSelected(link as GraphLink, selectedConceptId);
  const selectNode = (conceptId: string) => {
    nodeClickSequence.current = canvasClickSequence.current;
    suppressNextCanvasClear.current = true;
    window.setTimeout(() => {
      suppressNextCanvasClear.current = false;
    }, 140);
    onSelectConcept(conceptId);
  };
  const requestBackgroundClear = () => {
    if (suppressNextCanvasClear.current) {
      suppressNextCanvasClear.current = false;
      return;
    }
    const clickSequence = canvasClickSequence.current + 1;
    canvasClickSequence.current = clickSequence;
    window.setTimeout(() => {
      if (nodeClickSequence.current >= clickSequence) {
        suppressNextCanvasClear.current = false;
        return;
      }
      onClearSelection();
    }, 70);
  };

  return (
    <Tooltip
      id="tip-graph"
      title="지식 구조 그래프"
      body="그래프의 노드 자체를 클릭하면 해당 노드 정보 패널이 슬라이드 인되고, 연결된 관련 노드와 연결선이 강조됩니다."
      requirement="그래프 아래 별도 노드 버튼 목록 없이 그래프 노드 클릭과 배경 클릭만 선택/해제 트리거로 사용합니다."
    >
      <section className="graph-card" tabIndex={0}>
        <div className="graph-canvas" aria-label="3D ontology graph" onClickCapture={requestBackgroundClear}>
          {canRender3D ? (
            <ForceGraph3D
              graphData={graphData}
              nodeLabel="name"
              nodeThreeObject={(node) => createNodeObject(node as GraphNode, selectedConceptId, relatedConceptIds)}
              linkColor={(link) => (isHighlightedLink(link) ? '#111111' : hasSelection ? '#d9d9d9' : '#8a8a8a')}
              linkWidth={(link) => (isHighlightedLink(link) ? 4 : 1.7)}
              linkOpacity={0.98}
              linkDirectionalParticles={(link) => (isHighlightedLink(link) ? 2 : 0)}
              linkDirectionalParticleWidth={(link) => (isHighlightedLink(link) ? 3 : 0)}
              linkDirectionalParticleSpeed={() => 0.006}
              backgroundColor="#f8f8f8"
              width={700}
              height={430}
              showNavInfo={false}
              onNodeClick={(node) => selectNode((node as GraphNode).id)}
              onBackgroundClick={requestBackgroundClear}
            />
          ) : (
            <GraphFallbackCanvas
              concepts={concepts}
              links={links}
              selectedConceptId={selectedConceptId}
              relatedConceptIds={relatedConceptIds}
              onSelectConcept={selectNode}
              onClearSelection={onClearSelection}
            />
          )}
        </div>
        <GraphLegend />
      </section>
    </Tooltip>
  );
}

function GraphFallbackCanvas({
  concepts,
  links,
  selectedConceptId,
  relatedConceptIds,
  onSelectConcept,
  onClearSelection,
}: OntologyGraph3DProps) {
  return (
    <div className="graph-static-canvas" role="button" tabIndex={0} aria-label="2D graph fallback background" onClick={onClearSelection} onKeyDown={(event) => event.key === 'Escape' && onClearSelection()}>
      <svg className="graph-lines" viewBox="0 0 700 430" aria-hidden="true">
        {links.map((link) => {
          const source = fallbackPositions[link.source];
          const target = fallbackPositions[link.target];
          if (!source || !target) return null;
          const highlighted = selectedConceptId === link.source || selectedConceptId === link.target;
          return <line key={link.label} className={highlighted ? 'graph-line is-highlighted' : 'graph-line'} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />;
        })}
      </svg>
      {concepts.map((concept) => {
        const position = fallbackPositions[concept.id] ?? { x: 80, y: 80 };
        const selected = concept.id === selectedConceptId;
        const related = relatedConceptIds.has(concept.id);
        const dimmed = Boolean(selectedConceptId) && !selected && !related;
        const recordCount = getRecordCount(concept);
        return (
          <button
            type="button"
            key={concept.id}
            className={getStaticNodeClass(concept.active, selected, related, dimmed, recordCount)}
            style={{ left: position.x, top: position.y }}
            onClick={(event) => {
              event.stopPropagation();
              onSelectConcept(concept.id);
            }}
          >
            <span className="graph-node-dot" aria-hidden="true" />
            <span className="graph-node-label">{concept.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function GraphLegend() {
  return (
    <div className="graph-legend" aria-label="기록 수에 따른 노드 활성화 명암 범례">
      <span><i className="legend-dot level-0" />기록 0 · 대기</span>
      <span><i className="legend-dot level-1" />기록 1~2 · 활성</span>
      <span><i className="legend-dot level-2" />기록 3+ · 강한 활성</span>
      <span><i className="legend-line" />선택 노드 연결선</span>
    </div>
  );
}

function createNodeObject(node: GraphNode, selectedConceptId: string | null, relatedConceptIds: Set<string>) {
  const recordCount = getRecordCount(node);
  const selected = node.id === selectedConceptId;
  const related = relatedConceptIds.has(node.id);
  const dimmed = Boolean(selectedConceptId) && !selected && !related;
  const radius = selected ? 7.4 : related ? 6.4 : Math.max(4.4, Math.min(6.6, 4.2 + recordCount * 0.65));
  const group = new THREE.Group();
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 24, 24),
    new THREE.MeshBasicMaterial({ color: getNodeColor(node, selectedConceptId, relatedConceptIds), transparent: true, opacity: dimmed ? 0.36 : 1 }),
  );
  group.add(sphere);

  const label = createLabelSprite(node.label, dimmed ? '#a8a8a8' : '#111111');
  label.position.set(0, -radius - 8, 0);
  group.add(label);

  return group;
}

function createLabelSprite(label: string, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 192;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '700 28px Inter, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    context.fillText(label, canvas.width / 2, canvas.height / 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(30, 10, 1);
  return sprite;
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function getRecordCount(concept: Pick<Concept, 'id' | 'active' | 'evidenceIds'>) {
  if (!concept.active) return concept.evidenceIds.length;
  const numericId = Number(concept.id.replace(/[^0-9]/g, '')) || 1;
  return Math.max(concept.evidenceIds.length, Math.min(4, numericId));
}

function getNodeSize(nodeId: string, active: boolean, selectedConceptId: string | null, relatedConceptIds: Set<string>, recordCount: number) {
  if (nodeId === selectedConceptId) return 13;
  if (relatedConceptIds.has(nodeId)) return 10;
  return active ? Math.max(7, 6 + recordCount) : 5;
}

function getNodeColor(node: GraphNode, selectedConceptId: string | null, relatedConceptIds: Set<string>) {
  if (node.id === selectedConceptId) return '#111111';
  if (relatedConceptIds.has(node.id)) return '#3a3a3a';
  if (selectedConceptId) return '#d9d9d9';
  if (node.recordCount >= 3) return '#3a3a3a';
  if (node.recordCount >= 1) return '#6f6f6f';
  return '#a8a8a8';
}

function isConnectedToSelected(link: GraphLink, selectedConceptId: string | null) {
  if (!selectedConceptId) return false;
  return getEndpointId(link.source) === selectedConceptId || getEndpointId(link.target) === selectedConceptId;
}

function getEndpointId(endpoint: GraphEndpoint) {
  if (typeof endpoint === 'string') return endpoint;
  return endpoint.id ?? '';
}

function getStaticNodeClass(active: boolean, selected: boolean, related: boolean, dimmed: boolean, recordCount: number) {
  const classes = ['graph-node-button'];
  if (active) classes.push('is-active');
  if (recordCount >= 3) classes.push('record-high');
  else if (recordCount >= 1) classes.push('record-mid');
  else classes.push('record-empty');
  if (selected) classes.push('is-selected');
  if (related) classes.push('is-related');
  if (dimmed) classes.push('is-dimmed');
  return classes.join(' ');
}
