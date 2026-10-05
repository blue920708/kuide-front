import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { PlaceDetail } from './components/PlaceDetail'
import { PlaceList } from './components/PlaceList'
import { PlaceSearchForm } from './components/PlaceSearchForm'
import { usePlaces } from './hooks/usePlaces'
import type { VisitAreaReq } from './types/api/visit'
import type { Place, PlaceSort } from './types/place'

const defaultSort: PlaceSort = 'Q'
const placesPerPage = 20

function App() {
  const [regionCode, setRegionCode] = useState('')
  const [districtCode, setDistrictCode] = useState('')
  const [contentTypeCode, setContentTypeCode] = useState('')
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [category3, setCategory3] = useState('')
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState(defaultSort)
  const [searchFilters, setSearchFilters] = useState<VisitAreaReq>({})
  const [pageNo, setPageNo] = useState(1)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const { places, totalCount, isLoading, error } = usePlaces({
    ...searchFilters,
    arrange: sort,
    numOfRows: placesPerPage,
    pageNo,
  })

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSearchFilters({
      keyword: keyword.trim() || undefined,
      contentTypeId: contentTypeCode || undefined,
      lDongRegnCd: regionCode || undefined,
      lDongSignguCd: districtCode || undefined,
      lclsSystm1: category1 || undefined,
      lclsSystm2: category2 || undefined,
      lclsSystm3: category3 || undefined,
    })
    setPageNo(1)
  }

  const handleRegionChange = (regionCode: string) => {
    setRegionCode(regionCode)
    setDistrictCode('')
  }

  const handleCategory1Change = (categoryCode: string) => {
    setCategory1(categoryCode)
    setCategory2('')
    setCategory3('')
  }

  const handleCategory2Change = (categoryCode: string) => {
    setCategory2(categoryCode)
    setCategory3('')
  }

  const handleReset = () => {
    setRegionCode('')
    setDistrictCode('')
    setContentTypeCode('')
    setCategory1('')
    setCategory2('')
    setCategory3('')
    setKeyword('')
    setSort('Q')
    setSearchFilters({})
    setPageNo(1)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="KUIDE home">
          <span className="brand-mark">K</span>
          <span>KUIDE</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a className="active" href="#search">
            관광정보
          </a>
          <a href="#about">서비스 안내</a>
        </nav>
      </header>

      <main>
        {selectedPlace ? (
          <PlaceDetail
            key={selectedPlace.contentid}
            place={selectedPlace}
            onBack={() => setSelectedPlace(null)}
          />
        ) : (
          <>
            <section className="intro-section">
              <div className="intro-copy">
                <p className="eyebrow">
                  <span className="eyebrow-dot"></span>
                  KUIDE TRAVEL DESK
                  <span className="eyebrow-separator">/</span>
                  DOMESTIC BOARD
                </p>
                <h1>어디로 떠날까요?</h1>
                <p>지역과 테마를 골라 지금 가기 좋은 여행지를 찾아보세요.</p>
              </div>
              <div className="intro-image" role="img" aria-label="햇살 아래 바다와 산이 어우러진 한국의 여행 풍경">
                <svg
                  className="travel-illustration"
                  viewBox="0 0 800 520"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <linearGradient id="travel-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#f8c77e" />
                      <stop offset="1" stopColor="#f7e5bd" />
                    </linearGradient>
                    <linearGradient id="travel-sea" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#4aabb1" />
                      <stop offset="1" stopColor="#146984" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="520" fill="url(#travel-sky)" />
                  <circle cx="615" cy="128" r="62" fill="#fff2c8" opacity=".9" />
                  <path d="M0 298 133 160l105 119 126-164 166 190 114-117 156 131v201H0Z" fill="#547b71" />
                  <path d="m0 333 184-116 112 123 136-114 154 119 108-91 106 78v188H0Z" fill="#345f5b" />
                  <path d="M0 337c138-20 239 26 371 13 137-14 277-50 429-13v183H0Z" fill="url(#travel-sea)" />
                  <path d="M0 391c138-31 253 26 388 8 145-20 270-41 412-12" fill="none" stroke="#c7e6d7" strokeWidth="5" opacity=".75" />
                  <path d="M0 434c119-16 197 24 317 11 145-16 311-39 483-11" fill="none" stroke="#a9d6d2" strokeWidth="3" opacity=".7" />
                  <path d="M94 520c82-66 141-111 235-121 52-6 89 12 136 8 58-5 92-38 153-26 48 10 81 47 124 63 23 9 41 11 58 10v66Z" fill="#e6b66c" />
                  <path d="M505 520c-2-64 15-112 53-146 26-23 54-34 83-49" fill="none" stroke="#fff0cf" strokeWidth="7" strokeLinecap="round" />
                </svg>
                <span className="boarding-stamp">TRAVEL 01 · NOW BOARDING</span>
                <div className="visual-caption">
                  <span>NEXT DESTINATION</span>
                  <strong>KOREA</strong>
                </div>
              </div>
            </section>

            <PlaceSearchForm
              region={regionCode}
              district={districtCode}
              contentType={contentTypeCode}
              category1={category1}
              category2={category2}
              category3={category3}
              keyword={keyword}
              onRegionChange={handleRegionChange}
              onDistrictChange={setDistrictCode}
              onContentTypeChange={setContentTypeCode}
              onCategory1Change={handleCategory1Change}
              onCategory2Change={handleCategory2Change}
              onCategory3Change={setCategory3}
              onKeywordChange={setKeyword}
              onSubmit={handleSearchSubmit}
              onReset={handleReset}
            />

            <PlaceList
              places={places}
              onSelectPlace={setSelectedPlace}
              totalCount={totalCount}
              sort={sort}
              onSortChange={(nextSort) => {
                setSort(nextSort)
                setPageNo(1)
              }}
              page={pageNo}
              pageCount={Math.ceil(totalCount / placesPerPage)}
              onPageChange={setPageNo}
              isLoading={isLoading}
              error={error}
            />
          </>
        )}
      </main>

      <section className="service-about" id="about">
        <div className="service-about-heading">
          <span className="step">ABOUT KUIDE</span>
          <h2>여행지 찾기, KUIDE와 함께</h2>
        </div>
        <p>
          KUIDE는 지역과 여행 테마, 키워드로 국내 여행지를 둘러볼 수 있는
          관광정보 안내 서비스입니다. 장소별 소개와 이용 정보, 사진을 확인하고
          지도에서 위치를 찾아 나만의 여행을 계획해 보세요.
        </p>
        <span className="service-about-note">
          관광지 정보는 공공 관광정보를 바탕으로 제공되며, 운영시간과 이용 조건은
          방문 전에 해당 장소에 확인해 주세요.
        </span>
      </section>

      <footer>
        <span>KUIDE</span>
        <span>지역 정보 API 연동 · 관광지 목록 제공</span>
      </footer>
    </div>
  )
}

export default App