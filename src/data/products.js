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
  { id: 'none', name: 'Áo trơn', description: 'Giữ nguyên thiết kế mẫu, chưa thêm tên số và logo đội', price: 0 },
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
    detailHeroImage: '/images/products/stripe-series-colors.png',
    detailHeroTitle: ['Thiết kế biểu tượng', 'trở lại sân cỏ'],
    heroImage: '/images/products/stripe-blue.png',
    modelImage: '/images/products/stripe-blue.png',
    frontImage: '/images/products/stripe-blue.png',
    backImage: '/images/products/stripe-blue.png',
    detailImages: [
      {
        image: '/images/products/stripe-blue/details/blue-product-img-1.jpg',
        eyebrow: '01 / LÊN FORM',
        title: 'Hai mặt. Một form áo.',
        caption: 'Mặt trước và sau trên cùng một khung hình.',
      },
      {
        image: '/images/products/stripe-blue/details/blue-product-img-3.jpg',
        eyebrow: '02 / PRODUCT SHOT',
        title: 'Sọc xanh, nhìn thật gần.',
        caption: 'Ảnh sản phẩm hoàn thiện với logo và hoạ tiết in.',
      },
      {
        image: '/images/products/stripe-blue/details/fabric.jpg',
        eyebrow: '03 / CHẤT VẢI',
        title: 'Zoom gần vẫn đẹp.',
        caption: 'Bề mặt mịn, nhẹ, thoát ẩm nhanh và giữ form sau nhiều trận.',
      },
      {
        image: '/images/products/stripe-blue/details/collar.jpg',
        eyebrow: '04 / CỔ ÁO',
        title: 'Gọn từ đường cổ.',
        caption: 'Bo cổ ôm vừa, hoàn thiện sạch và không cấn khi vận động.',
      },
      {
        image: '/images/products/stripe-blue/details/sleeve.jpg',
        eyebrow: '05 / TAY ÁO',
        title: 'Chi tiết không làm nền.',
        caption: 'Mảng phối và đường may được đặt để áo đẹp ở mọi góc nhìn.',
      },
      {
        image: '/images/products/stripe-blue/details/blue-product-img-6.jpg',
        eyebrow: '06 / ON PITCH',
        title: 'Lên sân, lên hình.',
        caption: 'Stripe Series trong điều kiện thi đấu thực tế.',
      },
    ],
    detailColorways: [
      {
        id: 'red-black',
        name: 'Đỏ đen',
        hex: '#e02620',
        ctaImage: '/images/products/stripe-red.png',
        images: [
          { image: '/images/products/stripe-red.png', title: 'Stripe Series đỏ đen', fit: 'contain' },
        ],
      },
      {
        id: 'blue-black',
        name: 'Xanh đen',
        hex: '#173dca',
        default: true,
        ctaImage: '/images/products/stripe-blue/stripe-blue-cta.png',
        images: [
          { image: '/images/products/stripe-blue/details/blue-product-img-1.jpg', title: 'Stripe Series xanh đen — mặt trước và sau' },
          { image: '/images/products/stripe-blue/details/blue-product-img-3.jpg', title: 'Stripe Series xanh đen — ảnh sản phẩm' },
          { image: '/images/products/stripe-blue/details/fabric.jpg', title: 'Stripe Series xanh đen — chất vải' },
          { image: '/images/products/stripe-blue/details/collar.jpg', title: 'Stripe Series xanh đen — cổ áo' },
          { image: '/images/products/stripe-blue/details/sleeve.jpg', title: 'Stripe Series xanh đen — tay áo' },
          { image: '/images/products/stripe-blue/details/blue-product-img-6.jpg', title: 'Stripe Series xanh đen — trên sân' },
        ],
      },
      {
        id: 'white-black',
        name: 'Trắng đen',
        hex: '#f2f1eb',
        border: '#bbbcb6',
        ctaImage: '/images/products/stripe-bw.png',
        images: [
          { image: '/images/products/stripe-bw.png', title: 'Stripe Series trắng đen', fit: 'contain' },
        ],
      },
    ],
    materialImages: [
      { image: '/images/products/stripe-blue/material-closeup.jpg', title: 'Bề mặt vải Stripe Series' },
      { image: '/images/products/stripe-blue/material-closeup.jpg', title: 'Chi tiết hoàn thiện Stripe Series' },
      { image: '/images/products/stripe-blue/material-closeup.jpg', title: 'Logo Driball trên nền vải Stripe Series' },
    ],
    printLayouts: [
      {
        image: '/images/products/stripe-blue/details/print-layout-01.jpg',
        label: 'FULL TEAM IDENTITY',
        title: 'Logo ngực · tài trợ giữa · tên số sau',
        tags: ['NGỰC TRÁI', 'GIỮA NGỰC', 'LƯNG ÁO'],
      },
      {
        image: '/images/products/stripe-blue/details/print-layout-02.jpg',
        label: 'PLAYER EDITION',
        title: 'Logo đôi · số trước · tên và số sau',
        tags: ['NGỰC PHẢI', 'SỐ TRƯỚC', 'TÊN + SỐ'],
      },
      {
        image: '/images/products/stripe-blue/details/held-shirt.jpg',
        label: 'CLEAN & CLASSIC',
        title: 'Logo đội · số áo · điểm nhấn tay áo',
        tags: ['LOGO ĐỘI', 'SỐ ÁO', 'ỐNG TAY'],
      },
    ],
    colors: [
      { name: 'Đỏ/Đen', hex: '#e02620', image: '/images/products/stripe-red.png', hoverImage: '/images/products/card-hover/red-team.png' },
      { name: 'Xanh/Đen', hex: '#173dca', image: '/images/products/stripe-blue.png', hoverImage: '/images/products/stripe-blue/details/model-back.jpg' },
      { name: 'Trắng/Đen', hex: '#f2f1eb', image: '/images/products/stripe-bw.png', hoverImage: '/images/products/card-hover/white-team.png' },
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
    cardHoverImage: '/images/products/card-hover/red-team.png',
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
    id: 'raglan-motion-series',
    slug: 'raglan-motion-series',
    name: 'RAGLAN MOTION',
    tagline: 'Vai áo chuyển động. Màu sắc không đứng yên.',
    category: 'new',
    availability: 'pre-order',
    price: 320000,
    bulkPrice: 310000,
    bulkMinQty: 10,
    description: 'Form raglan thể thao với mảng vai đồ hoạ, phù hợp cho đội muốn một diện mạo mạnh và hiện đại.',
    material: 'Vải thể thao quick-dry, thân áo thoáng khí và tay raglan linh hoạt.',
    heroImage: '/images/products/raglan/blue.jpg',
    cardHoverImage: '/images/products/raglan/white.jpg',
    modelImage: '/images/products/raglan/blue.jpg',
    frontImage: '/images/products/raglan/blue.jpg',
    backImage: '/images/products/raglan/white.jpg',
    colors: [
      { name: 'Navy/Đỏ', hex: '#173454', image: '/images/products/raglan/blue.jpg' },
      { name: 'Cam/Navy', hex: '#e85a2c', image: '/images/products/raglan/orange.jpg' },
      { name: 'Trắng/Đỏ', hex: '#ecebe7', image: '/images/products/raglan/white.jpg' },
      { name: 'Vàng/Đen', hex: '#f2c400', image: '/images/products/raglan/yellow.jpg' },
    ],
    images: [
      '/images/products/raglan/blue.jpg',
      '/images/products/raglan/orange.jpg',
      '/images/products/raglan/white.jpg',
      '/images/products/raglan/yellow.jpg',
    ],
    featured: true,
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
    cardHoverImage: '/images/products/card-hover/white-team.png',
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
    cardHoverImage: '/images/products/stripe-blue/details/model-back.jpg',
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
    cardHoverImage: '/images/products/card-hover/red-team.png',
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
    cardHoverImage: '/images/products/card-hover/white-team.png',
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

export function buildZaloMessage({ product, color, quantity, unitPrice, totalPrice, printOptions, upgradeOptions, quoteUrl }) {
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
  if (quoteUrl) lines.push(`Xem cấu hình báo giá: ${quoteUrl}`);

  return lines.filter(Boolean).join('\n');
}
