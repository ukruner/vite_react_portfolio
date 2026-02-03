
import { displayResponseData } from '../../utils/evaluateForm'
import ErrorPage from '../error/Error'
import ResponseElement from './customFormElements/responseElement'

export default function FormSummary() {
  const videos = displayResponseData.flatMap((entry) => entry.videos || [])

  return (
    <div className='form-summary-container'>
      {displayResponseData.length > 0 ? (
        <div className='questionnaire-box form-summary'>
          {displayResponseData.map((entry) => (
            <ResponseElement key={entry.id} entry={entry} />
          ))}

          {videos.length > 0 && (
            <div className='mt-6'>
              <h2 className='text-lg font-semibold mb-2'>
                Helpful video resources
              </h2>
              <VideoPreviewList videos={videos} />
            </div>
          )}
        </div>
      ) : (
        <ErrorPage formEmpty={true} />
      )}
    </div>
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
