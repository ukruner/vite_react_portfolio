import { render, screen } from '@testing-library/react'
import { vi } from 'vitest';
import * as storeModule from '../../../../store/index.js';

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock("../../../../store/index.js", () => ({
  default: {
    dispatch: vi.fn(),
  },
}));


import mainStore from '../../../../store/index.js';
import { useSelector, useDispatch } from 'react-redux';
import GlobalChatButton from './GlobalChatButton.jsx';
import { fireEvent } from '@testing-library/react';

describe ("Global chat button testing suite,", () => {

    const mockReduxSlice = {switcherSlice: {
        isChatBoxOpen: false
    }};

    const mockTrueSlice = {switcherSlice: {
        isChatBoxOpen: true
    }}

    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })

    console.log(mainStore.dispatch.mock.calls);

    it('sends dispatch to open the chat box with the value true, if chat is closed', ()=>{
        

  render(<GlobalChatButton/>);

  const button = screen.getByLabelText("globalchatbutton")
  fireEvent.click(button);

expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setChatBoxOpen', payload: true });

    });
    it('sends dispatch to close the chat box with the value false, if it had been open', ()=>{
        useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockTrueSlice)
    })

  render(<GlobalChatButton/>);

  const button = screen.getByLabelText("globalchatbutton")
  fireEvent.click(button);
expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setChatBoxOpen', payload: false });
 
    });
    it('sends dispatch to open the chat box with the value true, if chat is closed', ()=>{
  render(<GlobalChatButton/>);

  const button = screen.getByLabelText("globalchatbutton")
  fireEvent.click(button);
expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setChatBoxOpen', payload: true });

    });
})