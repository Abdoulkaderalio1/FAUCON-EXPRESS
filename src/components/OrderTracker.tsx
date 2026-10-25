import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  User, 
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DeliveryOrder, DeliveryStatus } from '../types/delivery';
import { DEMO_TRACKING_ORDERS, NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

interface OrderTrackerProps {
  ordersList: Record<string, DeliveryOrder>;
  activeOrderId?: string;
  onClose?: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ 
  ordersList, 
  activeOrderId,
  onClose 
}) => {
  const [searchQuery, setSearchQuery] = useState(activeOrderId || 'FCX-227-4819');
  const [searchedId, setSearchedId] = useState(activeOrderId || 'FCX-227-4819');

  // Combined orders lookup: dynamic orders first, then demo orders
  const allOrders = { ...DEMO_TRACKING_ORDERS, ...ordersList };
  const currentOrder = allOrders[searchedId.trim().toUpperCase()];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchedId(searchQuery.trim().toUpperCase());
    }
  };

  const stepsList: { status: DeliveryStatus; label: string; desc: string }[] = [
    {
      status: 'enregistree',
      label: 'Commande enregistrée',
      desc: 'Demande reçue par la centrale de dispatch Faucon Express'
    },
    {
      status: 'coursier_assigne',
      label: 'Coursier assigné',
      desc: 'Le coursier le plus proche a pris en charge la mission'
    },
    {
      status: 'colis_recupere',
      label: 'Colis récupéré',
      desc: 'Ramassage effectué au lieu de départ avec vérification du paquet'
    },
    {
      status: 'en_route_livraison',
      label: 'En cours d\'acheminement',
      desc: 'Le coursier fait route vers le quartier du destinataire'
    },
    {
      status: 'livre',
      label: 'Livré avec accusé de réception',
      desc: 'Colis remis en main propre (et encaissement si e-commerce)'
    }
  ];

  const getStatusIndex = (status: DeliveryStatus) => {
    switch (status) {
      case 'enregistree': return 0;
      case 'coursier_assigne': return 1;
      case 'en_cours_ramassage': return 1;
      case 'colis_recupere': return 2;
      case 'en_route_livraison': return 3;
      case 'livre': return 4;
      default: return 0;
    }
  };

  const currentStepIndex = currentOrder ? getStatusIndex(currentOrder.currentStatus) : 0;

  return (
    <section id="suivi" className="py-16 lg:py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span>Traçabilité & Transparence</span>
            <span aria-hidden="true">·</span>
            <span>Niamey en direct</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            Suivi de votre course en temps réel
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Entrez votre référence de suivi (ex : <span className="font-mono text-amber-400">FCX-227-XXXX</span>) pour localiser votre colis et vérifier l'étape de remise.
          </p>
        </div>

        {/* Search input bar */}
        <div className="max-w-2xl mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Entrez votre numéro (ex: FCX-227-4819)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-neutral-800 text-white placeholder-neutral-500 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Rechercher le colis
            </button>
          </form>

          {/* Quick test buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-neutral-400">
            <span>Tester des exemples actifs :</span>
            {['FCX-227-4819', 'FCX-227-3920', 'FCX-227-5102'].map((demoId) => (
              <button
                key={demoId}
                onClick={() => {
                  setSearchQuery(demoId);
                  setSearchedId(demoId);
                }}
                className={`font-mono px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  searchedId === demoId
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {demoId}
              </button>
            ))}
          </div>
        </div>

        {/* Search Result */}
        {currentOrder ? (
          <div className="bg-neutral-800/90 rounded-2xl border border-neutral-700 p-6 sm:p-8 max-w-4xl">
            
            {/* Top metadata summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-700">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-amber-400">
                    {currentOrder.id}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-neutral-700 text-neutral-200">
                    {currentOrder.packageType}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Enregistré le {currentOrder.createdAt} · Niamey
                </p>
              </div>

              <div className="text-right sm:text-right">
                <div className="text-xs text-neutral-400">Statut actuel</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400 flex items-center sm:justify-end gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span>{stepsList[currentStepIndex].label}</span>
                </div>
              </div>
            </div>

            {/* Route Details Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-4 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs">
              <div>
                <div className="text-neutral-400 font-semibold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lieu de Ramassage</span>
                </div>
                <div className="font-bold text-neutral-100">{currentOrder.senderNeighborhood}</div>
                <div className="text-neutral-400 mt-0.5">Repère : {currentOrder.senderLandmark}</div>
                <div className="text-neutral-400">Contact : {currentOrder.senderName}</div>
              </div>

              <div>
                <div className="text-neutral-400 font-semibold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lieu de Livraison</span>
                </div>
                <div className="font-bold text-neutral-100">{currentOrder.recipientNeighborhood}</div>
                <div className="text-neutral-400 mt-0.5">Repère : {currentOrder.recipientLandmark}</div>
                <div className="text-neutral-400">Client : {currentOrder.recipientName}</div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">
                Progression de l'acheminement
              </h4>

              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-700">
                {stepsList.map((step, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={step.status} className="relative flex items-start gap-4">
                      {/* Step marker */}
                      <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-amber-400 text-neutral-950 ring-4 ring-amber-400/20'
                          : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      {/* Step text */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${
                            isCurrent ? 'text-amber-400' : isDone ? 'text-white' : 'text-neutral-500'
                          }`}>
                            {step.label}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                              En cours
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${isCurrent ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier & Dispatch Contact Box */}
            <div className="mt-8 pt-6 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-amber-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Coursier référent</div>
                  <div className="text-sm font-bold text-white">
                    {currentOrder.courierName || 'Coursier Faucon Express'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${NIAMEY_PHONE_RAW}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-xs font-semibold text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Centrale : {NIAMEY_PHONE}</span>
                </a>

                <a
                  href={`https://wa.me/${NIAMEY_PHONE_RAW}?text=Bonjour%20Faucon%20Express,%20question%20au%20sujet%20du%20colis%20${currentOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-semibold text-white transition-colors"
                >
                  <span>WhatsApp direct</span>
                </a>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-neutral-800/60 rounded-2xl border border-neutral-700 p-8 max-w-xl text-center">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">
              Aucun colis trouvé pour "{searchedId}"
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Vérifiez la référence saisie ou contactez la centrale Faucon Express par téléphone au {NIAMEY_PHONE}.
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setSearchQuery('FCX-227-4819');
                  setSearchedId('FCX-227-4819');
                }}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-xs font-medium text-white"
              >
                Afficher l'exemple FCX-227-4819
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
