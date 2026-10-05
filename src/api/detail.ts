import { apiClient } from './client'
import type { VisitDetailApiResponse, VisitDetailIntroRes } from '../types/api/visit'
import type { PlaceDetailData, PlaceInfoItem } from '../types/place'

type IntroField = [keyof VisitDetailIntroRes, string]

const introInfoLabels: Record<string, IntroField[]> = {
  '12': [
    ['accomcount', '수용인원'],
    ['chkbabycarriage', '유모차 대여'],
    ['chkcreditcard', '신용카드'],
    ['chkpet', '애완동물 동반'],
    ['expagerange', '체험 가능 연령'],
    ['expguide', '체험 안내'],
    ['heritage1', '세계문화유산'],
    ['heritage2', '세계자연유산'],
    ['heritage3', '세계기록유산'],
    ['infocenter', '문의 및 안내'],
    ['opendate', '개장일'],
    ['parking', '주차시설'],
    ['restdate', '쉬는 날'],
    ['useseason', '이용시기'],
    ['usetime', '이용시간'],
  ],
  '14': [
    ['accomcountculture', '수용인원'],
    ['chkbabycarriageculture', '유모차 대여'],
    ['chkcreditcardculture', '신용카드'],
    ['chkpetculture', '애완동물 동반'],
    ['discountinfo', '할인정보'],
    ['infocenterculture', '문의 및 안내'],
    ['parkingculture', '주차시설'],
    ['parkingfee', '주차요금'],
    ['restdateculture', '쉬는 날'],
    ['usefee', '이용요금'],
    ['usetimeculture', '이용시간'],
    ['scale', '규모'],
    ['spendtime', '관람 소요시간'],
  ],
  '15': [
    ['agelimit', '관람 가능 연령'],
    ['bookingplace', '예매처'],
    ['discountinfofestival', '할인정보'],
    ['eventstartdate', '행사 시작일'],
    ['eventenddate', '행사 종료일'],
    ['eventhomepage', '행사 홈페이지'],
    ['eventplace', '행사 장소'],
    ['festivalgrade', '축제 등급'],
    ['placeinfo', '행사장 위치 안내'],
    ['playtime', '공연시간'],
    ['program', '행사 프로그램'],
    ['spendtimefestival', '관람 소요시간'],
    ['sponsor1', '주최자'],
    ['sponsor1tel', '주최자 연락처'],
    ['sponsor2', '주관사'],
    ['sponsor2tel', '주관사 연락처'],
    ['subevent', '부대행사'],
    ['usetimefestival', '이용요금'],
  ],
  '25': [
    ['distance', '코스 총거리'],
    ['infocentertourcourse', '문의 및 안내'],
    ['schedule', '코스 일정'],
    ['taketime', '코스 총 소요시간'],
    ['theme', '코스 테마'],
  ],
  '28': [
    ['accomcountleports', '수용인원'],
    ['chkbabycarriageleports', '유모차 대여'],
    ['chkcreditcardleports', '신용카드'],
    ['chkpetleports', '애완동물 동반'],
    ['expagerangeleports', '체험 가능 연령'],
    ['infocenterleports', '문의 및 안내'],
    ['openperiod', '개장기간'],
    ['parkingfeeleports', '주차요금'],
    ['parkingleports', '주차시설'],
    ['reservation', '예약안내'],
    ['restdateleports', '쉬는 날'],
    ['scaleleports', '규모'],
    ['usefeeleports', '입장료'],
    ['usetimeleports', '이용시간'],
  ],
  '32': [
    ['accomcountlodging', '수용가능인원'],
    ['checkintime', '입실시간'],
    ['checkouttime', '퇴실시간'],
    ['chkcooking', '객실 내 취사'],
    ['foodplace', '식음료장'],
    ['infocenterlodging', '문의 및 안내'],
    ['parkinglodging', '주차시설'],
    ['pickup', '픽업서비스'],
    ['roomcount', '객실수'],
    ['reservationlodging', '예약안내'],
    ['reservationurl', '예약안내 홈페이지'],
    ['roomtype', '객실유형'],
    ['scalelodging', '규모'],
    ['subfacility', '부대시설'],
    ['barbecue', '바비큐장'],
    ['beauty', '뷰티시설'],
    ['beverage', '식음료장'],
    ['bicycle', '자전거 대여'],
    ['campfire', '캠프파이어'],
    ['fitness', '휘트니스센터'],
    ['karaoke', '노래방'],
    ['publicbath', '공용샤워실'],
    ['publicpc', '공용 PC실'],
    ['sauna', '사우나실'],
    ['seminar', '세미나실'],
    ['sports', '스포츠시설'],
    ['refundregulation', '환불규정'],
  ],
  '38': [
    ['chkbabycarriageshopping', '유모차 대여'],
    ['chkcreditcardshopping', '신용카드'],
    ['chkpetshopping', '애완동물 동반'],
    ['culturecenter', '문화센터'],
    ['fairday', '장서는날'],
    ['infocentershopping', '문의 및 안내'],
    ['opendateshopping', '개장일'],
    ['opentime', '영업시간'],
    ['parkingshopping', '주차시설'],
    ['restdateshopping', '쉬는 날'],
    ['restroom', '화장실'],
    ['saleitem', '판매품목'],
    ['saleitemcost', '판매품목별 가격'],
    ['scaleshopping', '규모'],
    ['shopguide', '매장안내'],
  ],
  '39': [
    ['chkcreditcardfood', '신용카드'],
    ['discountinfofood', '할인정보'],
    ['firstmenu', '대표메뉴'],
    ['infocenterfood', '문의 및 안내'],
    ['kidsfacility', '어린이놀이방'],
    ['opendatefood', '개업일'],
    ['opentimefood', '영업시간'],
    ['packing', '포장가능'],
    ['parkingfood', '주차시설'],
    ['reservationfood', '예약안내'],
    ['restdatefood', '쉬는 날'],
    ['scalefood', '규모'],
    ['seat', '좌석수'],
    ['smoking', '금연/흡연'],
    ['treatmenu', '취급메뉴'],
    ['lcnsno', '인허가번호'],
  ],
}

export async function fetchPlaceDetail(contentId: string, signal?: AbortSignal) {
  const response = await apiClient.get('/api/v1/visit/detail', {
    params: { contentId },
    signal,
    timeout: 30_000,
  })

  const data: VisitDetailApiResponse = response.data
  const common = data.data?.commonRes
  const intro = data.data?.introRes
  const images = data.data?.imageRes

  if (!common || !intro || !Array.isArray(images)) {
    throw new Error('장소 상세 응답 형식이 올바르지 않습니다.')
  }

  const addr1 = [toDisplayText(common.addr1), toDisplayText(common.addr2)]
    .filter(Boolean)
    .join(' ')
  const infoItems: PlaceInfoItem[] = []

  if (addr1) {
    infoItems.push({ label: '주소', value: addr1 })
  }

  const tel = toDisplayText(common.tel)
  if (tel) {
    infoItems.push({ label: '전화번호', value: tel })
  }

  for (const [field, label] of introInfoLabels[common.contenttypeid] || []) {
    const value = toDisplayText(intro[field])
    if (value) {
      infoItems.push({ label, value })
    }
  }

  const placeDetail: PlaceDetailData = {
    title: toDisplayText(common.title),
    addr1,
    tel: tel || undefined,
    homepage: toHomepage(common.homepage),
    firstimage: common.firstimage || undefined,
    contenttypeid: common.contenttypeid,
    overview:
      toDisplayText(common.overview) ||
      toDisplayText(intro.expguide) ||
      toDisplayText(intro.infocenter),
    infoItems,
    images: images
      .map((image) => ({
        url: image.originimgurl || image.smallimageurl,
        alt: toDisplayText(image.imgname) || toDisplayText(common.title),
      }))
      .filter((image) => Boolean(image.url)),
  }

  return placeDetail
}

function toHomepage(value?: string | null) {
  const hrefMatch = value?.match(/href=["']([^"']+)["']/i)
  if (hrefMatch?.[1]) {
    return hrefMatch[1]
  }

  const text = toDisplayText(value)
  return text || undefined
}

function toDisplayText(value?: string | null) {
  if (!value) return ''

  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}
