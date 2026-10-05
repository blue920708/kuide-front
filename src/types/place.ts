/** 시·군·구 선택 항목을 표현합니다. */
export type District = {
  code: string
  name: string
}

/** 지역 선택 항목과 해당 지역의 시·군·구 목록을 표현합니다. */
export type Region = {
  code: string
  name: string
  districts: District[]
}

export type Category = {
  code: string
  name: string
  children: Category[]
}

export type ContentType = {
  code: string
  name: string
}

export const contentTypes: ContentType[] = [
  { code: '12', name: '관광지' },
  { code: '14', name: '문화시설' },
  { code: '15', name: '축제·공연·행사' },
  { code: '25', name: '여행코스' },
  { code: '28', name: '레포츠' },
  { code: '32', name: '숙박' },
  { code: '38', name: '쇼핑' },
  { code: '39', name: '음식점' },
]

export type PlaceInfoItem = {
  label: string
  value: string
}

export type PlaceImage = {
  url: string
  alt: string
}

/** 장소 상세 화면에서 사용하는 정보를 표현합니다. */
export type PlaceDetailData = {
  title: string
  addr1: string
  tel?: string
  homepage?: string
  firstimage?: string
  contenttypeid: string
  overview: string
  infoItems: PlaceInfoItem[]
  images: PlaceImage[]
}

/** 검색 결과 목록에서 사용하는 장소 정보를 표현합니다. */
export type Place = {
  title: string
  addr1: string
  firstimage?: string
  firstimage2?: string
  contentid: string
  contenttypeid: string
  longitude?: number
  latitude?: number
  tel?: string
  regionCode: string
  districtCode: string
  cat1?: string
  cat2?: string
  cat3?: string
}

/** 장소 목록의 정렬 방식을 나타냅니다: 인기순(Q), 가나다순(A), 최신순(O). */
export type PlaceSort = 'Q' | 'A' | 'O'
