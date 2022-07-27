import { VehiclePart } from './VehiclePart';

export interface PartRequest {
  id: string;
  userId: string;
  vehiclePart: VehiclePart;
  date: Date;
  status: number;
}
