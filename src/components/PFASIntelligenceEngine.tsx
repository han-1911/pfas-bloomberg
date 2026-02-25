import { useState } from 'react';
import {
  runPFASEngine,
  demoSpecies,
  demoMatrix,
  type PFASSpecies,
  type WaterMatrix,
  type EngineOutput,
  type OverallStatus,
} from '../data/pfasEngine';

const statusStyles: Record<OverallStatus, string> = {
  CRITICAL: 'badge-critical',
  CONDITIONAL: 'badge-conditional',
  PROCEED: 'badge-proceed',
};

const statusEmoji: Record<OverallStatus, string> = {
  CRITICAL: '🔴',
  CONDITIONAL: '🟡',
  PROCEED: '🟢',
};

function SpeciesTable({
  species,
  onChange,
  onAdd,
  onRemove,
}: {
  species: PFASSpecies[];
  onChange: (i: number, field: keyof PFASSpecies, val: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-bloomberg-muted uppercase tracking-wider">PFAS Species Input</span>
        <button
          onClick={onAdd}
          className="text-[10px] px-2 py-0.5 bg-bloomberg-cyan/10 text-bloomberg-cyan border border-bloomberg-cyan/30 rounded hover:bg-bloomberg-cyan/20"
        >
          + Add Species
        </button>
      </div>
      <div className="max-h-40 overflow-auto border border-bloomberg-border rounded">
        <table>
          <thead>
            <tr>
              <th className="w-36">Species</th>
              <th className="w-24">Conc.</th>
              <th className="w-20">Unit</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {species.map((s, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    value={s.name}
                    onChange={e => onChange(i, 'name', e.target.value)}
                    className="w-full"
                    placeholder="e.g. PFOA"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={s.concentration}
                    onChange={e => onChange(i, 'concentration', e.target.value)}
                    className="w-full"
                    step="any"
                  />
                </td>
                <td>
                  <select
                    value={s.unit || 'mg/L'}
                    onChange={e => onChange(i, 'unit', e.target.value)}
                    className="w-full"
                  >
                    <option>mg/L</option>
                    <option>µg/L</option>
                    <option>ng/L</option>
                    <option>ppm</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => onRemove(i)}
                    className="text-bloomberg-red/60 hover:text-bloomberg-red text-xs"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatrixInputs({
  matrix,
  onChange,
}: {
  matrix: WaterMatrix;
  onChange: (field: keyof WaterMatrix, val: string) => void;
}) {
  const fields: { key: keyof WaterMatrix; label: string; placeholder: string }[] = [
    { key: 'COD', label: 'COD (mg/L)', placeholder: '250' },
    { key: 'TOC', label: 'TOC (mg/L)', placeholder: '100' },
    { key: 'NO3_asN', label: 'NO₃ as N (mg/L)', placeholder: '10' },
    { key: 'NO2_asN', label: 'NO₂ as N (mg/L)', placeholder: '1' },
    { key: 'chloride', label: 'Cl⁻ (mg/L)', placeholder: '1000' },
    { key: 'fluoride', label: 'F⁻ (mg/L)', placeholder: '100' },
    { key: 'hardness', label: 'Hardness (ppm)', placeholder: '100' },
  ];

  return (
    <div>
      <div className="text-[10px] text-bloomberg-muted uppercase tracking-wider mb-1">Water Matrix Parameters</div>
      <div className="grid grid-cols-4 gap-1">
        {fields.map(f => (
          <div key={f.key} className="flex flex-col">
            <label className="text-[9px] text-bloomberg-muted mb-0.5">{f.label}</label>
            <input
              type="number"
              value={(matrix[f.key] as number) ?? ''}
              onChange={e => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              step="any"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsView({ output }: { output: EngineOutput }) {
  const [tab, setTab] = useState<'technical' | 'email'>('technical');

  return (
    <div className="space-y-2">
      {/* Status Badge */}
      <div className="flex items-center gap-3 bg-black/40 rounded p-2 border border-bloomberg-border/50">
        <span className="text-2xl">{statusEmoji[output.overallStatus]}</span>
        <div>
          <div className={`text-lg font-bold ${statusStyles[output.overallStatus]}`}>
            {output.overallStatus}
          </div>
          <div className="text-[10px] text-bloomberg-muted">Overall Pre-Feasibility Status</div>
        </div>
        <div className="ml-auto grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-bloomberg-cyan text-sm font-bold">{output.m1.totalPFAS.toFixed(4)}</div>
            <div className="text-[9px] text-bloomberg-muted">Total PFAS (mg/L)</div>
          </div>
          <div>
            <div className="text-bloomberg-amber text-sm font-bold">{output.m1.primarySet.length}</div>
            <div className="text-[9px] text-bloomberg-muted">Primary Species</div>
          </div>
          <div>
            <div className="text-bloomberg-green text-sm font-bold">{output.m2.flags.length}</div>
            <div className="text-[9px] text-bloomberg-muted">Flags</div>
          </div>
        </div>
      </div>

      {/* Flags */}
      {output.m2.flags.length > 0 && (
        <div className="space-y-1">
          {output.m2.flags.map((f, i) => {
            const cls = f.classification === 'CRITICAL' ? 'border-bloomberg-red/50 bg-bloomberg-red/5'
              : f.classification === 'PROCEED' ? 'border-bloomberg-green/50 bg-bloomberg-green/5'
              : 'border-bloomberg-amber/50 bg-bloomberg-amber/5';
            const textCls = f.classification === 'CRITICAL' ? 'text-bloomberg-red'
              : f.classification === 'PROCEED' ? 'text-bloomberg-green'
              : 'text-bloomberg-amber';
            return (
              <div key={i} className={`rounded border px-2 py-1 ${cls}`}>
                <span className={`text-[10px] font-bold ${textCls}`}>[{f.classification}]</span>
                <span className="text-[10px] text-bloomberg-muted ml-1">{f.ruleName}:</span>
                <span className="text-[10px] text-bloomberg-text ml-1">{f.message}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Matrix Results */}
      <div className="grid grid-cols-2 gap-1">
        {output.m3.results.map((r, i) => {
          const statusColor = r.status === 'acceptable' || r.status === 'manageable'
            ? 'text-bloomberg-green' : r.status === 'missing' ? 'text-bloomberg-muted' : 'text-bloomberg-amber';
          return (
            <div key={i} className="bg-black/20 rounded px-2 py-1 border border-bloomberg-border/30">
              <span className={`text-[10px] font-semibold ${statusColor}`}>{r.parameter}</span>
              <div className="text-[9px] text-bloomberg-muted">{r.message}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs: Technical / Business Email */}
      <div>
        <div className="flex border-b border-bloomberg-border">
          <button
            onClick={() => setTab('technical')}
            className={`px-3 py-1 text-[10px] ${tab === 'technical' ? 'text-bloomberg-cyan border-b-2 border-bloomberg-cyan' : 'text-bloomberg-muted'}`}
          >
            Technical Report
          </button>
          <button
            onClick={() => setTab('email')}
            className={`px-3 py-1 text-[10px] ${tab === 'email' ? 'text-bloomberg-cyan border-b-2 border-bloomberg-cyan' : 'text-bloomberg-muted'}`}
          >
            Business Email Draft
          </button>
        </div>
        <pre className="text-[10px] text-bloomberg-text bg-black/40 rounded p-2 mt-1 max-h-48 overflow-auto whitespace-pre-wrap font-mono leading-relaxed border border-bloomberg-border/30">
          {tab === 'technical' ? output.technicalSummary : output.businessEmailDraft}
        </pre>
      </div>
    </div>
  );
}

export default function PFASIntelligenceEngine() {
  const [species, setSpecies] = useState<PFASSpecies[]>([...demoSpecies]);
  const [matrix, setMatrix] = useState<WaterMatrix>({ ...demoMatrix });
  const [treatmentGoal, setTreatmentGoal] = useState('');
  const [output, setOutput] = useState<EngineOutput | null>(null);

  const handleSpeciesChange = (i: number, field: keyof PFASSpecies, val: string) => {
    const updated = [...species];
    if (field === 'concentration') {
      updated[i] = { ...updated[i], concentration: parseFloat(val) || 0 };
    } else {
      updated[i] = { ...updated[i], [field]: val };
    }
    setSpecies(updated);
  };

  const addSpecies = () => {
    setSpecies([...species, { name: '', concentration: 0, unit: 'mg/L' }]);
  };

  const removeSpecies = (i: number) => {
    setSpecies(species.filter((_, idx) => idx !== i));
  };

  const handleMatrixChange = (field: keyof WaterMatrix, val: string) => {
    setMatrix({ ...matrix, [field]: val === '' ? undefined : parseFloat(val) });
  };

  const runEngine = () => {
    const result = runPFASEngine({
      species: species.filter(s => s.name && s.concentration > 0),
      matrix,
      treatmentGoal: treatmentGoal || undefined,
    });
    setOutput(result);
  };

  const loadDemo = () => {
    setSpecies([...demoSpecies]);
    setMatrix({ ...demoMatrix });
    setTreatmentGoal('');
    setOutput(null);
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header">
        <span className="text-bloomberg-red">🧪 PFAS Intelligence Engine</span>
        <span className="text-[10px] text-bloomberg-muted">v1.0 — Material Intelligence</span>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {/* Input Section */}
        <SpeciesTable
          species={species}
          onChange={handleSpeciesChange}
          onAdd={addSpecies}
          onRemove={removeSpecies}
        />

        <MatrixInputs matrix={matrix} onChange={handleMatrixChange} />

        <div>
          <label className="text-[10px] text-bloomberg-muted uppercase tracking-wider">Treatment Goal (optional)</label>
          <input
            type="text"
            value={treatmentGoal}
            onChange={e => setTreatmentGoal(e.target.value)}
            placeholder="e.g., Remove PFOA/PFOS to < 4 ppt"
            className="w-full mt-0.5"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={runEngine}
            className="flex-1 py-1.5 bg-bloomberg-green/20 text-bloomberg-green border border-bloomberg-green/40 rounded text-xs font-bold hover:bg-bloomberg-green/30 transition-colors"
          >
            ▶ RUN SCREENING
          </button>
          <button
            onClick={loadDemo}
            className="px-3 py-1.5 bg-bloomberg-border/50 text-bloomberg-muted border border-bloomberg-border rounded text-xs hover:text-bloomberg-text"
          >
            Load Demo
          </button>
        </div>

        {/* Results */}
        {output && <ResultsView output={output} />}
      </div>
    </div>
  );
}
