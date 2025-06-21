import { Ibook } from './Book';

export interface IWishlistItem {
  _id: string;
  user_id: string;
  book_id: string | Ibook;
  createdAt: string;
  updatedAt: string;
}

export interface IWishlistRequest {
  user_id: string;
  book_id: string;
}