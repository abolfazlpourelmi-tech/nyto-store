export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: Category;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  specifications?: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  parentId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  stock: number;
  priceModifier?: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: "online" | "cod";
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string[];
  inStock?: boolean;
  sortBy?: SortOption;
}

export type SortOption =
  | "relevant"
  | "mostviewed"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "bestselling"
  | "rating";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
