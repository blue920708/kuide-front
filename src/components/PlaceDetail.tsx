import { useState } from 'react'
import { usePlaceDetail } from '../hooks/usePlaceDetail'
import { contentTypes, type Place } from '../types/place'

type PlaceDetailProps = {
  place: Place
  onBack: () => void
}

export function PlaceDetail({ place, onBack }: PlaceDetailProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { detail, isLoading, error } = usePlaceDetail(place.contentid)
  const title = detail?.title || place.title
  const addr1 = detail?.addr1 || place.addr1
  const firstimage = detail?.firstimage || place.firstimage
  const contentTypeName =
    contentTypes.find((contentType) => {
      return contentType.code === (detail?.contenttypeid || place.contenttypeid)
    })?.name || '여행지 상세'
  const images =
    detail?.images.length
      ? detail.images
      : place.firstimage2
        ? [{ url: place.firstimage2, alt: `${title} 추가 사진` }]
        : []

  return (
    <section className="place-detail">
      <button type="button" className="detail-back-button" onClick={onBack}>
        ← 목록으로
      </button>

      {error ? (
        <div className="empty-state" role="alert">
          <strong>{error}</strong>
        </div>
      ) : isLoading ? (
        <div className="empty-state" role="status">
          <strong>장소 상세를 불러오는 중...</strong>
        </div>
      ) : (
        <>
          <div className="detail-hero">
            {firstimage ? (
              <img src={firstimage} alt={title} />
            ) : (
              <div className="image-placeholder">KUIDE</div>
            )}
            <div className="detail-hero-caption">
              <span className="place-type">{contentTypeName}</span>
              <h1>{title}</h1>
              <p>{addr1 || '주소 정보가 없습니다.'}</p>
            </div>
          </div>

          <div className="detail-main">
            <article className="detail-panel detail-introduction">
              <div className="detail-section-heading">
                <div>
                  <span className="step">01 / INTRO</span>
                  <h2>여행지 소개</h2>
                </div>
                <button
                  type="button"
                  className={`detail-save-button${isSaved ? ' is-saved' : ''}`}
                  aria-pressed={isSaved}
                  onClick={() => setIsSaved((saved) => !saved)}
                >
                  {isSaved ? '♥ 저장됨' : '♡ 저장'}
                </button>
              </div>
              {detail?.overview ? (
                <p className="detail-overview">{detail.overview}</p>
              ) : (
                <p className="detail-overview detail-placeholder">
                  상세 소개가 없습니다.
                </p>
              )}
            </article>

            <article className="detail-panel">
              <div className="detail-section-heading">
                <div>
                  <span className="step">02 / INFORMATION</span>
                  <h2>이용 안내</h2>
                </div>
              </div>
              {detail?.infoItems.length || detail?.homepage ? (
                <dl className="detail-info-list">
                  {detail.infoItems.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                  {detail.homepage && (
                    <div>
                      <dt>홈페이지</dt>
                      <dd>
                        {/^https?:\/\//i.test(detail.homepage) ? (
                          <a href={detail.homepage} target="_blank" rel="noreferrer">
                            {detail.homepage}
                          </a>
                        ) : (
                          detail.homepage
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="detail-overview detail-placeholder">
                  이용 안내가 없습니다.
                </p>
              )}
            </article>

            <article className="detail-panel">
              <div className="detail-section-heading">
                <div>
                  <span className="step">03 / GALLERY</span>
                  <h2>추가 이미지</h2>
                </div>
              </div>
              <div className="detail-gallery">
                {images.length > 0 ? (
                  images.map((image) => (
                    <img key={image.url} src={image.url} alt={image.alt} />
                  ))
                ) : (
                  <div className="detail-gallery-placeholder">
                    추가 이미지가 없습니다.
                  </div>
                )}
              </div>
            </article>
          </div>
        </>
      )}
    </section>
  )
}
