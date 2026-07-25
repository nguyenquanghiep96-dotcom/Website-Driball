// Driball Product Data
// Dữ liệu tĩnh — sau này có thể chuyển sang Supabase

export const ZALO_LINK = 'https://zalo.me/0000000000'; // Placeholder — cập nhật Zalo ID sau

export const DELIVERY_TIME = '14 ngày kể từ ngày cọc tiền';

export const PRICE_TIERS = [
  { minQty: 1, label: '1–9 bộ', discount: 0 },
  { minQty: 10, label: '10–19 bộ', discount: 10000 },
  { minQty: 20, label: '20–49 bộ', discount: 20000 },
  { minQty: 50, label: '50+ bộ', discount: 30000 },
];

export const PRINT_OPTIONS = [
  { id: 'basic', name: 'In ấn cơ bản', description: 'In số, tên, logo đội', price: 35000 },
  { id: 'premium', name: 'In ấn nâng cao', description: 'In số, tên, logo + hoạ tiết tuỳ chỉnh', price: 45000 },
];

export const UPGRADE_OPTIONS = [
  { id: 'dtf-logo', name: 'Nâng cấp Logo DTF cao cấp', description: 'Logo in DTF sắc nét, bền màu, không bong tróc', price: 15000, unit: '/logo' },
];

export const CATEGORIES = [
  { id: 'new', label: 'Thiết kế mới' },
  { id: 'dri-play', label: 'DRI-PLAY' },
  { id: 'dri-pro', label: 'DRI-PRO' },
  { id: 'dri-elite', label: 'DRI-ELITE' },
];

export const SIZE_CHART = [
  { size: 'S', chest: '88-92', length: '68', shoulder: '42' },
  { size: 'M', chest: '92-96', length: '70', shoulder: '44' },
  { size: 'L', chest: '96-100', length: '72', shoulder: '46' },
  { size: 'XL', chest: '100-104', length: '74', shoulder: '48' },
  { size: '2XL', chest: '104-108', length: '76', shoulder: '50' },
];

export const products = [
  {
    id: 'stripe-series-blue',
    slug: 'stripe-series-blue',
    name: 'STRIPE SERIES',
    tagline: 'Tinh thần sọc dọc. Đẳng cấp sân cỏ.',
    category: 'new',
    availability: 'in-stock', // "Có sẵn"
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Mẫu sọc dọc cổ điển, phối màu xanh đen mạnh mẽ lấy cảm hứng từ Inter Milan.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-blue.png',
    modelImage: '/images/products/stripe-blue.png',
    frontImage: '/images/products/stripe-blue.png',
    backImage: '/images/products/stripe-blue.png',
    colors: [
      { name: 'Xanh/Đen', hex: '#1a3a8a', image: '/images/products/stripe-blue.png' },
    ],
    images: ['/images/products/stripe-blue.png'],
    featured: false,
  },
  {
    id: 'stripe-series-red',
    slug: 'stripe-series-red',
    name: 'STRIPE SERIES',
    tagline: 'Tinh thần sọc dọc. Đẳng cấp sân cỏ.',
    category: 'new',
    availability: 'pre-order',
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Mẫu sọc dọc cổ điển, phối đỏ đen đậm chất AC Milan huyền thoại.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-red.png',
    modelImage: '/images/products/stripe-red.png',
    frontImage: '/images/products/stripe-red.png',
    backImage: '/images/products/stripe-red.png',
    colors: [
      { name: 'Đỏ/Đen', hex: '#cc0000', image: '/images/products/stripe-red.png' },
    ],
    images: ['/images/products/stripe-red.png'],
    featured: false,
  },
  {
    id: 'stripe-series-bw',
    slug: 'stripe-series-bw',
    name: 'STRIPE SERIES',
    tagline: 'Tinh thần sọc dọc. Đẳng cấp sân cỏ.',
    category: 'new',
    availability: 'pre-order',
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Mẫu sọc dọc cổ điển, phối trắng đen tinh tế phong cách Juventus.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-bw.png',
    modelImage: '/images/products/stripe-bw.png',
    frontImage: '/images/products/stripe-bw.png',
    backImage: '/images/products/stripe-bw.png',
    colors: [
      { name: 'Trắng/Đen', hex: '#333333', image: '/images/products/stripe-bw.png' },
    ],
    images: ['/images/products/stripe-bw.png'],
    featured: false,
  },
  {
    id: 'stripe-retro-blue',
    slug: 'stripe-retro-blue',
    name: 'RETRO SERIES',
    tagline: 'Hoài niệm cổ điển. Phong cách vượt thời gian.',
    category: 'new',
    availability: 'pre-order',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản retro của dòng sọc dọc, phối xanh đen cổ điển đầy hoài niệm.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-blue.png',
    modelImage: '/images/products/stripe-blue.png',
    frontImage: '/images/products/stripe-blue.png',
    backImage: '/images/products/stripe-blue.png',
    colors: [
      { name: 'Xanh/Đen', hex: '#1a3a8a', image: '/images/products/stripe-blue.png' },
    ],
    images: ['/images/products/stripe-blue.png'],
    featured: false,
  },
  {
    id: 'stripe-retro-red',
    slug: 'stripe-retro-red',
    name: 'RETRO SERIES',
    tagline: 'Hoài niệm cổ điển. Phong cách vượt thời gian.',
    category: 'new',
    availability: 'pre-order',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản retro của dòng sọc dọc, phối đỏ đen mang đậm chất vintage.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-red.png',
    modelImage: '/images/products/stripe-red.png',
    frontImage: '/images/products/stripe-red.png',
    backImage: '/images/products/stripe-red.png',
    colors: [
      { name: 'Đỏ/Đen', hex: '#cc0000', image: '/images/products/stripe-red.png' },
    ],
    images: ['/images/products/stripe-red.png'],
    featured: false,
  },
  {
    id: 'stripe-retro-bw',
    slug: 'stripe-retro-bw',
    name: 'RETRO SERIES',
    tagline: 'Hoài niệm cổ điển. Phong cách vượt thời gian.',
    category: 'new',
    availability: 'pre-order',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản retro của dòng sọc dọc, phối trắng đen tinh tế theo phong cách cổ điển.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-bw.png',
    modelImage: '/images/products/stripe-bw.png',
    frontImage: '/images/products/stripe-bw.png',
    backImage: '/images/products/stripe-bw.png',
    colors: [
      { name: 'Trắng/Đen', hex: '#333333', image: '/images/products/stripe-bw.png' },
    ],
    images: ['/images/products/stripe-bw.png'],
    featured: false,
  },
];

export const partners = [
  { id: 'team-1', name: 'Worrier FC', logo: '/images/partners/team-1.png', image: '/images/products/stripe-blue.png' },
  { id: 'team-2', name: 'Double V FC', logo: '/images/partners/Layer 1.png', image: '/images/products/stripe-red.png' },
  { id: 'team-3', name: 'CAB FC', logo: '/images/partners/Layer 2.png', image: '/images/products/stripe-bw.png' },
  { id: 'team-4', name: 'CTG FC', logo: '/images/partners/Vector Smart Object.png', image: '/images/products/stripe-blue.png' },
  { id: 'team-5', name: 'V&V FC', logo: '/images/partners/Vector Smart Object-1.png', image: '/images/products/orange.png' },
  { id: 'team-6', name: 'Sinh Tố Team', logo: '/images/partners/Vector Smart Object-2.png', image: '/images/products/stripe-red.png' },
  { id: 'team-7', name: 'AF FC', logo: '/images/partners/Vector Smart Object-3.png', image: '/images/products/stripe-bw.png' },
];

export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export function getUnitPrice(basePrice, quantity) {
  const sortedTiers = [...PRICE_TIERS].sort((a, b) => b.minQty - a.minQty);
  const tier = sortedTiers.find(t => quantity >= t.minQty);
  return tier ? basePrice - tier.discount : basePrice;
}

export function buildZaloMessage({ product, color, quantity, unitPrice, totalPrice, printOptions, upgradeOptions }) {
  const lines = [
    '📋 *TÍNH GIÁ ĐẶT ĐỘI - DRIBALL*',
    `──────────────`,
    `Mẫu: ${product.name}`,
    color ? `Màu: ${color}` : '',
    `Số lượng: ${quantity} bộ`,
    `──────────────`,
  ];

  if (printOptions && printOptions.length > 0) {
    lines.push('In ấn:');
    printOptions.forEach(opt => lines.push(`  • ${opt.name}: +${formatPrice(opt.price)}`));
  }

  if (upgradeOptions && upgradeOptions.length > 0) {
    lines.push('Nâng cấp:');
    upgradeOptions.forEach(opt => lines.push(`  • ${opt.name}: +${formatPrice(opt.price)}`));
  }

  lines.push(`──────────────`);
  lines.push(`Đơn giá: ${formatPrice(unitPrice)}/bộ`);
  lines.push(`💰 Tổng: ${formatPrice(totalPrice)}`);
  lines.push(`Thời gian giao: 14 ngày kể từ ngày cọc tiền`);

  return lines.filter(Boolean).join('\n');
}
