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
import ResetButton from './ResetButton.jsx';
import { fireEvent } from '@testing-library/react';
import { switcherActions } from '../../../../store/slices/switchers';
import { chatActions } from '../../../../store/slices/chatSlice.js';
// import { changeChatLayout } from '../ChatNavigation.jsx';

describe ("Resetbutton testing suite,", () => {
    const mockReduxSlice = {switcherSlice: {
        sessionTerminated: true,
        isChatBoxOpen: true
    }};

    beforeEach(() => {
    vi.clearAllMocks(); 
  });
    console.log(mainStore.dispatch.mock.calls);

    it("runs resetState dispatch and runs changeChatLayout function in case sessionTerminated is true, the latter function then flips sessionTerminated to false and closes the chat", ()=> {
        useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })
    const mockFunction = vi.fn();

    render(<ResetButton changeChatLayout={mockFunction}/>);

    const button = screen.getByLabelText("resetbutton")
      fireEvent.click(button);
    
    expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'chatSlice/resetState'});

    });

    it("does not run any dispatch if sessionTerminated is false", ()=>{
      const mockSessionFalseSlice = {switcherSlice: {
        sessionTerminated: false,
        isChatBoxOpen: true
    }};
    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockSessionFalseSlice)
    })
    const mockFunction = vi.fn();

    render(<ResetButton changeChatLayout={mockFunction}/>);

    const button = screen.getByLabelText("resetbutton")
      fireEvent.click(button);

    expect(mainStore.dispatch).not.toHaveBeenCalled();

    })
})