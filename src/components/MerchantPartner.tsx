import React, { useState } from 'react';
import { Store, TrendingUp, CheckCircle, MessageSquare, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

export const MerchantPartner: React.FC = () => {
  const [dailyParcels, setDailyParcels] = useState<number>(5);

  // Approximate merchant economics calculation
  const monthlyDeliveries = dailyParcels * 26;
  const standardPrice = 1000;
  const discountedPrice = dailyParcels >= 15 ? 750 : dailyParcels >= 8 ? 850 : 900;
  const monthlySavings = (standardPrice - discountedPrice) * monthlyDeliveries;

  return (
    <section id="commercants" className="py-16 lg:py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <span>Partenariat Professionnel</span>
            <span aria-hidden="true">·</span>
            <span>E-Commerce & Boutiques</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            Vous vendez en ligne à Niamey ? Boostez vos ventes avec Faucon Express
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Le principal frein des acheteurs à Niamey est le manque de confiance et la lenteur de livraison. Nous sécurisons l'encaissement et livrons vos clients en moins d'une heure.
          </p>
        </div>

        {/* 2-Column Split: Simulator on Left, Advantages on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Simulator Box (Left, 7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-800/90 rounded-2xl border border-neutral-700 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2">
              Simulateur de grille tarifaire pour commerçants
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Ajustez votre volume estimé de colis par jour pour découvrir votre tarif partenaire privilégié.
            </p>

            {/* Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-neutral-300">Vos colis par jour :</span>
                <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                  {dailyParcels} colis / jour
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={dailyParcels}
                onChange={(e) => setDailyParcels(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1 font-mono">
                <span>1 colis</span>
                <span>10 colis</span>
                <span>20 colis</span>
                <span>30+ colis</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-neutral-900 rounded-xl border border-neutral-700/80 mb-6">
              <div>
                <div className="text-xs text-neutral-400">Tarif par course</div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                  {discountedPrice} F
                </div>
                <div className="text-[11px] text-emerald-400 mt-0.5">
                  -{standardPrice - discountedPrice} F d'économie
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-400">Volume mensuel estimé</div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                  {monthlyDeliveries}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">colis / mois</div>
              </div>

              <div>
                <div className="text-xs text-neutral-400">Économie mensuelle</div>
                <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
                  {monthlySavings.toLocaleString('fr-FR')} F
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">gagnés sur vos envois</div>
              </div>
            </div>

            {/* Direct Partner WhatsApp CTA */}
            <a
              href={`https://wa.me/${NIAMEY_PHONE_RAW}?text=Bonjour%20Faucon%20Express,%20je%20suis%20commer%C3%A7ant%20%C3%A0%20Niamey%20avec%20environ%20${dailyParcels}%20colis%20par%20jour.%20J'aimerais%20ouvrir%20un%20compte%20partenaire.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-sm transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ouvrir un compte commerçant via WhatsApp</span>
            </a>
          </div>

          {/* Partner Advantages (Right, 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 bg-neutral-800/60 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Reversement COD quotidien garanti</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Pas besoin d'attendre la fin du mois. Tout l'argent collecté chez vos clients vous est reversé le jour même par Airtel Money ou Moov Money.
              </p>
            </div>

            <div className="p-5 bg-neutral-800/60 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Tournées de ramassage fixes</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Notre coursier passe à votre boutique ou domicile à heures régulières (ex : 11h et 16h) pour récupérer tous vos colis prêts à partir.
              </p>
            </div>

            <div className="p-5 bg-neutral-800/60 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Zéro colis égaré</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Chaque paquet est scellé avec bordereau et signé par le destinataire. Responsabilité couverte à 100%.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
