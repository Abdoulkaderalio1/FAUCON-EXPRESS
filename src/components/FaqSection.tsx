import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { NIAMEY_PHONE, NIAMEY_PHONE_RAW } from '../data/niameyLocations';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Comment passer commande pour un coursier Faucon Express ?',
      a: 'Vous pouvez utiliser directement le calculateur de cette page pour configurer votre course et l’envoyer sur WhatsApp en 1 clic, ou simplement nous appeler ou nous écrire au +227 99 61 40 98. Un coursier est mobilisé immédiatement dans votre quartier.'
    },
    {
      q: 'Comment fonctionne l’encaissement à la livraison (Cash on Delivery) pour les boutiques ?',
      a: 'Si vous vendez un produit, notre coursier récupère le paquet chez vous sans que vous n’ayez rien à avancer. Il livre le colis au client, perçoit le montant exact de votre marchandise en espèces ou Mobile Money, et vous reverse immédiatement les fonds sur votre numéro Airtel Money ou Moov Money.'
    },
    {
      q: 'Quels sont les moyens de paiement acceptés pour régler la livraison ?',
      a: 'Nous acceptons les espèces à la remise du colis, ainsi que les paiements électroniques locaux : Airtel Money et Moov Money au numéro +227 99 61 40 98.'
    },
    {
      q: 'Que faire si le destinataire n’a pas d’adresse postale ou de numéro de porte ?',
      a: 'C’est le cas le plus fréquent à Niamey ! Indiquez simplement un repère bien connu (ex : « face Grande Mosquée de Banifandou », « 100m derrière station Total Koira Kano », « près de l’école Mission ») ou partagez la position GPS du client via WhatsApp lors de la confirmation.'
    },
    {
      q: 'Quels sont vos horaires de travail à Niamey ?',
      a: 'Faucon Express opère 7 jours sur 7, de 6h30 à 22h00, y compris les week-ends et jours fériés. Pour des urgences médicales de nuit (pharmacies de garde), une permanence téléphonique reste joignable au +227 99 61 40 98.'
    },
    {
      q: 'Desservez-vous la Rive Droite et les zones périphériques ?',
      a: 'Absolument ! Nos coursiers franchissent le Pont Kennedy et le Pont Général Seyni Kountché pour desservir quotidiennement Harobanda, l’Université Abdou Moumouni, Kirkissoye, Goudel, et Saga.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            <span>Questions Fréquentes</span>
            <span aria-hidden="true">·</span>
            <span>Aide & Pratique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Tout savoir sur nos services à Niamey
          </h2>
          <p className="text-neutral-600 text-sm">
            Retrouvez les réponses aux questions les plus courantes de nos clients et marchands partenaires.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact help callout */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Une autre question ou une demande spéciale ?</h4>
            <p className="text-xs text-neutral-500 mt-0.5">
              Notre équipe d'assistance à Niamey vous répond en quelques minutes.
            </p>
          </div>
          <a
            href={`tel:${NIAMEY_PHONE_RAW}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>{NIAMEY_PHONE}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
