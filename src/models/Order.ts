import { PartRequest } from './PartRequest';
import { Store } from './Store';

export interface Order {
  id: string;
  status: number;
  storeId: string;
  userId: string;
  comment: string;
  date: Date;
  price: number;
  partRequestId: string;
  partRequest: PartRequest;
  store: Store;
}