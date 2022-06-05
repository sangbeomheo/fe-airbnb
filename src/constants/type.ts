interface ReservationInfo {
  period: {
    checkin: string | null;
    checkout: string | null;
  };
  price: {
    min: number;
    max: number;
    averages: number[];
  };
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
