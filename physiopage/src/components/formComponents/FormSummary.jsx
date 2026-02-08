
import { displayResponseData } from '../../utils/evaluateForm'
import ErrorPage from '../error/Error'
import ResponseElement from './customFormElements/responseElement'

export default function FormSummary() {
  const links = displayResponseData.flatMap((entry) => entry.links || [])
  const videos = displayResponseData.flatMap((entry) => entry.videos || [])
  // console.log(displayResponseData);
  return (
    <div className='form-summary-container'>
      {displayResponseData.length > 0 ? (
        <div className='questionnaire-box form-summary'>
          {displayResponseData.map((entry) => (
            <ResponseElement key={entry.id} entry={entry} />
          ))}

          {(links.length > 0 || videos.length > 0) && (
            <div className='mt-6'>
              <h2 className='text-lg font-semibold mb-2'>
                Helpful resources
              </h2>
              {links.length > 0 && (
                <LinksList links={links} />
              )}
              {videos.length > 0 && (
                <div className='mt-4'>
                  <VideoPreviewList videos={videos} />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <ErrorPage formEmpty={true} />
      )}
    </div>
  )
}

function LinksList({ links }) {
  return (
    <ul className="space-y-1 text-left">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
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
