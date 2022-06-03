interface ReservationInfo {
  checkin: string | null;
  checkout: string | null;
  minPrice: number | null;
  maxPrice: number | null;
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
