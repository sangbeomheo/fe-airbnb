interface ReservationInfo {
  checkin: string;
  checkout: string;
  minPrice: number;
  maxPrice: number;
  persons: {
    adult: number;
    child: number;
    infant: number;
  };
}

type AccommodationData = Array<{
  id: number;
  name: string;
  price: number[];
  latitude: number;
}>;

export type { ReservationInfo, AccommodationData };
