import { render, screen } from '@testing-library/react'
import App from '../src/App'
import { Provider } from 'react-redux'
import mainStore from '../src/store'

describe('App', () => {
  it('renders text on home page', () => {
    render(<Provider store={mainStore}><App /></Provider>)
    const stringElement = screen.getByText(/Musculoskeletal issues are extremely prevalent/i);
    expect(stringElement).toBeInTheDocument();
  })
})