export type VisitCommonReq = {
  numOfRows?: number
  pageNo?: number
}

export const defaultVisitCommonReq = {
  numOfRows: 1_000_000,
  pageNo: 1,
}

export type VisitLdongReq = {
  numOfRows?: number
  pageNo?: number
  lDongRegnCd?: string
  lDongListYn?: string
}

export type VisitLclsSystmReq = {
  numOfRows?: number
  pageNo?: number
  lclsSystm1?: string
  lclsSystm2?: string
  lclsSystm3?: string
  lclsSystmListYn?: string
}

export type VisitAreaReq = {
  numOfRows?: number
  pageNo?: number
  arrange?: string
  keyword?: string
  contentTypeId?: string
  lDongRegnCd?: string
  lDongSignguCd?: string
  lclsSystm1?: string
  lclsSystm2?: string
  lclsSystm3?: string
  modifiedtime?: string
}

export type VisitLocationReq = {
  numOfRows?: number
  pageNo?: number
  arrange?: string
  mapX?: number
  mapY?: number
  radius?: number
  contentTypeId?: number
  lDongRegnCd?: string
  lDongSignguCd?: string
  lclsSystm1?: string
  lclsSystm2?: string
  lclsSystm3?: string
}

export type VisitLdongApiResponse = {
  code: string
  msg: string
  data: {
    items: VisitLdongRes[]
    totalCount: number
  }
}

export type VisitLclsSystmApiResponse = {
  code: string
  msg: string
  data: {
    items: VisitLclsSystmRes[]
    totalCount: number
  }
}

export type VisitAreaApiResponse = {
  code: string
  msg: string
  data: {
    items: VisitAreaRes[]
    totalCount: number
  }
}

export type VisitLdongRes = {
  lDongRegnCd: string
  lDongRegnNm: string
  lDongSignguCd: string
  lDongSignguNm: string
  rnum: number
}

export type VisitLclsSystmRes = {
  lclsSystm1Cd: string | null
  lclsSystm1Nm: string | null
  lclsSystm2Cd: string | null
  lclsSystm2Nm: string | null
  lclsSystm3Cd: string | null
  lclsSystm3Nm: string | null
  rnum: number
}

export type VisitAreaRes = {
  addr1: string
  addr2: string
  contentid: string
  contenttypeid: string
  createdtime: string
  firstimage: string
  firstimage2: string
  cpyrhtDivCd: string
  mapx: string
  mapy: string
  mlevel: string
  modifiedtime: string
  tel: string
  title: string
  zipcode: string
  lDongRegnCd: string
  lDongSignguCd: string
  lclsSystm1: string
  lclsSystm2: string
  lclsSystm3: string
}

export type VisitDetailApiResponse = {
  code: string
  msg: string
  data: VisitDetailRes
}

export type VisitDetailReq = {
  contentId: string
}

export type VisitDetailRes = {
  commonRes: VisitDetailCommonRes
  introRes: VisitDetailIntroRes
  imageRes: VisitDetailImageRes[]
}

export type VisitDetailCommonRes = {
  contentid: string
  contenttypeid: string
  title: string
  tel: string
  telname: string
  homepage: string
  booktour: string
  firstimage: string
  firstimage2: string
  cpyrhtDivCd: string
  areacode: string
  sigungucode: string
  lDongRegnCd: string
  lDongSignguCd: string
  cat1: string
  cat2: string
  cat3: string
  addr1: string
  addr2: string
  zipcode: string
  mapx: string
  mapy: string
  mlevel: string
  overview: string
}

export type VisitDetailIntroRes = {
  contentid: string
  contenttypeid: string
  accomcount: string | null
  chkbabycarriage: string | null
  chkcreditcard: string | null
  chkpet: string | null
  expagerange: string | null
  expguide: string | null
  heritage1: string | null
  heritage2: string | null
  heritage3: string | null
  infocenter: string | null
  opendate: string | null
  parking: string | null
  restdate: string | null
  useseason: string | null
  usetime: string | null
  accomcountculture: string | null
  chkbabycarriageculture: string | null
  chkcreditcardculture: string | null
  chkpetculture: string | null
  discountinfo: string | null
  infocenterculture: string | null
  parkingculture: string | null
  parkingfee: string | null
  restdateculture: string | null
  usefee: string | null
  usetimeculture: string | null
  scale: string | null
  spendtime: string | null
  agelimit: string | null
  bookingplace: string | null
  discountinfofestival: string | null
  eventenddate: string | null
  eventhomepage: string | null
  eventplace: string | null
  eventstartdate: string | null
  festivalgrade: string | null
  placeinfo: string | null
  playtime: string | null
  program: string | null
  spendtimefestival: string | null
  sponsor1: string | null
  sponsor1tel: string | null
  sponsor2: string | null
  sponsor2tel: string | null
  subevent: string | null
  usetimefestival: string | null
  distance: string | null
  infocentertourcourse: string | null
  schedule: string | null
  taketime: string | null
  theme: string | null
  accomcountleports: string | null
  chkbabycarriageleports: string | null
  chkcreditcardleports: string | null
  chkpetleports: string | null
  expagerangeleports: string | null
  infocenterleports: string | null
  openperiod: string | null
  parkingfeeleports: string | null
  parkingleports: string | null
  reservation: string | null
  restdateleports: string | null
  scaleleports: string | null
  usefeeleports: string | null
  usetimeleports: string | null
  accomcountlodging: string | null
  checkintime: string | null
  checkouttime: string | null
  chkcooking: string | null
  foodplace: string | null
  infocenterlodging: string | null
  parkinglodging: string | null
  pickup: string | null
  roomcount: string | null
  reservationlodging: string | null
  reservationurl: string | null
  roomtype: string | null
  scalelodging: string | null
  subfacility: string | null
  barbecue: string | null
  beauty: string | null
  beverage: string | null
  bicycle: string | null
  campfire: string | null
  fitness: string | null
  karaoke: string | null
  publicbath: string | null
  publicpc: string | null
  sauna: string | null
  seminar: string | null
  sports: string | null
  refundregulation: string | null
  chkbabycarriageshopping: string | null
  chkcreditcardshopping: string | null
  chkpetshopping: string | null
  culturecenter: string | null
  fairday: string | null
  infocentershopping: string | null
  opendateshopping: string | null
  opentime: string | null
  parkingshopping: string | null
  restdateshopping: string | null
  restroom: string | null
  saleitem: string | null
  saleitemcost: string | null
  scaleshopping: string | null
  shopguide: string | null
  chkcreditcardfood: string | null
  discountinfofood: string | null
  firstmenu: string | null
  infocenterfood: string | null
  kidsfacility: string | null
  opendatefood: string | null
  opentimefood: string | null
  packing: string | null
  parkingfood: string | null
  reservationfood: string | null
  restdatefood: string | null
  scalefood: string | null
  seat: string | null
  smoking: string | null
  treatmenu: string | null
  lcnsno: string | null
}

export type VisitDetailImageRes = {
  contentid: string
  imgname: string
  originimgurl: string
  smallimageurl: string
  cpyrhtDivCd: string
  serialnum: string
}

export type VisitLocationRes = {
  addr1: string
  addr2: string
  zipcode: string
  areacode: string
  cat1: string
  cat2: string
  cat3: string
  contentid: string
  contenttypeid: string
  createdtime: string
  dist: string
  firstimage: string
  firstimage2: string
  cpyrhtDivCd: string
  mapx: string
  mapy: string
  mlevel: string
  modifiedtime: string
  sigungucode: string
  tel: string
  title: string
  lDongRegnCd: string
  lDongSignguCd: string
  lclsSystm1: string
  lclsSystm2: string
  lclsSystm3: string
}
