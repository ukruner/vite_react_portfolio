import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import App from '../src/App'
import { Provider } from 'react-redux'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../src/store/slices/userSlice'
import switcherSlice from '../src/store/slices/switchers'
import chatSlice from '../src/store/slices/chatSlice'

import {vi} from 'vitest';
import { postData2 } from '../src/utils/postMongo'
import {routes} from '../src/router'

describe('App testing suite, integration tests', () => {

  vi.mock('../src/utils/postMongo', () => ({
  postData2: vi.fn().mockResolvedValue(undefined),
}));

  const formDataPopulate = (elementArray) => {
    elementArray.forEach(obj => { 
      const {type} = obj;

      const [[key, value]] = Object.entries(obj).filter(
      ([k]) => k !== "type"
    );

      const elementToChange = screen.getByTestId(key)

      if (type === 'radio'){
        fireEvent.click(elementToChange);
        return;
      }

      else{
      fireEvent.change(elementToChange, {target: {value: value}})};
   
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

  it('submits the form with comprehensive dummy data - and in formSummary renders all of the text/links/videos needed', async () => {
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
        {offworkduration: "Over 6 months"},
        {caremodality: "Osteopath"},
        {careproviderPrivate: "Yes", type: "radio"},
        {exercisecount: "3-6"},
        {apptfrequency: "Once every 2-3 weeks"},
        {radioeducationNo: "No", type: "radio"}
      ]) 


      const submitButton = screen.getByTestId('submitbutton');
      fireEvent.click(submitButton);
      const bodypartFeedback = screen.getByText(/arguably the most common musculoskeletal problem in the world/i)
      expect(bodypartFeedback).toBeInTheDocument();
      const durationFeedback = screen.getByText(/If the treatment you have been receiving has not led you to full recovery/i)
      expect(durationFeedback).toBeInTheDocument();

      const offworkdurationFeedback = screen.getByText(/at this stage, if your mental health is affected /i)
      expect(offworkdurationFeedback).toBeInTheDocument();
      const modalityFeedback = screen.getByText(/typically a great blend of treatment knowledge of so called hands-on /i)
      expect(modalityFeedback).toBeInTheDocument();
      const providerFeedback = screen.getByText(/arguably most accessible way to get seen and assessed as quickly as possible/i)
      expect(providerFeedback).toBeInTheDocument();
      const exercisecountFeedback = screen.getByText(/your therapist either trusts your dedication, memory and level your body awareness/i)
      expect(exercisecountFeedback).toBeInTheDocument();
      const apptfrequencyFeedback = screen.getByText(/A reasonable approach with regular reviews, which private clinics and NHS/i)
      expect(apptfrequencyFeedback).toBeInTheDocument();
      const educationFeedback = screen.getByText(/communication between you and your therapist, as well as full awareness of your issue are 2 cornerstones of successful treatment and recovery./i)
      expect(educationFeedback).toBeInTheDocument();
      const helpfulResourceHeading = screen.getByText(/helpful resources/i)
      expect(helpfulResourceHeading).toBeInTheDocument();
      const tenFactsBackPain = screen.getByText(/10 facts about back pain/i)
      expect(tenFactsBackPain).toBeInTheDocument();
      const pregnancyInfo = screen.getByText(/pelvic girdle pain and other common conditions in pregnancy/i)
      expect(pregnancyInfo).toBeInTheDocument();
      const menopauseInfo = screen.getByText(/menopause and musculoskeletal health: why it matters/i)
      expect(menopauseInfo).toBeInTheDocument();
      const chronicPainInfo = screen.getByText(/chronic pain document/i)
      expect(chronicPainInfo).toBeInTheDocument();
      const chronicPainVideo = screen.getByText(/tame the beast/i)
      expect(chronicPainVideo).toBeInTheDocument();
      const backPainVideo = screen.getByText(/the truth about back pain most people don`t know/i)
      expect(backPainVideo).toBeInTheDocument();

      await waitFor(() => {
  expect(postData2).toHaveBeenCalledTimes(1);
});
  })
})