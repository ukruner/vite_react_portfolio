import { render, screen } from '@testing-library/react'
import { vi } from 'vitest';
import Layout from '../../Layout';
import * as storeModule from '../../../store/index.js';

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock("../../../store/index.js", () => ({
  default: {
    dispatch: vi.fn(),
  },
}));

import mainStore from '../../../store/index.js';
import { useSelector, useDispatch } from 'react-redux';
import ChatNavigation from './ChatNavigation';
import { fireEvent } from '@testing-library/react';

describe ("Chatnavigation testing suite,", () => {

    const mockReduxSlice = {switcherSlice: {
        sessionTerminated: false,
        isChatBoxOpen: false
    }};

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls);

    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })

    it('does not display any buttons if chat box is not open, sessionTerminated is also false', ()=>{
        
        render(<ChatNavigation/>)
        expect(screen.queryByLabelText('layoutbutton')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('closebutton')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('resetbutton')).not.toBeInTheDocument();
        
    });

    it('displays Layoutbutton and Closebutton if chat box is open but not ResetButton, sessionTerminated false', () => {
        const chatTrueSlice = {switcherSlice: {
        sessionTerminated: false,
        isChatBoxOpen: true
    }};

        useSelector.mockImplementation((selectorFn) => {
        return selectorFn(chatTrueSlice)
    })
        render(<ChatNavigation/>)
        

        expect(screen.getByLabelText('layoutbutton')).toBeInTheDocument();
        expect(screen.getByLabelText('closebutton')).toBeInTheDocument();
        expect(screen.queryByLabelText('resetbutton')).not.toBeInTheDocument();
    });
    it('displays Layoutbutton and Resetbutton if chat box is open but not Closebutton, sessionTerminated true', () => {
        const chatTrueSlice = {switcherSlice: {
        sessionTerminated: true,
        isChatBoxOpen: true
    }};

        useSelector.mockImplementation((selectorFn) => {
        return selectorFn(chatTrueSlice)
    })
        render(<ChatNavigation/>)
        expect(screen.getByLabelText('layoutbutton')).toBeInTheDocument();
        expect(screen.queryByLabelText('closebutton')).not.toBeInTheDocument();
        expect(screen.getByLabelText('resetbutton')).toBeInTheDocument();
    });
    it("changeChatLayout function sends correct dispatch calls, and flips sessionTerminated to opposite value", ()=>{
        const chatTrueSlice = {switcherSlice: {
        sessionTerminated: true,
        isChatBoxOpen: true
    }};
    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(chatTrueSlice)
    })
        render(<ChatNavigation/>)
    const button = screen.getByLabelText("layoutbutton")
      fireEvent.click(button);
    expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setChatBoxOpen', payload: false });
    expect(mainStore.dispatch).toHaveBeenCalledWith({ type: 'switchers/setSessionTerminated', payload: false });

    })

    })

