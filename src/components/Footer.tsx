import React from 'react';
import { Phone, MessageCircle, MapPin, Zap } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-neutral-600 border-t border-neutral-200 pt-12 pb-24 sm:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-200">
          
          {/* Col 1: Wordmark & Presentation */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-neutral-900 text-amber-400 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              </div>
              <span className="text-base font-extrabold text-neutral-900 tracking-tight">
                FAUCON EXPRESS
              </span>
            </div>
            <p className="text-neutral-500 max-w-sm leading-relaxed">
              Service professionnel de livraison urbaine à Niamey, Niger. Acheminement de plis confidentiels, colis e-commerce, courses de santé et encaissements à la livraison (COD).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="font-semibold text-neutral-700">Paiements locaux :</span>
              <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-800 font-medium">Espèces</span>
              <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded font-bold">Airtel Money</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-bold">Moov Money</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Services & Zones
            </div>
            <ul className="space-y-1.5 text-neutral-500">
              <li><a href="#services" className="hover:text-neutral-900 transition-colors">Livraison E-commerce & COD</a></li>
              <li><a href="#services" className="hover:text-neutral-900 transition-colors">Plis & Documents urgents</a></li>
              <li><a href="#services" className="hover:text-neutral-900 transition-colors">Courses gares routières</a></li>
              <li><a href="#zones" className="hover:text-neutral-900 transition-colors">Communes I, II, III, IV, V</a></li>
              <li><a href="#zones" className="hover:text-neutral-900 transition-colors">Traversée Rive Droite</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-2.5">
            <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Centrale de Dispatch
            </div>
            <div className="space-y-2">
              <a
                href={`tel:${NIAMEY_PHONE_RAW}`}
                className="flex items-center gap-2 text-neutral-800 font-semibold hover:text-amber-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{NIAMEY_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${NIAMEY_PHONE_RAW}?text=Bonjour%20Faucon%20Express,%20je%20souhaite%20une%20livraison`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-800 font-semibold hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp : +227 99 61 40 98</span>
              </a>
              <div className="flex items-start gap-2 text-neutral-500 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Niamey, République du Niger · 7j/7 de 6h30 à 22h00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} FAUCON EXPRESS Niamey. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span>Fiabilité · Rapidité · Confidentialité</span>
            <span aria-hidden="true">·</span>
            <span>Niamey, Niger</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
