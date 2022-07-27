import { Make } from './Make';
import { Part } from './Part';

export interface VehiclePart {
  part: Part;
  make: Make;
  model: Make;
  year: number;
  condition: string;
  quantity: number;
  description: string;
  source: string;
  type: string;
}