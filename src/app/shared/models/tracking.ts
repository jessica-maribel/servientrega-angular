export interface TrackingEvent {
  timestamp: string;
  location: string;
  description: string;
}

export interface TrackingResponse {
  _id: string;
  status: string;
  eta?: string;
  events: TrackingEvent[];
}
