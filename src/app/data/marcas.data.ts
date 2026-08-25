export interface ProductVariant {
  weight: string;
  price: string;
  oldPrice?: string;
  rawDescription: string;
}

export interface Product {
  name: string;
  description: string;
  longDescription?: string;
  price: string;
  icon: string;
  animal: 'perro' | 'gato';
  tags?: string[];
  promotion?: string;
  image?: string;
  variants?: ProductVariant[];
}

export interface Marca {
  id: string;
  name: string;
  description: string;
  logo: string;
  products: Product[];
}

export interface OtrasMascotasProduct {
  name: string;
  description: string;
  image: string;
  price: string;
  tag?: string;
}

export interface AccesorioProduct {
  name: string;
  description: string;
  image: string;
  price: string;
  animal: string; // 'perro' or 'gato'
  category: string; // 'juguetes', 'camas', etc.
}

export const MARCAS_DATA: Record<string, Marca> = {
  'hills-pd': {
    id: 'hills-pd',
    name: "Hill's Prescription Diet",
    description: 'Nutrición clínica de vanguardia para tratar diversas condiciones de salud en mascotas.',
    logo: 'assets/logos/hills-logo.png',
    products: [
      { name: "Hill's PD c/d Multicare Canine", description: 'Cuidado urinario - Seco 3 kg', price: 'S/ 160.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's PD c/d Multicare Canine", description: 'Cuidado urinario - Seco 8 kg', price: 'S/ 320.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's PD i/d Digestive Care Canine", description: 'Cuidado digestivo - Seco 3 kg', price: 'S/ 170.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's PD k/d Kidney Care Canine", description: 'Cuidado renal - Seco 3 kg', price: 'S/ 175.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's PD z/d Food Sensitivities Canine", description: 'Sensibilidad alimentaria - Seco 3 kg', price: 'S/ 180.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's PD c/d Multicare Feline", description: 'Cuidado urinario - Seco 1.5 kg', price: 'S/ 120.00', icon: '🐈', animal: 'gato' },
      { name: "Hill's PD k/d Kidney Care Feline", description: 'Cuidado renal - Seco 1.5 kg', price: 'S/ 130.00', icon: '🐈', animal: 'gato' },
      { name: "Hill's PD i/d Digestive Care Feline", description: 'Cuidado digestivo - Seco 1.5 kg', price: 'S/ 125.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'hills-sd': {
    id: 'hills-sd',
    name: "Hill's Science Diet",
    description: 'Nutrición basada en la biología para anticiparse a las cambiantes necesidades de tu mascota.',
    logo: 'assets/logos/hills-logo.png',
    products: [
      { name: "Hill's SD Puppy Small Bites", description: 'Cachorro razas pequeñas - Seco 2 kg', price: 'S/ 115.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's SD Adult Small Paws", description: 'Adulto razas pequeñas - Seco 2 kg', price: 'S/ 110.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's SD Adult Advanced Fitness", description: 'Adulto pollo y cebada - Seco 7 kg', price: 'S/ 240.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's SD Senior 7+ Small Bites", description: 'Senior 7+ años pollo - Seco 2 kg', price: 'S/ 120.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's SD Perfect Weight Adult", description: 'Control de peso adulto - Seco 3 kg', price: 'S/ 160.00', icon: '🐕', animal: 'perro' },
      { name: "Hill's SD Kitten Indoor", description: 'Cachorro gato interior - Seco 1.5 kg', price: 'S/ 105.00', icon: '🐈', animal: 'gato' },
      { name: "Hill's SD Adult Indoor", description: 'Adulto gato interior - Seco 1.5 kg', price: 'S/ 100.00', icon: '🐈', animal: 'gato' },
      { name: "Hill's SD Adult Hairball Control", description: 'Control bolas de pelo - Seco 1.5 kg', price: 'S/ 110.00', icon: '🐈', animal: 'gato' },
      { name: "Hill's SD Adult Perfect Weight Feline", description: 'Control de peso gato - Seco 1.5 kg', price: 'S/ 115.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'nutram': {
    id: 'nutram',
    name: 'Nutram',
    description: 'Recetas holísticas y naturales que optimizan la salud desde adentro hacia afuera.',
    logo: 'assets/logos/nutram-logo.png',
    products: [
      { name: 'Nutram Sound S2 Puppy', description: 'Pollo y avena - Seco 2 kg', price: 'S/ 110.00', icon: '🐕', animal: 'perro' },
      { name: 'Nutram Sound S6 Adult', description: 'Pollo y avena - Seco 11.4 kg', price: 'S/ 330.00', icon: '🐕', animal: 'perro' },
      { name: 'Nutram Ideal I20 Sensitive Skin', description: 'Cordero y arroz - Seco 2 kg', price: 'S/ 130.00', icon: '🐕', animal: 'perro' },
      { name: 'Nutram Total T22 Grain Free', description: 'Pavo y pollo - Seco 2 kg', price: 'S/ 140.00', icon: '🐕', animal: 'perro' },
      { name: 'Nutram Sound S1 Kitten', description: 'Pollo y salmón - Seco 1.13 kg', price: 'S/ 80.00', icon: '🐈', animal: 'gato' },
      { name: 'Nutram Sound S5 Adult', description: 'Pollo y salmón - Seco 1.13 kg', price: 'S/ 75.00', icon: '🐈', animal: 'gato' },
      { name: 'Nutram Ideal I17 Indoor', description: 'Pollo y avena - Seco 1.13 kg', price: 'S/ 85.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'proplan': {
    id: 'proplan',
    name: 'Pro Plan',
    description: 'Nutrición de última generación respaldada por científicos y veterinarios.',
    logo: 'assets/logos/proplan-logo.png',
    products: [
      { name: 'Pro Plan Puppy Razas Pequeñas', description: 'Pollo y arroz Optistart - Seco 3 kg', price: 'S/ 130.00', icon: '🐕', animal: 'perro' },
      { name: 'Pro Plan Puppy Razas Medianas', description: 'Pollo y arroz Optistart - Seco 15 kg', price: 'S/ 360.00', icon: '🐕', animal: 'perro' },
      { name: 'Pro Plan Adult Razas Pequeñas', description: 'Pollo y arroz Optihealth - Seco 3 kg', price: 'S/ 125.00', icon: '🐕', animal: 'perro' },
      { name: 'Pro Plan Adult Sensitive Skin', description: 'Salmón Optiderma - Seco 3 kg', price: 'S/ 140.00', icon: '🐕', animal: 'perro' },
      { name: 'Pro Plan Adult Sensitive Digestion', description: 'Cordero Optidigest - Seco 3 kg', price: 'S/ 135.00', icon: '🐕', animal: 'perro' },
      { name: 'Pro Plan Senior 7+ Razas Pequeñas', description: 'Optiage - Seco 3 kg', price: 'S/ 145.00', icon: '🐕', animal: 'perro' },
      { name: 'Pro Plan Kitten Optistart', description: 'Pollo y arroz - Seco 1.5 kg', price: 'S/ 85.00', icon: '🐈', animal: 'gato' },
      { name: 'Pro Plan Adult Optirenal', description: 'Pollo y arroz - Seco 3 kg', price: 'S/ 145.00', icon: '🐈', animal: 'gato' },
      { name: 'Pro Plan Sterilized', description: 'Salmón y arroz - Seco 3 kg', price: 'S/ 150.00', icon: '🐈', animal: 'gato' },
      { name: 'Pro Plan Urinary Tract Health', description: 'Pollo - Seco 1.5 kg', price: 'S/ 95.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'brit-care': {
    id: 'brit-care',
    name: 'Brit Care',
    description: 'Fórmulas hipoalergénicas que protegen el organismo contra influencias ambientales negativas.',
    logo: 'assets/logos/britcare-logo.png',
    products: [
      { name: 'Brit Care Puppy Lamb & Rice', description: 'Hipoalergénico cordero - Seco 3 kg', price: 'S/ 125.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Care Adult Small Breed Lamb & Rice', description: 'Hipoalergénico cordero - Seco 3 kg', price: 'S/ 120.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Care Adult Large Breed Lamb & Rice', description: 'Hipoalergénico cordero - Seco 12 kg', price: 'S/ 330.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Care Sensitive Venison', description: 'Hipoalergénico venado - Seco 3 kg', price: 'S/ 140.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Care Weight Loss Rabbit', description: 'Control de peso conejo - Seco 3 kg', price: 'S/ 130.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Care Cat Kitten', description: 'Pollo y pavo Grain Free - Seco 2 kg', price: 'S/ 115.00', icon: '🐈', animal: 'gato' },
      { name: 'Brit Care Cat Indoor', description: 'Antiestrés pollo Grain Free - Seco 2 kg', price: 'S/ 110.00', icon: '🐈', animal: 'gato' },
      { name: 'Brit Care Cat Sterilized', description: 'Salmón Grain Free - Seco 2 kg', price: 'S/ 120.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'monge': {
    id: 'monge',
    name: 'Monge',
    description: 'La máxima calidad de la nutrición italiana para el bienestar diario de tu mascota.',
    logo: 'assets/logos/monge-logo.png',
    products: [
      { name: 'Monge Puppy & Junior Small', description: 'Pollo - Seco 3 kg', price: 'S/ 115.00', icon: '🐕', animal: 'perro' },
      { name: 'Monge Adult All Breeds', description: 'Cordero y arroz - Seco 12 kg', price: 'S/ 320.00', icon: '🐕', animal: 'perro' },
      { name: 'Monge Adult Mini', description: 'Salmón y arroz - Seco 3 kg', price: 'S/ 120.00', icon: '🐕', animal: 'perro' },
      { name: 'Monge Kitten', description: 'Pollo - Seco 1.5 kg', price: 'S/ 85.00', icon: '🐈', animal: 'gato' },
      { name: 'Monge Adult Indoor', description: 'Pollo - Seco 1.5 kg', price: 'S/ 80.00', icon: '🐈', animal: 'gato' },
      { name: 'Monge Sterilised', description: 'Pollo - Seco 1.5 kg', price: 'S/ 85.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'brit-premium': {
    id: 'brit-premium',
    name: 'Brit Premium',
    description: 'Excelente palatabilidad y digestibilidad gracias a su alto contenido de carne.',
    logo: 'assets/logos/britpremium-logo.png',
    products: [
      { name: 'Brit Premium by Nature Puppy S', description: 'Pollo razas pequeñas - Seco 3 kg', price: 'S/ 90.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Premium by Nature Adult M', description: 'Pollo razas medianas - Seco 15 kg', price: 'S/ 260.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Premium by Nature Adult L', description: 'Pollo razas grandes - Seco 15 kg', price: 'S/ 270.00', icon: '🐕', animal: 'perro' },
      { name: 'Brit Premium Cat Kitten', description: 'Pollo y salmón - Seco 1.5 kg', price: 'S/ 65.00', icon: '🐈', animal: 'gato' },
      { name: 'Brit Premium Cat Sterilized', description: 'Salmón - Seco 1.5 kg', price: 'S/ 65.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'canbo': {
    id: 'canbo',
    name: 'Canbo',
    description: 'Nutrición súper premium diseñada para las exigencias de nuestras mascotas.',
    logo: 'assets/logos/canbo-logo.png',
    products: [
      { name: 'Canbo Cachorro Razas Pequeñas', description: 'Pollo y arroz - Seco 3 kg', price: 'S/ 85.00', icon: '🐕', animal: 'perro' },
      { name: 'Canbo Cachorro Razas Medianas/Grandes', description: 'Pollo y arroz - Seco 15 kg', price: 'S/ 250.00', icon: '🐕', animal: 'perro' },
      { name: 'Canbo Adulto Razas Pequeñas', description: 'Pollo y arroz - Seco 3 kg', price: 'S/ 80.00', icon: '🐕', animal: 'perro' },
      { name: 'Canbo Adulto Cordero', description: 'Cordero y arroz - Seco 15 kg', price: 'S/ 260.00', icon: '🐕', animal: 'perro' },
      { name: 'Canbo Senior Todas las Razas', description: 'Pollo y arroz - Seco 3 kg', price: 'S/ 85.00', icon: '🐕', animal: 'perro' },
      { name: 'Canbo Gatito', description: 'Pollo y arroz - Seco 1.5 kg', price: 'S/ 65.00', icon: '🐈', animal: 'gato' },
      { name: 'Canbo Adulto Esterilizado', description: 'Pollo y arroz - Seco 1.5 kg', price: 'S/ 65.00', icon: '🐈', animal: 'gato' },
      { name: 'Canbo Urinary', description: 'Cuidado urinario - Seco 1.5 kg', price: 'S/ 75.00', icon: '🐈', animal: 'gato' }
    ]
  },
  'ricocan': {
    id: 'ricocan',
    name: 'Ricocan',
    description: 'Alimento completo y balanceado para el desarrollo y vitalidad.',
    logo: 'assets/logos/ricocan-logo.png',
    products: [
      { name: 'Ricocan Cachorro Carne y Leche', description: 'Seco 3 kg', price: 'S/ 35.00', icon: '🐕', animal: 'perro' },
      { name: 'Ricocan Cachorro Carne y Leche', description: 'Seco 15 kg', price: 'S/ 140.00', icon: '🐕', animal: 'perro' },
      { name: 'Ricocan Adulto Carne y Cereales', description: 'Seco 15 kg', price: 'S/ 120.00', icon: '🐕', animal: 'perro' },
      { name: 'Ricocan Adulto Razas Pequeñas', description: 'Seco 3 kg', price: 'S/ 35.00', icon: '🐕', animal: 'perro' },
      { name: 'Ricocan Trocitos en Salsa Carne', description: 'Lata 330g', price: 'S/ 6.50', icon: '🐕', animal: 'perro' },
      { name: 'Ricocat Gatito Leche y Carne', description: 'Seco 1 kg', price: 'S/ 15.00', icon: '🐈', animal: 'gato' },
      { name: 'Ricocat Adulto Pescado', description: 'Seco 1 kg', price: 'S/ 14.00', icon: '🐈', animal: 'gato' },
      { name: 'Ricocat Adulto Carne', description: 'Seco 3 kg', price: 'S/ 40.00', icon: '🐈', animal: 'gato' }
    ]
  }
};
