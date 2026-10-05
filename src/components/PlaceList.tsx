import type { Place, PlaceSort } from '../types/place'

type PlaceListProps = {
  places: Place[]
  onSelectPlace: (place: Place) => void
  totalCount: number
  sort: PlaceSort
  onSortChange: (sort: PlaceSort) => void
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  isLoading: boolean
  error: string
}

export function PlaceList({
  places,
  onSelectPlace,
  totalCount,
  sort,
  onSortChange,
  page,
  pageCount,
  onPageChange,
  isLoading,
  error,
}: PlaceListProps) {
  const firstVisiblePage = Math.max(1, Math.min(page - 2, pageCount - 4))
  const lastVisiblePage = Math.min(pageCount, firstVisiblePage + 4)

  return (
    <section className="results-section">
      <div className="results-heading">
        <div>
          <h2>여행지 목록</h2>
          <p>
            <strong>{totalCount.toLocaleString()}</strong>개의 장소를 찾았어요.
          </p>
        </div>
        <label className="sort-label">
          정렬
          <select
            value={sort}
            onChange={(event) => {
              const value = event.target.value
              if (value === 'Q' || value === 'A' || value === 'O') {
                onSortChange(value)
              }
            }}
          >
            <option value="Q">인기순</option>
            <option value="A">가나다순</option>
            <option value="O">최신순</option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="empty-state" role="alert">
          <strong>{error}</strong>
        </div>
      ) : isLoading ? (
        <div className="empty-state" role="status">
          <strong>장소 목록을 불러오는 중...</strong>
        </div>
      ) : (
        <div className="place-grid">
          {places.map((place) => {
            const hasCoordinates =
              place.latitude !== undefined && place.longitude !== undefined
            const mapUrl = hasCoordinates
              ? `https://map.kakao.com/link/map/${encodeURIComponent(place.title)},${place.latitude},${place.longitude}`
              : `https://map.kakao.com/link/search/${encodeURIComponent(place.title)}`

            return (
              <article className="place-card" key={place.contentid}>
                <div className="place-image">
                  {place.firstimage ? (
                    <img src={place.firstimage} alt="" />
                  ) : (
                    <div className="image-placeholder">KUIDE</div>
                  )}
                  <button
                    type="button"
                    className="save-button"
                    aria-label={`${place.title} 저장`}
                  >
                    ♡
                  </button>
                </div>
                <div className="place-content">
                  <span className="place-type">관광정보</span>
                  <h3>{place.title}</h3>
                  <p>{place.addr1 || '주소 정보가 없습니다.'}</p>
                  {place.tel && <small>{place.tel}</small>}
                  <button
                    type="button"
                    className="detail-link"
                    onClick={() => onSelectPlace(place)}
                  >
                    상세 정보 보기 <span>↗</span>
                  </button>
                  <a href={mapUrl} target="_blank" rel="noreferrer">
                    {hasCoordinates ? '좌표로 지도 보기' : '지도에서 검색'} <span>↗</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {!error && !isLoading && places.length === 0 && (
        <div className="empty-state">
          <strong>검색 결과가 없어요.</strong>
          <p>다른 지역이나 검색어로 다시 찾아보세요.</p>
        </div>
      )}

      {!error && pageCount > 1 && (
        <nav className="pagination" aria-label="장소 목록 페이지">
          <button
            type="button"
            aria-label="이전 페이지"
            disabled={isLoading || page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            이전
          </button>
          {Array.from(
            { length: lastVisiblePage - firstVisiblePage + 1 },
            (_, index) => firstVisiblePage + index,
          ).map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              aria-current={pageNumber === page ? 'page' : undefined}
              disabled={isLoading || pageNumber === page}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            aria-label="다음 페이지"
            disabled={isLoading || page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            다음
          </button>
        </nav>
      )}
    </section>
  )
}