import { Neighborhood, PackageType, DeliveryOrder } from '../types/delivery';

export const NIAMEY_PHONE = '+227 99 61 40 98';
export const NIAMEY_PHONE_RAW = '22799614098';

export const NIAMEY_NEIGHBORHOODS: Neighborhood[] = [
  // Centre & Affaires
  {
    id: 'plateau',
    name: 'Plateau (Centre Administratif & Affaires)',
    zone: 'centre',
    commune: 'Commune I',
    landmarks: ['Place de la Concertation', 'Siège BCEAO', 'Hôtel Bravia', 'Immeuble Sonibank', 'Ministère des Finances']
  },
  {
    id: 'yantala_bas',
    name: 'Yantala Bas / Corniche',
    zone: 'centre',
    commune: 'Commune I',
    landmarks: ['Ambassade des USA', 'Hôtel Radisson Blu', 'Clinique Gamkalley', 'Grand Hôtel']
  },
  {
    id: 'yantala_haut',
    name: 'Yantala Haut',
    zone: 'centre',
    commune: 'Commune I',
    landmarks: ['Pharmacie Yantala', 'Rond-Point Yantala', 'Lycée Kassaï']
  },
  {
    id: 'koira_kano',
    name: 'Koira Kano',
    zone: 'centre',
    commune: 'Commune I',
    landmarks: ['Commissariat Koira Kano', 'Pharmacie Koira Kano', 'Complexe scolaire Oasis']
  },
  {
    id: 'koira_tegagui',
    name: 'Koira Tégagui',
    zone: 'centre',
    commune: 'Commune I',
    landmarks: ['Mosquée Koira Tégagui', 'Carrefour Tégagui']
  },

  // Rive Gauche Est & Sud
  {
    id: 'bobiel',
    name: 'Bobiel',
    zone: 'rive_gauche',
    commune: 'Commune II',
    landmarks: ['Rond-Point Gadafawa', 'Clinique Afoua', 'Pharmacie Bobiel']
  },
  {
    id: 'francophonie',
    name: 'Village de la Francophonie',
    zone: 'rive_gauche',
    commune: 'Commune II',
    landmarks: ['Cité Francophonie', 'Boulangerie Moderne']
  },
  {
    id: 'dar_es_salam',
    name: 'Dar-es-Salam',
    zone: 'rive_gauche',
    commune: 'Commune II',
    landmarks: ['Stade Général Seyni Kountché', 'Marché Dar-es-Salam']
  },
  {
    id: 'banifandou',
    name: 'Banifandou (I & II)',
    zone: 'rive_gauche',
    commune: 'Commune II',
    landmarks: ['Pharmacie Banifandou', 'Rond-Point Banifandou', 'Marché']
  },
  {
    id: 'lazaret',
    name: 'Lazaret',
    zone: 'rive_gauche',
    commune: 'Commune III',
    landmarks: ['Hôpital National de Niamey', 'Lycée Bosso', 'CEG 10']
  },
  {
    id: 'wadata',
    name: 'Wadata / Grand Marché',
    zone: 'rive_gauche',
    commune: 'Commune III',
    landmarks: ['Gare Rimbo Transport', 'Auto-gare Wadata', 'Grand Marché de Niamey', 'Pharmacie Wadata']
  },
  {
    id: 'nouveau_marche',
    name: 'Nouveau Marché / Katako',
    zone: 'rive_gauche',
    commune: 'Commune III',
    landmarks: ['Marché Katako', 'Gare SNTV', 'Rond-point Katako']
  },
  {
    id: 'aeroport',
    name: 'Aéroport / Escadrille',
    zone: 'rive_gauche',
    commune: 'Commune IV',
    landmarks: ['Aéroport International Diori Hamani', 'Rond-Point 6ème', 'Base aérienne']
  },
  {
    id: 'talladje',
    name: 'Talladjé',
    zone: 'rive_gauche',
    commune: 'Commune IV',
    landmarks: ['Rond-point Talladjé', 'Pharmacie Talladjé', 'Marché Talladjé']
  },
  {
    id: 'bassora',
    name: 'Bassora / Pays-Bas',
    zone: 'rive_gauche',
    commune: 'Commune IV',
    landmarks: ['Rond-Point Francophonie Sud', 'Cité des Députés']
  },

  // Rive Droite (Fleuve Niger)
  {
    id: 'harobanda',
    name: 'Harobanda (Rive Droite)',
    zone: 'rive_droite',
    commune: 'Commune V',
    landmarks: ['Sortie Pont Kennedy', 'Marché Harobanda', 'Gare Rive Droite']
  },
  {
    id: 'universite',
    name: 'Université Abdou Moumouni (UAM)',
    zone: 'rive_droite',
    commune: 'Commune V',
    landmarks: ['Campus Universitaire', 'Faculté des Sciences', 'Rectorat UAM']
  },
  {
    id: 'kirkissoye',
    name: 'Kirkissoye',
    zone: 'rive_droite',
    commune: 'Commune V',
    landmarks: ['Nouveau Pont Général Seyni Kountché', 'Route de Torodi']
  },
  {
    id: 'gamkalle',
    name: 'Gamkallé',
    zone: 'rive_droite',
    commune: 'Commune V',
    landmarks: ['Village artisanal', 'Zone industrielle Harobanda']
  },

  // Périphérie
  {
    id: 'goudel',
    name: 'Goudel / Tondibia',
    zone: 'peripherie',
    commune: 'Commune I',
    landmarks: ['Station de pompage Goudel', 'Route de Tillabéri', 'Camp militaire Tondibia']
  },
  {
    id: 'saga',
    name: 'Saga',
    zone: 'peripherie',
    commune: 'Commune IV',
    landmarks: ['Périmètre hydro-agricole', 'Route de Kollo']
  }
];

export const PACKAGE_TYPES: PackageType[] = [
  {
    id: 'pli',
    label: 'Pli / Document urgent',
    description: 'Enveloppe, passeport, contrat, dossier d’appel d’offre, chèque',
    baseWeight: '< 500g',
    extraCost: 0
  },
  {
    id: 'standard',
    label: 'Colis Standard E-commerce',
    description: 'Vêtements, chaussures, parfums, cosmétiques, accessoires téléphone',
    baseWeight: '< 3 kg',
    extraCost: 0
  },
  {
    id: 'fragile',
    label: 'Fragile ou Alimentaire',
    description: 'Gâteau, repas traiteur, flacons en verre, matériel électronique délicat',
    baseWeight: '< 4 kg',
    extraCost: 500
  },
  {
    id: 'volumineux',
    label: 'Colis Moyen / Volumineux',
    description: 'Carton marchand, électroménager d’appoint, sac de marchandises',
    baseWeight: '4 à 10 kg',
    extraCost: 1000
  }
];

/**
 * Calcul du tarif de livraison à Niamey en Francs CFA (XOF)
 */
export function calculateDeliveryPrice(
  senderNeighborhoodId: string,
  recipientNeighborhoodId: string,
  packageTypeId: string,
  urgency: 'standard' | 'express'
): { total: number; base: number; crossRiver: boolean; expressSurcharge: number; packageSurcharge: number } {
  const sender = NIAMEY_NEIGHBORHOODS.find(n => n.id === senderNeighborhoodId);
  const recipient = NIAMEY_NEIGHBORHOODS.find(n => n.id === recipientNeighborhoodId);
  const pkg = PACKAGE_TYPES.find(p => p.id === packageTypeId) || PACKAGE_TYPES[1];

  let base = 1000; // Tarif de base intra-rive standard Niamey
  let crossRiver = false;

  if (sender && recipient) {
    // Traversée Rive Gauche <-> Rive Droite (Pont Kennedy ou Pont Chinois)
    const isSenderRight = sender.zone === 'rive_droite';
    const isRecipientRight = recipient.zone === 'rive_droite';

    if (isSenderRight !== isRecipientRight) {
      crossRiver = true;
      base = 1500;
    } else if (sender.zone === 'peripherie' || recipient.zone === 'peripherie') {
      base = 1500;
    } else if (sender.id === recipient.id) {
      base = 800; // Même quartier
    } else {
      base = 1000;
    }
  }

  const expressSurcharge = urgency === 'express' ? 500 : 0;
  const packageSurcharge = pkg.extraCost;
  const total = base + expressSurcharge + packageSurcharge;

  return {
    total,
    base,
    crossRiver,
    expressSurcharge,
    packageSurcharge
  };
}

// Données de suivi de démonstration réelles pour tester instantanément
export const DEMO_TRACKING_ORDERS: Record<string, DeliveryOrder> = {
  'FCX-227-4819': {
    id: 'FCX-227-4819',
    senderName: 'Boutique Sahel Elegance',
    senderPhone: '+227 96 12 34 56',
    senderNeighborhood: 'Koira Kano',
    senderLandmark: 'Face Pharmacie Koira Kano',
    recipientName: 'Mme Amina Souley',
    recipientPhone: '+227 90 44 22 11',
    recipientNeighborhood: 'Harobanda (Rive Droite)',
    recipientLandmark: 'Près de l’école Mission Rive Droite',
    packageType: 'Colis Standard E-commerce',
    packageDescription: 'Robe bazin et voile assorti',
    codAmount: 25000,
    paymentMethod: 'cash',
    urgency: 'express',
    estimatedPrice: 2000,
    createdAt: 'Aujourd’hui à 10:15',
    currentStatus: 'en_route_livraison',
    courierName: 'Moustapha B. (Faucon #04)',
    courierPhone: '+227 99 61 40 98'
  },
  'FCX-227-3920': {
    id: 'FCX-227-3920',
    senderName: 'Cabinet Maître Oumarou',
    senderPhone: '+227 92 88 19 00',
    senderNeighborhood: 'Plateau (Centre Administratif & Affaires)',
    senderLandmark: 'Immeuble Sonibank 3e étage',
    recipientName: 'Direction des Impôts',
    recipientPhone: '+227 20 73 11 00',
    recipientNeighborhood: 'Yantala Haut',
    recipientLandmark: 'Secrétariat Général',
    packageType: 'Pli / Document urgent',
    packageDescription: 'Dossier de soumission cacheté',
    codAmount: 0,
    paymentMethod: 'airtel',
    urgency: 'express',
    estimatedPrice: 1500,
    createdAt: 'Hier à 15:40',
    currentStatus: 'livre',
    courierName: 'Ibrahim K. (Faucon #02)',
    courierPhone: '+227 99 61 40 98'
  },
  'FCX-227-5102': {
    id: 'FCX-227-5102',
    senderName: 'Pharmacie du Grand Marché',
    senderPhone: '+227 94 55 66 77',
    senderNeighborhood: 'Wadata / Grand Marché',
    senderLandmark: 'Entrée principale pharmacie',
    recipientName: 'Dr. Hassane',
    recipientPhone: '+227 97 00 12 34',
    recipientNeighborhood: 'Bobiel',
    recipientLandmark: 'Clinique Afoua',
    packageType: 'Fragile ou Alimentaire',
    packageDescription: 'Produits thermosensibles d’urgence',
    codAmount: 0,
    paymentMethod: 'moov',
    urgency: 'express',
    estimatedPrice: 1500,
    createdAt: 'Il y a 25 minutes',
    currentStatus: 'coursier_assigne',
    courierName: 'Abdoulaye S. (Faucon #01)',
    courierPhone: '+227 99 61 40 98'
  }
};
