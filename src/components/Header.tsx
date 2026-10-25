import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Zap } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

interface HeaderProps {
  onOrderClick: () => void;
  onTrackClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick, onTrackClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2.5 text-neutral-900 group">
            <div className="w-9 h-9 bg-neutral-900 text-amber-400 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0">
              FAUCON EXPRESS
            </span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a href="#services" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
              Nos Services
            </a>
            <a href="#calculateur" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
              Calculateur & Commande
            </a>
            <a href="#zones" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
              Zones de Niamey
            </a>
            <button 
              onClick={onTrackClick}
              className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Suivi de Colis
            </button>
            <a href="#commercants" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
              Espace Vendeurs
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${NIAMEY_PHONE_RAW}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{NIAMEY_PHONE}</span>
            </a>
            <button
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Commander un coursier
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`https://wa.me/${NIAMEY_PHONE_RAW}?text=Bonjour%20Faucon%20Express,%20je%20souhaite%20une%20livraison`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 text-emerald-600 bg-emerald-50 rounded-lg"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-neutral-100 flex flex-col gap-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Nos Services
            </a>
            <a
              href="#calculateur"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Calculateur & Commande
            </a>
            <a
              href="#zones"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Zones de Niamey
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTrackClick();
              }}
              className="text-left px-2 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Suivi de Colis
            </button>
            <a
              href="#commercants"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Espace Vendeurs
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${NIAMEY_PHONE_RAW}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-neutral-800 bg-neutral-100 rounded-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Appeler : {NIAMEY_PHONE}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderClick();
                }}
                className="w-full py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
              >
                Commander un coursier
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
