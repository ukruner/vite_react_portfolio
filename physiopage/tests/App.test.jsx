import { render, screen, fireEvent} from '@testing-library/react'
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

  const formDataPopulate = (elementArray) => {
    elementArray.forEach(obj => { 
      const {type} = obj;

      const [[key, value]] = Object.entries(obj).filter(
      ([k]) => k !== "type"
    );

      const elementToChange = screen.getByTestId(key)
      // console.log(elementToChange)

      if (type === 'radio'){
        fireEvent.click(elementToChange);
        return;
      }
      else{
      fireEvent.change(elementToChange, {target: {value: value}})};
      // console.log(key)
    })
  }
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

      const offwork = screen.getByTestId("offwork");
      fireEvent.click(offwork);
      const treatment = screen.getByTestId("treatment");
      fireEvent.click(treatment);
      
      formDataPopulate([{bodypart: "Lower back"}, 
        {duration: "Over 6 months"},
        {radiodiagnosisNo: "No", type: "radio"},
        {radiopregnancyYes: "Yes", type: "radio"},
        {radiomenopauseYes: "Yes", type: "radio"},
        {offwork: "Yes"},
        {offworkduration: "Over 6 months"},
        {treatment: "Yes"},
        {caremodality: "Osteopath"},
        {careproviderPrivate: "Private"},
        {exercisecount: "3-6"},
        {apptfrequency: "Once every 2-3 weeks"},
        {radioeducationYes: "Yes", type: "radio"}
      ]) 

      // const educationPart = screen.getByLabelText(/Have you been given/i)
      // console.log(educationPart)
      const submitButton = screen.getByTestId('submitbutton');
      fireEvent.click(submitButton);
      const education = screen.getByText(/any educational content/i)
      expect(education).toBeInTheDocument();
      
      
  })
})