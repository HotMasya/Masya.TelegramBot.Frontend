export interface RealtyObject {
  id: number;
  internalId?: number;
  streetId?: number;
  districtId?: number;
  wallMaterialId?: number;
  stateId?: number;
  agentId?: number;
  categoryId?: number;
  totalArea?: number;
  livingSpace?: number;
  kitchenSpace?: number;
  lotArea?: number;
  floor?: number;
  totalFloors?: number;
  rooms?: number;
  price?: number;
  phone?: string;
  description: string;
  mailingDate?: Date;
  createdAt: Date;
  editedAt: Date;
  images?: string[];
}
