export interface Party {
  name: string;
  phone: string;
  address_line: string;
  city: string;
  province: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface ShipmentItem {
  sku?: string;
  description: string;
  qty: number;
  weight_kg: number;
  value_usd?: number;
}

export interface CreateShipmentRequest {
  sender: Party;
  recipient: Party;
  items: ShipmentItem[];
  service: string;
  payment: { method: 'prepaid' | 'cod'; payer: 'sender' | 'recipient' };
  insurance?: { declared_value_usd?: number };
}

export interface CreateShipmentResponse {
  shipment_id: string;
  status: 'pending' | 'in_transit' | 'delivered' | string;
  estimated_pickup_time?: string;
}

export interface ShipmentListItem {
  shipment_id: string;
  status: string;
  active: boolean;
  created_at: string;
}
