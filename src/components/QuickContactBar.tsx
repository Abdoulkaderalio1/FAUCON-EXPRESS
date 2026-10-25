import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

interface QuickContactBarProps {
  onOrderClick: () => void;
}

export const QuickContactBar: React.FC<QuickContactBarProps> = ({ onOrderClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 py-2.5 px-4 sm:hidden">
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        <a
          href={`tel:${NIAMEY_PHONE_RAW}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-neutral-800 active:bg-neutral-700 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Appeler</span>
        </a>

        <a
          href={`https://wa.me/${NIAMEY_PHONE_RAW}?text=Bonjour%20Faucon%20Express,%20je%20souhaite%20une%20livraison%20%C3%A0%20Niamey.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-600 active:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOrderClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-amber-400 active:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Commander</span>
        </button>
      </div>
    </div>
  );
};
