import { GroomingServiceItem } from '../types';

export const SERVICES_LIST: GroomingServiceItem[] = [
  {
    id: 'deslanado',
    name: 'DESLANADO',
    tagline: 'Retira el pelo muerto y reduce la muda.',
    description: 'Técnica especializada para retirar en profundidad el subpelo muerto acumulado, permitiendo que la piel de tu peludito respire libremente y reduciendo drásticamente la caída de pelo en casa.',
    durationApprox: '60 - 90 min',
    idealFor: 'Razas con doble manto (Husky, Golden Retriever, Pastor Alemán, Pomerania, etc.)',
    features: [
      'Eliminación profunda del subpelo muerto',
      'Oxigenación de la dermis y folículos',
      'Cepillado ergonómico sin tirones ni dolor',
      'Reducción visible de la muda en el hogar'
    ],
    iconName: 'Wind'
  },
  {
    id: 'corte-de-unas',
    name: 'CORTE DE UÑAS',
    tagline: 'Corte con calma y sin estrés.',
    description: 'Corte y limado cuidadoso respetando la vena y la anatomía de la pata. Realizado con paciencia absoluta, técnicas de relajación y refuerzo positivo para evitar cualquier sensación de miedo o ansiedad.',
    durationApprox: '20 - 30 min',
    idealFor: 'Todas las razas y tamaños que requieran mantenimiento podal',
    features: [
      'Corte seguro a la medida adecuada',
      'Limado suave de bordes afilados',
      'Despeje higiénico de almohadillas',
      'Trato paciente y libre de estrés'
    ],
    iconName: 'Scissors'
  },
  {
    id: 'bano-y-estetica',
    name: 'BAÑO Y ESTÉTICA',
    tagline: 'Productos premium según el tipo de pelaje.',
    description: 'Protocolo completo de higiene con cosmética profesional hipoalergénica seleccionada según el manto de tu mascota. Incluye secado templado con turbina silenciosa, limpieza ótica suave y cepillado sedoso.',
    durationApprox: '90 - 120 min',
    idealFor: 'Todas las razas que buscan higiene, frescura y pelaje radiante',
    features: [
      'Champú y acondicionador premium especializado',
      'Limpieza delicada de oídos y contorno de ojos',
      'Secado respetuoso y agradable',
      'Cepillado y acabado de textura sedosa'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'plucking',
    name: 'PLUCKING',
    tagline: 'Retiro manual del pelo muerto.',
    description: 'Técnica manual ancestral y no invasiva para retirar el pelo maduro de razas de pelo duro. Estimula la renovación capilar manteniendo el color vivo, brillo y protección natural de la piel.',
    durationApprox: '90 - 150 min',
    idealFor: 'Schnauzer, Fox Terrier, Teckel de pelo duro, Westie, Airedale',
    features: [
      'Retiro manual pelo a pelo sin dolor',
      'Preservación del color intenso natural',
      'Estimulación folicular saludable',
      'Acabado estilizado fiel al estándar'
    ],
    iconName: 'Hand'
  },
  {
    id: 'stripping',
    name: 'STRIPPING',
    tagline: 'Conserva la textura del pelo duro.',
    description: 'Tratamiento profesional con cuchillas especiales de stripping para mantener la consistencia áspera protectora propia de las razas de pelo duro, evitando que el pelo se debilite o pierda su textura original.',
    durationApprox: '90 - 180 min',
    idealFor: 'Terriers y razas de pelo duro que nunca deben ser rapadas con máquina',
    features: [
      'Cuidado técnico con cuchillas sin filo',
      'Conservación de la textura áspera y tupida',
      'Protección contra alergias e irritaciones',
      'Evolución progresiva del manto'
    ],
    iconName: 'ShieldCheck'
  }
];

export const BRAND_INFO = {
  name: 'GROOMING CANINO',
  mainSlogan: 'Tu peludito merece manos que lo quieran',
  secondarySlogan: 'Mascotas felices, familias más felices ♡',
  brandMessage: 'Amo y respeto a los animales. Cada mascota recibe paciencia, buen trato y cuidado profesional.',
  philosophy: 'HIGIENE • SALUD • BIENESTAR • BELLEZA • AMOR EN CADA DETALLE',
  manager: 'Andrea Tirado',
  whatsappNumber: '322 579 8718',
  whatsappRaw: '573225798718',
  homeServiceTagline: 'Voy hasta tu casa, sin que tu peludito salga.',
  homeServiceBenefits: [
    {
      title: 'Comodidad total',
      description: 'Tu peludito permanece en su entorno conocido sin esperas ni desplazamientos.'
    },
    {
      title: 'Cero estrés de transporte',
      description: 'Sin mareos en el carro, tráfico ni ansiedad por jaulas de transporte.'
    },
    {
      title: 'Atención 100% personalizada',
      description: 'Toda la dedicación y tiempo de Andrea enfocado exclusivamente en tu mascota.'
    },
    {
      title: 'Máxima tranquilidad',
      description: 'Puedes ver el proceso y tu compañero se siente protegido en su propio hogar.'
    }
  ]
};
