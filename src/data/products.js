// Driball Product Data
// Dữ liệu tĩnh — sau này có thể chuyển sang Supabase

export const ZALO_LINK = 'https://zalo.me/0000000000'; // Placeholder — cập nhật Zalo ID sau

export const PRICE_TIERS = [
  { minQty: 1, label: '1–9 bộ', discount: 0 },
  { minQty: 10, label: '10–19 bộ', discount: 10000 },
  { minQty: 20, label: '20–49 bộ', discount: 20000 },
  { minQty: 50, label: '50+ bộ', discount: 30000 },
];

export const PRINT_OPTIONS = [
  { id: 'basic', name: 'Gói in cơ bản', description: 'In số, tên, logo trước sau', price: 30000 },
  { id: 'back-number', name: 'In số lưng lớn', description: 'Số lưng size lớn nổi bật', price: 10000 },
  { id: 'name-print', name: 'In tên cầu thủ', description: 'Tên cầu thủ phía trên số lưng', price: 15000 },
];

export const UPGRADE_OPTIONS = [
  { id: '3d-logo', name: 'Logo 3D', description: 'Logo thêu 3D cao cấp, nổi bật trên áo', price: 15000 },
  { id: 'premium-fabric', name: 'Nâng cấp vải Premium', description: 'Vải thun lạnh cao cấp, thoáng mát hơn', price: 25000 },
  { id: 'custom-collar', name: 'Tuỳ chỉnh cổ áo', description: 'Thay đổi kiểu cổ áo theo yêu cầu', price: 20000 },
];

export const CATEGORIES = [
  { id: 'new', label: 'Thiết kế mới' },
  { id: 'dri-play', label: 'DRI-PLAY' },
  { id: 'dri-pro', label: 'DRI-PRO' },
  { id: 'dri-elite', label: 'DRI-ELITE' },
];

export const products = [

  {
    id: 'stripe-series-blue',
    slug: 'stripe-series-blue',
    name: 'STRIPE SERIES',
    category: 'new',
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Mẫu sọc dọc cổ điển, phối màu xanh đen mạnh mẽ lấy cảm hứng từ Inter Milan.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-blue.png',
    modelImage: '/images/products/stripe-blue.png',
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
    category: 'new',
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Mẫu sọc dọc cổ điển, phối đỏ đen đậm chất AC Milan huyền thoại.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-red.png',
    modelImage: '/images/products/stripe-red.png',
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
    category: 'new',
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Mẫu sọc dọc cổ điển, phối trắng đen tinh tế phong cách Juventus.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-bw.png',
    modelImage: '/images/products/stripe-bw.png',
    colors: [
      { name: 'Trắng/Đen', hex: '#333333', image: '/images/products/stripe-bw.png' },
    ],
    images: ['/images/products/stripe-bw.png'],
    featured: false,
  },
  {
    id: 'stars-series-away',
    slug: 'stars-series-away',
    name: 'STARS SERIES AWAY',
    category: 'new',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản sân khách của dòng Stars Series, gam màu tươi sáng nổi bật trên sân cỏ.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/hero/stars-series.png',
    modelImage: '/images/hero/stars-series.png',
    colors: [
      { name: 'Trắng', hex: '#FFFFFF', image: '/images/hero/stars-series.png' },
      { name: 'Cam', hex: '#FF6B35', image: '/images/products/orange.png' },
    ],
    images: ['/images/hero/stars-series.png', '/images/products/orange.png'],
    featured: false,
  },
  {
    id: 'stripe-retro-blue',
    slug: 'stripe-retro-blue',
    name: 'RETRO SERIES',
    category: 'new',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản retro của dòng sọc dọc, phối xanh đen cổ điển đầy hoài niệm.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-blue.png',
    modelImage: '/images/products/stripe-blue.png',
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
    category: 'new',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản retro của dòng sọc dọc, phối đỏ đen mang đậm chất vintage.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-red.png',
    modelImage: '/images/products/stripe-red.png',
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
    category: 'new',
    price: 330000,
    bulkPrice: 320000,
    bulkMinQty: 10,
    description: 'Phiên bản retro của dòng sọc dọc, phối trắng đen tinh tế theo phong cách cổ điển.',
    material: 'Vải thun lạnh Polyester cao cấp, thoáng mát, co giãn 4 chiều.',
    heroImage: '/images/products/stripe-bw.png',
    modelImage: '/images/products/stripe-bw.png',
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
    '📋 *BÁO GIÁ DRIBALL*',
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

  return lines.filter(Boolean).join('\n');
}
