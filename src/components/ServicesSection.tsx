import React from 'react';
import { ShoppingBag, FileText, Bus, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

interface ServicesSectionProps {
  onOrderClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="services" className="py-16 lg:py-24 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            <span>Prestations sur-mesure</span>
            <span aria-hidden="true">·</span>
            <span>Particuliers & Entreprises</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Des solutions adaptées aux réalités de Niamey
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Que vous soyez une boutique en ligne, une entreprise ou un particulier pressé, Faucon Express vous garantit ponctualité, intégrité du colis et communication permanente.
          </p>
        </div>

        {/* Bento Grid: Asymmetric 12-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1 (Span 7): E-commerce & Cash on Delivery (Hero Service with Image) */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="p-6 sm:p-8">
              <div className="text-xs font-semibold text-neutral-500 mb-2 font-mono">
                01. E-Commerce & Vente en Ligne
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
                Encaissement à la livraison (COD) et reversement immédiat
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Idéal pour les boutiques Instagram, TikTok et WhatsApp de Niamey. Notre coursier récupère votre article, le livre à votre acheteur, encaisse la somme convenue et vous transfère immédiatement l'argent sur votre compte Airtel Money ou Moov Money.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Reversement mobile money sans délai</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Suivi d'encaissement transparent</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Gestion des retours en cas d'absence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Tarif préférentiel multi-colis</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-16/9 w-full bg-neutral-100 overflow-hidden border-t border-neutral-100">
              <img
                src="/src/assets/images/ecommerce_delivery_handover_1792952106866.jpg"
                alt="Remise de colis e-commerce avec sourire à Niamey"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Card 2 (Span 5): Plis Administratifs & Documents d'Affaires */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-neutral-500 mb-2 font-mono">
                02. Documents & Plis Confidentiels
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Dépôts express aux ministères et institutions
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Transmission sécurisée d'appels d'offres, chèques, contrats de bail, passeports et courriers d'avocats. Remise contre signature et photo du cachet de décharge envoyé en direct sur votre WhatsApp.
              </p>

              <div className="space-y-2.5 text-xs text-neutral-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-neutral-900">· Plateau :</span>
                  <span>Sièges ministériels, banques (BCEAO, Sonibank, BOA, BIA), institutions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-neutral-900">· Yantala :</span>
                  <span>Ambassades, chancelleries et représentations internationales</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-neutral-900">· Récépissé :</span>
                  <span>Photo de la décharge horodatée transmise par WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer"
              >
                <span>Envoyer un pli urgent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 (Span 5): Courses gares routières & Hub transport */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="p-6 sm:p-8">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mb-4">
                <Bus className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-neutral-500 mb-2 font-mono">
                03. Gares Routières & Transit Intérieur
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Récupération & Envoi aux gares de Niamey
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Vous attendez un colis arrivant de Maradi, Zinder, Tahoua ou Agadez ? Ne perdez plus des heures dans les embouteillages : Faucon Express récupère votre colis à la gare (Rimbo, SNTV, STM, Azawad) et vous le dépose à domicile.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden border-t border-neutral-100">
              <img
                src="/src/assets/images/parcel_dispatch_hub_1792952106195.jpg"
                alt="Centrale de tri et colis en transit à Niamey"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Card 4 (Span 7): Courses d'urgence & Pharmacie de garde */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-neutral-500 mb-2 font-mono">
                04. Courses d'Urgence & Médical
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
                Pharmacie de garde & Achats urgents du quotidien
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Besoin d'un médicament en pleine nuit ou d'une pièce de dépannage urgente ? Nos coursiers se rendent à la pharmacie de garde la plus proche, avancent le coût ou utilisent votre Mobile Money, et vous livrent à votre chevet en moins de 35 minutes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                <div>
                  <div className="font-bold text-neutral-900 mb-0.5">Pharmacies</div>
                  <div className="text-neutral-500">Achat d'ordonnances urgentes de jour comme de nuit</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-900 mb-0.5">Pièces auto</div>
                  <div className="text-neutral-500">Dépannage atelier ou garage en urgence</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-900 mb-0.5">Alimentaire</div>
                  <div className="text-neutral-500">Traiteur et gâteaux délicats transportés à plat</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-neutral-500">
                Disponibilité continue 7 jours sur 7 à Niamey
              </span>
              <a
                href={`tel:${NIAMEY_PHONE_RAW}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Appel d'urgence : {NIAMEY_PHONE}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
