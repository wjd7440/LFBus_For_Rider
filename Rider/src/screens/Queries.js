import { gql } from "apollo-boost";
//User
export const ACCOUNT_INFO_QUERY = gql`
  query {
    UserInfo {
      userId
      needHelp
      equipment
      memo
      createdAt
    }
  }
`;

//Login
export const LOGIN_QUERY = gql`
  mutation UserSignIn($userId: String!, $password: String!) {
    UserSignIn(userId: $userId, password: $password)
  }
`;

export const TOKENUPDATE_QUERY = gql`
  mutation UserTokenUpdate(
    $userId: String!
    $password: String!
    $deviceToken: String!
  ) {
    UserTokenUpdate(
      userId: $userId
      password: $password
      deviceToken: $deviceToken
    )
  }
`;

//Signup
export const USERID_CHECK_QUERY = gql`
  mutation UserIdChecker($userId: String!) {
    UserIdChecker(userId: $userId)
  }
`;

export const SIGNUP_QUERY = gql`
  mutation UserSignUp(
    $userId: String!
    $password: String!
    $needHelp: String
    $equipment: String!
    $memo: String
  ) {
    UserSignUp(
      userId: $userId
      password: $password
      needHelp: $needHelp
      equipment: $equipment
      memo: $memo
    )
  }
`;

// BusStationList
export const BUS_STATION_LIST_QUERY = gql`
  query UserBusStationList($latitude: String!, $longitude: String!) {
    UserBusStationList(latitude: $latitude, longitude: $longitude) {
      busStations {
        BUSSTOP_NM
        BUS_NODE_ID
        GPS_LATI
        GPS_LONG
      }
      count
    }
  }
`;

// BusInfo
export const BUS_INFO_QUERY = gql`
  query UserBusInfo($CAR_REG_NO: String!) {
    UserBusInfo(CAR_REG_NO: $CAR_REG_NO) {
      BUS_TYPE
      CAR_REG_NO
    }
  }
`;

// Reservation
export const RESERVATION_WRITE_QUERY = gql`
  mutation UserReservationWrite(
    $CAR_REG_NO: String!
    $ROUTE_NO: String!
    $BUS_NODE_ID: Int!
    $departureStation: String!
    $arrivalStation: String!
    $equipment: String
    $memo: String
  ) {
    UserReservationWrite(
      CAR_REG_NO: $CAR_REG_NO
      ROUTE_NO: $ROUTE_NO
      BUS_NODE_ID: $BUS_NODE_ID
      departureStation: $departureStation
      arrivalStation: $arrivalStation
      equipment: $equipment
      memo: $memo
    )
  }
`;

export const RESERVATION_LIST_QUERY = gql`
  query UserReservationList($keyword: String, $skip: Int, $first: Int) {
    UserReservationList(
      keyword: $keyword
      orderBy: "id_DESC"
      skip: $skip
      first: $first
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
