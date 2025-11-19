import { render, screen } from '@testing-library/react'

import Layout from '../../../Layout.jsx';
import * as storeModule from '../../../../store/index.js';
import { vi } from 'vitest';

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
import CloseButton from './CloseButton.jsx';
import { fireEvent } from '@testing-library/react';
import { switcherActions } from '../../../../store/slices/switchers';
import { chatActions } from '../../../../store/slices/chatSlice.js';
// import { changeChatLayout } from '../ChatNavigation.jsx';

describe ("Closebutton testing suite,", () => {
    const mockReduxSlice = {chatSlice: {
            history: [
                { sender: 'ai', text: 'Mock 1' },
                { sender: 'user', text: 'Mock 2' },
            ],
        },
        switcherSlice: {
        sessionTerminated: true,
        isChatBoxOpen: true
    }};

     beforeEach(() => {
    vi.clearAllMocks(); 
  });

    console.log(mainStore.dispatch.mock.calls);

    it("runs clearState dispatch and runs changeChatLayout function in case sessionTerminated is true, the latter function then flips sessionTerminated to false and closes the chat", ()=> {
        useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })
    const mockFunction = vi.fn();
    vi.useFakeTimers();
    render(<CloseButton changeChatLayout={mockFunction}/>);

    const button = screen.getByLabelText("closebutton")
      fireEvent.click(button);
    
      
    expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'chatSlice/clearState'});
    expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setSessionTerminated', payload: true});
    vi.runAllTimers();
    expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setChatBotOnline', payload: false});
    vi.useRealTimers();
    });

    it("does not run any dispatch if chathistory length is 0, and runs changeChatLayout instead", ()=>{
        const mockEmptyChatSlice = {chatSlice: {
            history: [    
            ],
        },
        switcherSlice: {
        sessionTerminated: true,
        isChatBoxOpen: true
    }};
    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockEmptyChatSlice)
    })
    const mockFunction = vi.fn();

    render(<CloseButton changeChatLayout={mockFunction}/>);

    const button = screen.getByLabelText("closebutton")
      fireEvent.click(button);
      expect(mockFunction).toHaveBeenCalled();
      expect(mainStore.dispatch).not.toHaveBeenCalled();
    })
})