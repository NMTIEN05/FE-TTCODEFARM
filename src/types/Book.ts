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
}
