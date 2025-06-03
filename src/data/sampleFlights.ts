
import { Flight } from "@/types/flight";

export const sampleFlights: Flight[] = [
  {
    code: "AA1234",
    route: { departure: "JFK", arrival: "LAX" },
    departureTime: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
    permitStatus: "processing",
    aircraft: "Boeing 737-800",
    gate: "A12",
    terminal: "1",
    metar: "KJFK 231651Z 24016KT 10SM FEW250 M04/M17 A3038 RMK AO2 SLP289",
    taf: "KJFK 231730Z 2318/2424 24016KT P6SM FEW250",
    rotaer: "Standard departure procedures apply. Contact ground on 121.9",
    passengerCount: 156
  },
  {
    code: "UA5678",
    route: { departure: "ORD", arrival: "DEN" },
    departureTime: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes from now
    permitStatus: "done",
    aircraft: "Airbus A320",
    gate: "B7",
    terminal: "2",
    metar: "KORD 231651Z 27012KT 10SM CLR 02/M06 A3041",
    taf: "KORD 231730Z 2318/2424 27012KT P6SM CLR",
    rotaer: "Runway 10L/28R active. Standard taxi procedures.",
    passengerCount: 142
  },
  {
    code: "DL9012",
    route: { departure: "ATL", arrival: "MIA" },
    departureTime: new Date(Date.now() + 90 * 60000).toISOString(), // 1.5 hours from now
    permitStatus: "pending",
    aircraft: "Boeing 757-200",
    gate: "C15",
    terminal: "3",
    passengerCount: 189
  },
  {
    code: "SW3456",
    route: { departure: "LAS", arrival: "PHX" },
    departureTime: new Date(Date.now() + 15 * 60000).toISOString(), // 15 minutes from now - should blink
    permitStatus: "processing",
    aircraft: "Boeing 737-700",
    gate: "D3",
    terminal: "1",
    passengerCount: 137
  },
  {
    code: "BA7890",
    route: { departure: "LHR", arrival: "JFK" },
    departureTime: new Date(Date.now() + 180 * 60000).toISOString(), // 3 hours from now
    permitStatus: "done",
    aircraft: "Boeing 787-9",
    gate: "E22",
    terminal: "4",
    metar: "EGLL 231650Z 25015KT 9999 SCT035 BKN045 05/01 Q1023",
    taf: "EGLL 231701Z 2318/2424 25015KT 9999 SCT035",
    rotaer: "Heathrow departures via DOVER transition",
    passengerCount: 254
  }
];
