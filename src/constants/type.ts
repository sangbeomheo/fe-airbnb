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

type AccommodationData = Array<{
  id: number;
  name: string;
  price: number[];
  latitude: number;
}>;

export type { ReservationInfo, AccommodationData };
