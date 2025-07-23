export interface IProductVariant {
  _id: string;
  book_id: string;
  format: 'hardcover' | 'paperback' | 'pdf';
  price: number;
  stock_quantity: number;
  pages?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  file_size?: number;
  file_format?: 'PDF' | 'EPUB' | 'MOBI';
  is_available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ibook {
  _id: string;
  title: string;
  cover_image: string;
  price: number;
  category_id: { _id: string; name: string };
  author_id: { _id: string; name: string };
  publisher: string;
  publish_year: string;
  description: string;
  stock_quantity: number;
  variants?: IProductVariant[];
}
