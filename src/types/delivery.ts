export type Neighborhood = {
  id: string;
  name: string;
  zone: 'centre' | 'rive_gauche' | 'rive_droite' | 'peripherie';
  commune: 'Commune I' | 'Commune II' | 'Commune III' | 'Commune IV' | 'Commune V';
  landmarks: string[];
};

export type PackageType = {
  id: string;
  label: string;
  description: string;
  baseWeight: string;
  extraCost: number;
};

export type PaymentMethod = 'cash' | 'airtel' | 'moov';

export type DeliveryStatus = 
  | 'enregistree'
  | 'coursier_assigne'
  | 'en_cours_ramassage'
  | 'colis_recupere'
  | 'en_route_livraison'
  | 'livre';

export type TrackingStep = {
  status: DeliveryStatus;
  label: string;
  description: string;
  time: string;
  completed: boolean;
  current: boolean;
};

export type DeliveryOrder = {
  id: string;
  senderName: string;
  senderPhone: string;
  senderNeighborhood: string;
  senderLandmark: string;
  recipientName: string;
  recipientPhone: string;
  recipientNeighborhood: string;
  recipientLandmark: string;
  packageType: string;
  packageDescription: string;
  codAmount: number; // Cash on delivery if e-commerce
  paymentMethod: PaymentMethod;
  urgency: 'standard' | 'express';
  notes?: string;
  estimatedPrice: number;
  createdAt: string;
  currentStatus: DeliveryStatus;
  courierName?: string;
  courierPhone?: string;
};
