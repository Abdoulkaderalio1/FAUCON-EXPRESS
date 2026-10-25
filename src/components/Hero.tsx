import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

interface HeroProps {
  onOrderClick: () => void;
  onExploreRatesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExploreRatesClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean unboxed category kicker (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-4">
              <span>Service de Coursiers Express</span>
              <span aria-hidden="true">·</span>
              <span>Niamey & Périphérie</span>
              <span aria-hidden="true">·</span>
              <span>7j / 7</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-neutral-900 tracking-tight leading-[1.12] mb-6" style={{ textWrap: 'balance' }}>
              Vos colis et plis livrés en un éclair partout à Niamey.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mb-8">
              Ramassage rapide, encaissement e-commerce (Cash on Delivery) sécurisé, plis administratifs urgents et courses du quotidien. Des coursiers qualifiés et équipés pour sillonner la capitale en toute sérénité.
            </p>

            {/* Decision Block: Single primary CTA + Direct Call button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Commander un coursier maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${NIAMEY_PHONE_RAW}`}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Appeler : {NIAMEY_PHONE}</span>
              </a>
            </div>

            {/* Trust points list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-600 pt-2 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paiement Espèces, Airtel Money & Moov Money</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reversement direct aux vendeurs le jour même</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-impact hero image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-100 aspect-16/10 sm:aspect-16/9 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_courier_niamey_1792952105880.jpg"
                alt="Coursier professionnel Faucon Express à Niamey"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback container in case of unexpected image issue
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              {/* Subtle glass float badge displaying live dispatch guarantee */}
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur-md text-white p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="font-medium">Flotte de coursiers active à Niamey</span>
                </div>
                <span className="font-mono text-amber-400 font-bold tabular-nums">7j/7 · 6h30-22h</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-column KPI strip below the hero split (spatial math & quantitative rigor) */}
        <div className="mt-14 pt-8 border-t border-neutral-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Clock className="w-4 h-4 text-neutral-700" />
              <span className="text-xs font-semibold uppercase tracking-wider">Rapidité</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              &lt; 45 min
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Délai moyen d'acheminement intra-urbain
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span className="text-xs font-semibold uppercase tracking-wider">Sécurité</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              100%
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Remise en main propre contre signature/reçu
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <Navigation className="w-4 h-4 text-neutral-700" />
              <span className="text-xs font-semibold uppercase tracking-wider">Couverture</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              5 Communes
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Rive Gauche & Rive Droite reliées sans rupture
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-neutral-500 mb-1">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span className="text-xs font-semibold uppercase tracking-wider">Tarif Transparent</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tabular-nums">
              dès 1 000 F
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              Pas de frais cachés, devis immédiat
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
