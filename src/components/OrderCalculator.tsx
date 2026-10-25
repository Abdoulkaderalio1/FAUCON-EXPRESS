import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MapPin, 
  Package, 
  Clock, 
  Banknote, 
  Phone, 
  Send, 
  CheckCircle, 
  Check, 
  Copy, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  NIAMEY_NEIGHBORHOODS, 
  PACKAGE_TYPES, 
  NIAMEY_PHONE, 
  NIAMEY_PHONE_RAW,
  calculateDeliveryPrice 
} from '../data/niameyLocations';
import { DeliveryOrder, PaymentMethod } from '../types/delivery';

interface OrderCalculatorProps {
  onOrderCreated: (order: DeliveryOrder) => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderCalculator: React.FC<OrderCalculatorProps> = ({ 
  onOrderCreated,
  onTrackOrder 
}) => {
  // Form fields
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderNeighborhood, setSenderNeighborhood] = useState('koira_kano');
  const [senderLandmark, setSenderLandmark] = useState('');

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientNeighborhood, setRecipientNeighborhood] = useState('plateau');
  const [recipientLandmark, setRecipientLandmark] = useState('');

  const [packageTypeId, setPackageTypeId] = useState('standard');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [isCod, setIsCod] = useState(false);
  const [codAmount, setCodAmount] = useState('15000');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [notes, setNotes] = useState('');

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<DeliveryOrder | null>(null);
  const [copied, setCopied] = useState(false);

  // Price Calculation
  const priceDetails = useMemo(() => {
    return calculateDeliveryPrice(
      senderNeighborhood,
      recipientNeighborhood,
      packageTypeId,
      urgency
    );
  }, [senderNeighborhood, recipientNeighborhood, packageTypeId, urgency]);

  const selectedSenderObj = useMemo(() => {
    return NIAMEY_NEIGHBORHOODS.find(n => n.id === senderNeighborhood);
  }, [senderNeighborhood]);

  const selectedRecipientObj = useMemo(() => {
    return NIAMEY_NEIGHBORHOODS.find(n => n.id === recipientNeighborhood);
  }, [recipientNeighborhood]);

  const selectedPackageObj = useMemo(() => {
    return PACKAGE_TYPES.find(p => p.id === packageTypeId);
  }, [packageTypeId]);

  const handleValidation = () => {
    const errs: Record<string, string> = {};
    if (!senderName.trim()) errs.senderName = 'Veuillez indiquer votre nom ou nom de boutique';
    if (!senderPhone.trim()) errs.senderPhone = 'Numéro de téléphone requis';
    if (!senderLandmark.trim()) errs.senderLandmark = 'Précisez un repère (ex: face pharmacie, carrefour)';
    if (!recipientName.trim()) errs.recipientName = 'Nom du destinataire requis';
    if (!recipientPhone.trim()) errs.recipientPhone = 'Numéro du destinataire requis';
    if (!recipientLandmark.trim()) errs.recipientLandmark = 'Précisez un repère pour la livraison';

    if (isCod) {
      const parsedCod = parseInt(codAmount.replace(/\s+/g, ''), 10);
      if (isNaN(parsedCod) || parsedCod <= 0) {
        errs.codAmount = 'Montant à encaisser invalide';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateWhatsAppMessage = (order: DeliveryOrder) => {
    const lines = [
      `*NOUVELLE DEMANDE DE LIVRAISON - FAUCON EXPRESS NIAMEY*`,
      `📦 *Réf de suivi :* ${order.id}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📍 *1. RAMASSAGE (DÉPART)*`,
      `• Expéditeur : ${order.senderName} (${order.senderPhone})`,
      `• Quartier : ${order.senderNeighborhood}`,
      `• Repère : ${order.senderLandmark}`,
      ``,
      `🎯 *2. LIVRAISON (ARRIVÉE)*`,
      `• Destinataire : ${order.recipientName} (${order.recipientPhone})`,
      `• Quartier : ${order.recipientNeighborhood}`,
      `• Repère : ${order.recipientLandmark}`,
      ``,
      `📋 *3. DÉTAILS DU COLIS*`,
      `• Type : ${order.packageType}`,
      `• Formule : ${order.urgency === 'express' ? '⚡ EXPRESS (< 45 min)' : 'Standard (< 90 min)'}`,
      order.codAmount > 0 ? `• 💰 *Montant à encaisser (COD) :* ${order.codAmount.toLocaleString('fr-FR')} FCFA` : `• Sans encaissement (Déjà réglé)`,
      `• Mode règlement course : ${order.paymentMethod === 'cash' ? 'Espèces' : order.paymentMethod === 'airtel' ? 'Airtel Money' : 'Moov Money'}`,
      order.notes ? `• Note : ${order.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━`,
      `💵 *Tarif de la course :* ${order.estimatedPrice.toLocaleString('fr-FR')} FCFA`,
      ``,
      `Merci d'assigner un coursier rapidement !`
    ];

    return encodeURIComponent(lines.filter(l => l !== '').join('\n'));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    const orderId = `FCX-227-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: DeliveryOrder = {
      id: orderId,
      senderName,
      senderPhone,
      senderNeighborhood: selectedSenderObj?.name || senderNeighborhood,
      senderLandmark,
      recipientName,
      recipientPhone,
      recipientNeighborhood: selectedRecipientObj?.name || recipientNeighborhood,
      recipientLandmark,
      packageType: selectedPackageObj?.label || 'Colis',
      packageDescription: notes || selectedPackageObj?.description || '',
      codAmount: isCod ? parseInt(codAmount.replace(/\s+/g, ''), 10) || 0 : 0,
      paymentMethod,
      urgency,
      notes,
      estimatedPrice: priceDetails.total,
      createdAt: 'À l’instant',
      currentStatus: 'enregistree'
    };

    onOrderCreated(newOrder);
    setCompletedOrder(newOrder);
  };

  const copyOrderDetails = () => {
    if (!completedOrder) return;
    const summary = `Commande Faucon Express: ${completedOrder.id}\nDe: ${completedOrder.senderNeighborhood} (${completedOrder.senderLandmark})\nVers: ${completedOrder.recipientNeighborhood} (${completedOrder.recipientLandmark})\nTarif: ${completedOrder.estimatedPrice} FCFA\nContact: ${NIAMEY_PHONE}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="calculateur" className="py-16 lg:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
            <span>Devis instantané & Réservation</span>
            <span aria-hidden="true">·</span>
            <span>Sans engagement</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Calculez votre tarif et commandez un coursier
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Remplissez les détails ci-dessous. Le tarif s'ajuste en direct selon les quartiers de Niamey et le type de colis. Vous pourrez transmettre votre commande sur WhatsApp ou la confirmer par téléphone.
          </p>
        </div>

        {/* Main Grid: Form on Left, Dynamic Price Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form container */}
          <div className="lg:col-span-8 bg-neutral-50/70 rounded-2xl border border-neutral-200 p-6 sm:p-8">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              
              {/* Step 1: Ramassage (Expéditeur) */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
                  <div className="w-6 h-6 rounded-md bg-neutral-900 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                    1
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Lieu de Ramassage (Départ)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Votre Nom ou Boutique *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Boutique Aïcha Mode ou Moussa I."
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.senderName ? 'border-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {errors.senderName && (
                      <p className="text-xs text-red-600 mt-1">{errors.senderName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Téléphone Expéditeur *
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: +227 99 61 40 98"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.senderPhone ? 'border-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {errors.senderPhone && (
                      <p className="text-xs text-red-600 mt-1">{errors.senderPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Quartier de Ramassage *
                    </label>
                    <select
                      value={senderNeighborhood}
                      onChange={(e) => {
                        setSenderNeighborhood(e.target.value);
                        // Suggest first landmark if empty
                        const found = NIAMEY_NEIGHBORHOODS.find(n => n.id === e.target.value);
                        if (found && !senderLandmark) {
                          setSenderLandmark(found.landmarks[0]);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      {NIAMEY_NEIGHBORHOODS.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name} ({n.commune})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Repère Précis du Départ *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Face pharmacie, 2e ruelle après station"
                      value={senderLandmark}
                      onChange={(e) => setSenderLandmark(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.senderLandmark ? 'border-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {errors.senderLandmark && (
                      <p className="text-xs text-red-600 mt-1">{errors.senderLandmark}</p>
                    )}
                  </div>
                </div>

                {/* Quick suggestions for sender landmarks */}
                {selectedSenderObj && selectedSenderObj.landmarks.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-neutral-500">Repères suggérés :</span>
                    {selectedSenderObj.landmarks.map((landmark) => (
                      <button
                        key={landmark}
                        type="button"
                        onClick={() => setSenderLandmark(landmark)}
                        className="text-[11px] px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
                      >
                        {landmark}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Livraison (Destinataire) */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
                  <div className="w-6 h-6 rounded-md bg-neutral-900 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                    2
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Lieu de Livraison (Arrivée)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Nom du Destinataire (Client) *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: M. Ousmane Adamou"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.recipientName ? 'border-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {errors.recipientName && (
                      <p className="text-xs text-red-600 mt-1">{errors.recipientName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Téléphone Destinataire *
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: +227 90 12 34 56"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.recipientPhone ? 'border-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {errors.recipientPhone && (
                      <p className="text-xs text-red-600 mt-1">{errors.recipientPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Quartier de Livraison *
                    </label>
                    <select
                      value={recipientNeighborhood}
                      onChange={(e) => {
                        setRecipientNeighborhood(e.target.value);
                        const found = NIAMEY_NEIGHBORHOODS.find(n => n.id === e.target.value);
                        if (found && !recipientLandmark) {
                          setRecipientLandmark(found.landmarks[0]);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      {NIAMEY_NEIGHBORHOODS.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name} ({n.commune})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Repère Précis de Livraison *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Près du château d'eau, porte bleue"
                      value={recipientLandmark}
                      onChange={(e) => setRecipientLandmark(e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.recipientLandmark ? 'border-red-400' : 'border-neutral-300'
                      }`}
                    />
                    {errors.recipientLandmark && (
                      <p className="text-xs text-red-600 mt-1">{errors.recipientLandmark}</p>
                    )}
                  </div>
                </div>

                {/* Quick suggestions for recipient landmarks */}
                {selectedRecipientObj && selectedRecipientObj.landmarks.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-neutral-500">Repères suggérés :</span>
                    {selectedRecipientObj.landmarks.map((landmark) => (
                      <button
                        key={landmark}
                        type="button"
                        onClick={() => setRecipientLandmark(landmark)}
                        className="text-[11px] px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
                      >
                        {landmark}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 3: Type de Colis & Formule */}
              <div>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neutral-200">
                  <div className="w-6 h-6 rounded-md bg-neutral-900 text-amber-400 flex items-center justify-center text-xs font-bold font-mono">
                    3
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Détails du Colis & Options
                  </h3>
                </div>

                {/* Package Type Cards (Interactive selection) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {PACKAGE_TYPES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setPackageTypeId(pkg.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        packageTypeId === pkg.id
                          ? 'border-neutral-900 bg-white ring-2 ring-neutral-900/10 shadow-sm'
                          : 'border-neutral-200 bg-white/70 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-900">{pkg.label}</span>
                        {pkg.extraCost > 0 ? (
                          <span className="text-[11px] font-mono text-amber-700 font-semibold">
                            +{pkg.extraCost} F
                          </span>
                        ) : (
                          <span className="text-[11px] text-neutral-500">Inclus</span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 leading-snug">{pkg.description}</p>
                    </div>
                  ))}
                </div>

                {/* Urgency selector */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    Délai souhaité
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgency('standard')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                        urgency === 'standard'
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <div className="text-xs font-bold">Standard (<span className="font-mono tabular-nums">60-90 min</span>)</div>
                      <div className={`text-[11px] mt-0.5 ${urgency === 'standard' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        Idéal pour livraisons courantes
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgency('express')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                        urgency === 'express'
                          ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <div className="text-xs font-bold">⚡ Express (<span className="font-mono tabular-nums">&lt; 45 min</span>)</div>
                      <div className="text-[11px] mt-0.5 opacity-80">
                        Coursier prioritaire dédié (+500 F)
                      </div>
                    </button>
                  </div>
                </div>

                {/* E-commerce Cash on Delivery Toggle */}
                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 mb-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-neutral-900">
                        Service d'encaissement à la livraison (Cash on Delivery)
                      </div>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Le coursier encaisse le montant de votre marchandise auprès du client et vous le reverse par Airtel Money ou Moov Money.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={isCod}
                        onChange={(e) => setIsCod(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {isCod && (
                    <div className="mt-3 pt-3 border-t border-amber-200">
                      <label className="block text-xs font-semibold text-neutral-800 mb-1">
                        Montant à encaisser auprès du client (FCFA) *
                      </label>
                      <div className="relative max-w-xs">
                        <input
                          type="number"
                          placeholder="Ex: 15000"
                          value={codAmount}
                          onChange={(e) => setCodAmount(e.target.value)}
                          className={`w-full pl-3.5 pr-14 py-2 bg-white text-sm font-mono font-bold text-neutral-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                            errors.codAmount ? 'border-red-400' : 'border-neutral-300'
                          }`}
                        />
                        <span className="absolute right-3 top-2 text-xs font-bold text-neutral-500 font-mono">
                          FCFA
                        </span>
                      </div>
                      {errors.codAmount && (
                        <p className="text-xs text-red-600 mt-1">{errors.codAmount}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Mode de règlement de la course */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-2">
                    Règlement des frais de course
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'cash'
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      💵 Espèces
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('airtel')}
                      className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'airtel'
                          ? 'border-red-600 bg-red-600 text-white font-bold'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      🔴 Airtel Money
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('moov')}
                      className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        paymentMethod === 'moov'
                          ? 'border-blue-600 bg-blue-600 text-white font-bold'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      🔵 Moov Money
                    </button>
                  </div>
                </div>

                {/* Additional instructions */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Instructions particulières pour le coursier (Facultatif)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Appeler avant d'arriver, confier au gardien Ibrahim"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white text-sm text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              {/* Submit Button inside form */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-500">
                  Confirmation instantanée · Coursier en route sous 15 min
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Valider et Réserver le coursier</span>
                </button>
              </div>

            </form>
          </div>

          {/* Dynamic Price Breakdown Summary Card on Right (Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            
            <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-md border border-neutral-800">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Tarif en Direct
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">Estimé garanti</span>
              </div>

              {/* Total Price Display */}
              <div className="py-5">
                <div className="text-xs text-neutral-400 mb-1">Total de la course</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {priceDetails.total.toLocaleString('fr-FR')}
                  </span>
                  <span className="text-base font-bold text-white font-mono">FCFA</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Pas de supplément surprise à l'arrivée
                </p>
              </div>

              {/* Line item breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-800 text-xs">
                <div className="flex justify-between items-center text-neutral-300">
                  <span>Course de base :</span>
                  <span className="font-mono tabular-nums">{priceDetails.base} FCFA</span>
                </div>

                {priceDetails.crossRiver && (
                  <div className="flex justify-between items-center text-amber-300">
                    <span>Traversée Rive Droite :</span>
                    <span className="font-mono tabular-nums">Inclus dans base</span>
                  </div>
                )}

                {priceDetails.expressSurcharge > 0 && (
                  <div className="flex justify-between items-center text-neutral-300">
                    <span>Option Express (&lt; 45 min) :</span>
                    <span className="font-mono tabular-nums text-amber-400">+{priceDetails.expressSurcharge} FCFA</span>
                  </div>
                )}

                {priceDetails.packageSurcharge > 0 && (
                  <div className="flex justify-between items-center text-neutral-300">
                    <span>Supplément colis volumineux/fragile :</span>
                    <span className="font-mono tabular-nums text-amber-400">+{priceDetails.packageSurcharge} FCFA</span>
                  </div>
                )}

                {isCod && (
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-emerald-400 font-medium">
                    <span>Encaissement COD :</span>
                    <span className="font-mono tabular-nums">
                      {parseInt(codAmount || '0', 10).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                )}
              </div>

              {/* Direct quick order actions */}
              <div className="mt-6 pt-5 border-t border-neutral-800 flex flex-col gap-2.5">
                <a
                  href={`tel:${NIAMEY_PHONE_RAW}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Commander par Appel direct</span>
                </a>
              </div>
            </div>

            {/* Practical information card */}
            <div className="bg-neutral-100 rounded-xl p-5 border border-neutral-200 text-xs text-neutral-600 space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Service client Niamey</span>
              </div>
              <p>
                Flotte de coursiers géolocalisés disponibles pour toute urgence ou tournée de colis.
              </p>
              <div className="pt-2 border-t border-neutral-200 font-mono text-[11px] text-neutral-700">
                Contact : <span className="font-bold">{NIAMEY_PHONE}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Dialog: Order Confirmation & Direct WhatsApp Transmission */}
        {completedOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900">
                  Demande de livraison générée !
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Votre coursier Faucon Express est prêt à être mobilisé à Niamey.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 mb-6 space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500 font-medium">Référence Colis :</span>
                  <span className="font-mono font-bold text-sm text-neutral-900 bg-amber-100 px-2 py-0.5 rounded">
                    {completedOrder.id}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Trajet :</span>
                  <span className="font-medium text-neutral-800 text-right truncate max-w-[220px]">
                    {completedOrder.senderNeighborhood} → {completedOrder.recipientNeighborhood}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Tarif de la course :</span>
                  <span className="font-mono font-bold text-neutral-900">
                    {completedOrder.estimatedPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                {completedOrder.codAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-700 font-medium">
                    <span>À encaisser (COD) :</span>
                    <span className="font-mono font-bold">
                      {completedOrder.codAmount.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${NIAMEY_PHONE_RAW}?text=${generateWhatsAppMessage(completedOrder)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la commande sur WhatsApp (+227 99 61 40 98)</span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${NIAMEY_PHONE_RAW}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Appeler direct</span>
                  </a>

                  <button
                    onClick={copyOrderDetails}
                    className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié !' : 'Copier résumé'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    const orderId = completedOrder.id;
                    setCompletedOrder(null);
                    onTrackOrder(orderId);
                  }}
                  className="w-full py-2.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                >
                  Voir l'étape de suivi en direct
                </button>

                <button
                  onClick={() => setCompletedOrder(null)}
                  className="w-full py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
                >
                  Fermer cette fenêtre
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
