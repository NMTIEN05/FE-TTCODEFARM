import { Ibook, IProductVariant } from './Book';

export interface ICartItem {
  _id: string;
  cart_id: string;
  book_id: Ibook;
  variant_id?: IProductVariant;
  quantity: number;
  price: number;
  added_at: string;
}

export interface ICart {
  _id: string;
  user_id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICartResponse {
  cart: ICart;
  items: ICartItem[];
}

export interface ICartTotal {
  total_amount: number;
  item_count: number;
  items: ICartItem[];
}