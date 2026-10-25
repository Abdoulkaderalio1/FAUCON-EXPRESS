/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrderCalculator } from './components/OrderCalculator';
import { ServicesSection } from './components/ServicesSection';
import { ZonesSection } from './components/ZonesSection';
import { OrderTracker } from './components/OrderTracker';
import { MerchantPartner } from './components/MerchantPartner';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuickContactBar } from './components/QuickContactBar';
import { DEMO_TRACKING_ORDERS } from './data/niameyLocations';
import { DeliveryOrder } from './types/delivery';

export default function App() {
  const [orders, setOrders] = useState<Record<string, DeliveryOrder>>(DEMO_TRACKING_ORDERS);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('FCX-227-4819');

  const scrollToCalculator = () => {
    const el = document.getElementById('calculateur');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTracker = (orderId?: string) => {
    if (orderId) {
      setActiveTrackingId(orderId);
    }
    const el = document.getElementById('suivi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderCreated = (newOrder: DeliveryOrder) => {
    setOrders(prev => ({
      ...prev,
      [newOrder.id]: newOrder
    }));
    setActiveTrackingId(newOrder.id);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Strict 3-zone Top Bar Contract */}
      <Header
        onOrderClick={scrollToCalculator}
        onTrackClick={() => scrollToTracker()}
      />

      <main className="flex-1">
        {/* Hero Section with 16:9 dominant visual asset & 4-column KPI strip */}
        <Hero
          onOrderClick={scrollToCalculator}
          onExploreRatesClick={scrollToCalculator}
        />

        {/* Real-time Order Engine & Niamey Price Calculator */}
        <OrderCalculator
          onOrderCreated={handleOrderCreated}
          onTrackOrder={scrollToTracker}
        />

        {/* Asymmetric Bento Grid Capabilities & Services */}
        <ServicesSection onOrderClick={scrollToCalculator} />

        {/* Real-time Package Tracking Section */}
        <OrderTracker
          ordersList={orders}
          activeOrderId={activeTrackingId}
        />

        {/* Coverage of Niamey's 5 Communes & River Crossing */}
        <ZonesSection onSelectZone={() => scrollToCalculator()} />

        {/* E-commerce Sellers & Merchant Partnership Program */}
        <MerchantPartner />

        {/* Local Logistics FAQ */}
        <FaqSection />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* Floating Action Bar (Responsive Mobile Viewport < 15% Height Cap) */}
      <QuickContactBar onOrderClick={scrollToCalculator} />
    </div>
  );
}
