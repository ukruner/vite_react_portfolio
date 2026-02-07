import { render, screen } from '@testing-library/react'
import App from '../src/App'
import { Provider } from 'react-redux'
import mainStore from '../src/store'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../src/store/slices/userSlice'
import switcherSlice from '../src/store/slices/switchers'
import chatSlice from '../src/store/slices/chatSlice'

import {routes} from '../src/router'

describe('App', () => {

  const store = configureStore({
  reducer: {
    userSlice,
    chatSlice,
    switcherSlice
  },
  preloadedState: {
    userSlice: {
      user: "Patrick",
    },
    switcherSlice: undefined, chatSlice: undefined
  },
});

 const testRouter = createMemoryRouter(routes, {
      initialEntries: ["/questionnaire"],
    });

  it('renders text on home page', () => {
    render(<Provider store={store}>
      <RouterProvider router={testRouter}>
      <App />
      </RouterProvider>
      </Provider>);
    
    const stringElement = screen.getByText(/What is the body part affected?/i);
    expect(stringElement).toBeInTheDocument();
  })
})