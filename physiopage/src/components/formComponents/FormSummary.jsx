
import { displayResponseData } from '../../utils/evaluateForm'
import ErrorPage from '../error/Error'
import ResponseElement from './customFormElements/responseElement'

export default function FormSummary() {
  const links = displayResponseData.flatMap((entry) => entry.links || [])
  const videos = displayResponseData.flatMap((entry) => entry.videos || [])
  return (
    <section className='form-summary-container'>
      {displayResponseData.length > 0 ? (
        <div className='results-shell'>
          <div className='results-hero'>
            <p className='questionnaire-kicker'>Your results</p>
            <h1>Personalised starting points</h1>
            <p>
              These notes turn your questionnaire answers into practical next
              steps and resources to explore.
            </p>
          </div>

          <div className='form-summary'>
            <div className='results-section-heading'>
              <span>Assessment summary</span>
              <strong>{displayResponseData.length} answers</strong>
            </div>
            {displayResponseData.map((entry) => (
              <ResponseElement key={entry.id} entry={entry} />
            ))}
          </div>

          {(links.length > 0 || videos.length > 0) && (
            <div className='resources-panel'>
              <div className='results-section-heading'>
                <span>Helpful resources</span>
                <strong>{links.length + videos.length} items</strong>
              </div>
              {links.length > 0 && <LinksList links={links} />}
              {videos.length > 0 && <VideoPreviewList videos={videos} />}
            </div>
          )}
        </div>
      ) : (
        <ErrorPage formEmpty={true} />
      )}
    </section>
  )
}

function LinksList({ links }) {
  return (
    <ul className="resource-link-list">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link-card"
          >
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

function VideoPreviewList({ videos }) {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="video-card"
        >
          <div className="video-thumb-wrapper">
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              className="video-thumb"
            />
          </div>
          <div className="video-info">
            <p className="video-title">{video.title}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
