import { gql } from "apollo-boost";

// BusInfoList
export const BUS_INFO_LIST_QUERY = gql`
  query RiderBusInfoList {
    RiderBusInfoList {
      busInfoes {
        CAR_REG_NO
      }
      count
    }
  }
`;

export const BUS_INFO_SEAT1_EDIT_QUERY = gql`
  mutation RiderBusInfoSeat1Edit($CAR_REG_NO: String!, $SEAT1: Boolean) {
    RiderBusInfoSeat1Edit(CAR_REG_NO: $CAR_REG_NO, SEAT1: $SEAT1)
  }
`;

export const BUS_INFO_SEAT2_EDIT_QUERY = gql`
  mutation RiderBusInfoSeat2Edit($CAR_REG_NO: String!, $SEAT2: Boolean) {
    RiderBusInfoSeat2Edit(CAR_REG_NO: $CAR_REG_NO, SEAT2: $SEAT2)
  }
`;

// Reservation
export const RESERVATION_LIST_QUERY = gql`
  query RiderReservationList(
    $keyword: String
    $skip: Int
    $first: Int
    $CAR_REG_NO: String!
  ) {
    RiderReservationList(
      keyword: $keyword
      orderBy: "id_DESC"
      skip: $skip
      first: $first
      CAR_REG_NO: $CAR_REG_NO
    ) {
      reservations {
        id
        CAR_REG_NO
        ROUTE_NO
        BUS_NODE_ID
        departureStation
        arrivalStation
        equipment
        memo
      }
      count
    }
  }
`;
