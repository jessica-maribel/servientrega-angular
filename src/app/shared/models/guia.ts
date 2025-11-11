export interface DireccionParte {
  name: string;
  phone: string;
  address_line: string;
  city: string;
  province: string;
  country: string;
  lat: number | null;
  lng: number | null;
}

export interface ItemGuia {
  sku?: string;
  description: string;
  qty: number;
  weight_kg: number;
  value_usd?: number;
}

export type EstadoGuia = 'Pendiente' | 'En tránsito' | 'Entregado';

export interface Guia {
  remitente: DireccionParte;
  destinatario: DireccionParte;
  items: ItemGuia[];
  service: string;
  payment: {
    method: string;
    payer: string;
  };
  insurance?: {
    declared_value_usd?: number;
  };
  activo?: boolean;
  estado?: EstadoGuia;
  fecha_creacion?: string | Date;
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateGuiaRequest {
  remitente: DireccionParte;
  destinatario: DireccionParte;
  items: ItemGuia[];
  service: string;
  payment: {
    method: string;
    payer: string;
  };
  insurance?: {
    declared_value_usd?: number;
  };
}

