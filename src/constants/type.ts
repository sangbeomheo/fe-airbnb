interface ReservationInfo {
  checkin: string;
  checkout: string;
  minPrice: number;
  maxPrice: number;
  personnel: {
    adult: number;
    child: number;
    preschooler: number;
  };
}

export type { ReservationInfo };
