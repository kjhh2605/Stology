import { conceptLinks, materials } from '../../data/demoData';
import type { Concept } from '../../types/demo';
import { OntologyGraph3D } from '../../components/OntologyGraph3D';

export function KnowledgeTab({ concepts }: { concepts: Concept[] }) {
  const activeCount = concepts.filter((concept) => concept.active).length;
  return (
    <section className="content-grid">
      <div className="panel wide">
        <h2>전체 온톨로지 템플릿</h2>
        <p>개념2~개념4는 누적 승인 자료로 이미 활성화되어 있고, 개념1은 자료1 검토 결과에 따라 바뀝니다.</p>
        <OntologyGraph3D concepts={concepts} links={conceptLinks} />
      </div>
      <aside className="panel">
        <h2>노드 상세</h2>
        <p className="metric">활성 노드 {activeCount} / 전체 {concepts.length}</p>
        {concepts.map((concept) => (
          <article className="mini-card" key={concept.id}>
            <strong>{concept.label}</strong>
            <span>{concept.stateLabel}</span>
            <small>근거: {concept.evidenceIds.join(', ') || '없음'}</small>
          </article>
        ))}
        <h3>관련 자료</h3>
        {materials.slice(0, 4).map((material) => <span className="pill" key={material.id}>{material.id} · {material.status}</span>)}
      </aside>
    </section>
  );
}
