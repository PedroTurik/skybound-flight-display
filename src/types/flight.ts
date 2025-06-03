
export interface Flight {
  code: string;
  route: {
    departure: string;
    arrival: string;
  };
  departureTime: string; // UTC time
  permitStatus: 'pending' | 'processing' | 'done';
  aircraft: string;
  gate?: string;
  terminal?: string;
  metar?: string;
  rotaer?: string;
  taf?: string;
  specialInfo?: string;
  passengerCount?: number;
  delayed?: boolean;
  delayReason?: string;
}

export interface FlightPermit {
  id: string;
  flightCode: string;
  status: 'pending' | 'processing' | 'done';
  requestedAt: string;
  approvedAt?: string;
  documents: string[];
}
