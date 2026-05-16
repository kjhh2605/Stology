import { useEffect, useMemo, useState } from 'react';
import { conceptLinks, materials } from '../../data/demoData';
import type { Concept } from '../../types/demo';
import { OntologyGraph3D } from '../../components/OntologyGraph3D';
import { Tooltip } from '../../components/Tooltip';

export function KnowledgeTab({ concepts }: { concepts: Concept[] }) {
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [lastPanelConceptId, setLastPanelConceptId] = useState<string | null>(null);
  const [panelCycle, setPanelCycle] = useState(0);
  const activeCount = concepts.filter((concept) => concept.active).length;
  const selectedConcept = concepts.find((concept) => concept.id === selectedConceptId) ?? null;
  const panelConcept = concepts.find((concept) => concept.id === (selectedConceptId ?? lastPanelConceptId)) ?? null;
  const relatedConceptIds = useMemo(() => getRelatedConceptIds(selectedConceptId), [selectedConceptId]);
  const panelRelatedConceptIds = useMemo(() => getRelatedConceptIds(panelConcept?.id ?? null), [panelConcept?.id]);
  const relatedConcepts = concepts.filter((concept) => panelRelatedConceptIds.has(concept.id));
  const selectedMaterials = panelConcept
    ? materials.filter((material) => material.evidenceConceptIds.includes(panelConcept.id) || panelConcept.evidenceIds.includes(material.id))
    : [];

  useEffect(() => {
    if (selectedConceptId) setLastPanelConceptId(selectedConceptId);
  }, [selectedConceptId]);
  const selectConcept = (conceptId: string) => {
    setSelectedConceptId(conceptId);
    setPanelCycle((current) => current + 1);
  };
  const clearSelection = () => setSelectedConceptId(null);

  return (
    <section className="tab-panel knowledge-tab" aria-label="지식 구조 탭">
      <Tooltip id="tip-knowledge-filter" title="지식 구조 필터" body="전체 활성 노드와 주차별 필터 기준을 확인하는 상단 필터입니다." requirement="STD_KG처럼 그래프 본문 위에 필터 줄을 먼저 배치합니다.">
        <div className="filter-row" tabIndex={0}>
          <strong>필터: 전체 활성 노드 보기</strong>
          <span>주차별 필터: 전체 ▼</span>
          <span className="status-chip">활성 노드 {activeCount} / 전체 {concepts.length}</span>
          {selectedConcept && <span className="status-chip strong-chip">선택 노드 {selectedConcept.label}</span>}
        </div>
      </Tooltip>

      <div className={selectedConcept ? 'kg-layout panel-open' : 'kg-layout'}>
        <div className="kg-graph-pane">
          <OntologyGraph3D
            concepts={concepts}
            links={conceptLinks}
            selectedConceptId={selectedConceptId}
            relatedConceptIds={relatedConceptIds}
            onSelectConcept={selectConcept}
            onClearSelection={clearSelection}
          />
          <p className="muted graph-caption">노드 클릭: 정보 패널 열기 / 그래프 배경 클릭: 선택 해제 / 관련 노드와 연결선 강조</p>
        </div>

        <Tooltip id="tip-node-detail" title="노드 정보 사이드패널" body="선택한 노드의 상태, Evidence, 관련 노드를 슬라이드 인 패널로 보여줍니다." requirement="노드 클릭 시 슬라이드 인, 그래프 배경 선택 시 슬라이드 아웃과 선택 해제가 동시에 일어나야 합니다.">
          <aside key={panelCycle} className={selectedConcept ? 'node-panel slide-panel is-open' : 'node-panel slide-panel'} aria-hidden={!selectedConcept} tabIndex={selectedConcept ? 0 : -1}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">STD_KG_PANEL_ACTIVE</p>
                <h2>{panelConcept?.label ?? '노드 정보'}</h2>
              </div>
              <button type="button" className="icon-button" onClick={clearSelection}>닫기</button>
            </div>
            {panelConcept ? (
              <>
                <article className="mini-card selected-node-card">
                  <strong>{panelConcept.label}</strong>
                  <span>{panelConcept.stateLabel}</span>
                  <small>Evidence: {panelConcept.evidenceIds.join(', ') || '아직 연결된 근거 없음'}</small>
                </article>
                <section className="side-panel-section">
                  <h3>관련 노드</h3>
                  <div className="pill-list">
                    {relatedConcepts.length > 0 ? relatedConcepts.map((concept) => (
                      <button type="button" className="pill-button is-highlighted" key={concept.id} onClick={() => selectConcept(concept.id)}>
                        {concept.label} · 연결됨
                      </button>
                    )) : <span className="pill">관련 노드 없음</span>}
                  </div>
                </section>
                <section className="side-panel-section">
                  <h3>원본 자료</h3>
                  <div className="pill-list">
                    {selectedMaterials.length > 0 ? selectedMaterials.map((material) => (
                      <span className="pill" key={material.id}>{material.id} · {material.status}</span>
                    )) : <span className="pill">근거 대기</span>}
                  </div>
                </section>
              </>
            ) : (
              <p className="muted">그래프에서 노드를 선택하면 정보가 표시됩니다.</p>
            )}
          </aside>
        </Tooltip>
      </div>
    </section>
  );
}

function getRelatedConceptIds(selectedConceptId: string | null) {
  const related = new Set<string>();
  if (!selectedConceptId) return related;

  conceptLinks.forEach((link) => {
    if (link.source === selectedConceptId) related.add(link.target);
    if (link.target === selectedConceptId) related.add(link.source);
  });

  return related;
}
