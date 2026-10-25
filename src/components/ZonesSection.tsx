import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { NIAMEY_NEIGHBORHOODS, NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

interface ZonesSectionProps {
  onSelectZone: (zoneId: string) => void;
}

export const ZonesSection: React.FC<ZonesSectionProps> = ({ onSelectZone }) => {
  const [selectedCommune, setSelectedCommune] = useState<string>('all');

  const communes = [
    { id: 'all', label: 'Toutes les zones' },
    { id: 'Commune I', label: 'Commune I (Plateau, Yantala, Koira Kano)' },
    { id: 'Commune II', label: 'Commune II (Bobiel, Banifandou)' },
    { id: 'Commune III', label: 'Commune III (Wadata, Grand Marché)' },
    { id: 'Commune IV', label: 'Commune IV (Aéroport, Talladjé)' },
    { id: 'Commune V', label: 'Commune V (Harobanda Rive Droite)' },
  ];

  const filteredNeighborhoods = selectedCommune === 'all'
    ? NIAMEY_NEIGHBORHOODS
    : NIAMEY_NEIGHBORHOODS.filter(n => n.commune === selectedCommune);

  return (
    <section id="zones" className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            <span>Maillage Territorial</span>
            <span aria-hidden="true">·</span>
            <span>Niamey Intégral</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Zones & Quartiers desservis à Niamey
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Aucun quartier n'est laissé pour compte. Nos coursiers franchissent le Pont Kennedy et le Pont Général Seyni Kountché pour relier la Rive Gauche et la Rive Droite en continu.
          </p>
        </div>

        {/* Filter buttons for communes (Interactive filter tabs per zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-neutral-100 rounded-xl max-w-4xl">
          {communes.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCommune(c.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCommune === c.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Neighborhoods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNeighborhoods.map((n) => (
            <div
              key={n.id}
              className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="font-semibold text-neutral-700">{n.commune}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider">
                    {n.zone === 'rive_droite' ? 'Rive Droite' : n.zone === 'centre' ? 'Centre' : n.zone === 'peripherie' ? 'Périphérie' : 'Rive Gauche'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-neutral-900 mb-2">
                  {n.name}
                </h4>

                <div className="text-xs text-neutral-600 space-y-1">
                  <div className="font-medium text-neutral-800 text-[11px]">Repères desservis :</div>
                  <div className="flex flex-wrap gap-1">
                    {n.landmarks.map((l) => (
                      <span key={l} className="text-[11px] bg-white border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200/70 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono">Délai estimé : 30-45 min</span>
                <span className="font-bold text-neutral-900 font-mono">
                  {n.zone === 'rive_droite' || n.zone === 'peripherie' ? 'dès 1 500 F' : 'dès 1 000 F'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Special note for River Niger crossing */}
        <div className="mt-8 p-5 bg-amber-50/70 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Navigation className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-700">
              <span className="font-bold text-neutral-900">Liaison Rive Gauche & Rive Droite garantie : </span>
              Traversée rapide via le Pont Kennedy ou le Pont Chinois pour vos livraisons vers Harobanda, l'Université Abdou Moumouni ou Kirkissoye.
            </div>
          </div>
          <a
            href={`tel:${NIAMEY_PHONE_RAW}`}
            className="text-xs font-bold text-neutral-900 hover:text-amber-700 whitespace-nowrap shrink-0 inline-flex items-center gap-1"
          >
            <span>Questions de desserte ? {NIAMEY_PHONE}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
