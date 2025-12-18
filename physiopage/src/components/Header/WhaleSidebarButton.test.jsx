import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import React from 'react'
import * as storeModule from '../../store/index.js';
import { forwardRef, useImperativeHandle } from 'react';

vi.mock('react-redux', () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
}))

vi.mock('../../store/index.js', () => ({
    default: {
        dispatch: vi.fn(),
    },
}))

const mockStart = vi.fn();
const mockStop = vi.fn();
const mockToggle = vi.fn();

vi.mock('react-freezeframe', () => ({
  default: forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      start: mockStart,
      stop: mockStop,
      toggle: mockToggle,
    }));

    return (
      <img
        data-testid="freeze-frame"
        alt={props.alt}
      />
    );
  }),
}));

import mainStore from '../../store/index.js'
import { useSelector, useDispatch } from 'react-redux'
import WhaleSidebarButton from './WhaleSidebarButton.jsx'
import { switcherActions } from '../../store/slices/switchers.js'

describe('WhaleButton testing suite,', () => {

    
    beforeEach(() => {
    vi.clearAllMocks();
  });
    
    const mockReduxSlice = { switcherSlice: { isSideBarOpen: false } }

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)

    console.log(mainStore.dispatch.mock.calls)

    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    });
    it("displays Want to know more?", ()=>{
        render(<WhaleSidebarButton/>);
        expect(screen.getByText("Want to know more?")).toBeVisible();
    });
    it("neither children buttons do not have white background or curved edges if not hovered onto", ()=>{
        render(<WhaleSidebarButton/>);
        const whaleParentContainer = screen.getByLabelText('whale-parentcontainer');
        const textParentContainer = screen.getByLabelText('text-parentcontainer');
        expect(whaleParentContainer).not.toHaveClass('rounded-tl-[9999px] rounded-tr-[9999px] bg-white');
        expect(textParentContainer).not.toHaveClass('rounded-tr-3xl bg-white');
    })
    it("both button children backgrounds become white and rounded, if whale is hovered onto. Also, the whale starts moving.", ()=>{
render(<WhaleSidebarButton/>);
        const whaleParentContainer = screen.getByLabelText('whale-parentcontainer');
        const textParentContainer = screen.getByLabelText('text-parentcontainer');

        fireEvent.mouseEnter(whaleParentContainer);
        expect(whaleParentContainer).toHaveClass('rounded-tl-[9999px] rounded-tr-[9999px] bg-white')
        expect(textParentContainer).toHaveClass('rounded-tr-3xl bg-white')
        expect(mockStart).toHaveBeenCalledTimes(1);

    });
it("both button children backgrounds become white and rounded, if text button is hovered onto.", ()=>{
render(<WhaleSidebarButton/>);
        const whaleParentContainer = screen.getByLabelText('whale-parentcontainer');
        const textParentContainer = screen.getByLabelText('text-parentcontainer');
        fireEvent.mouseEnter(textParentContainer);
        expect(whaleParentContainer).toHaveClass('rounded-tl-[9999px] rounded-tr-[9999px] bg-white')
        expect(textParentContainer).toHaveClass('rounded-tr-3xl bg-white')

    });
    
    it("freezeFrame doesn't move if button isn't highlighted", ()=>{
render(<WhaleSidebarButton/>);
        const whaleParentContainer = screen.getByLabelText('whale-parentcontainer');
        fireEvent.mouseLeave(
      whaleParentContainer
    );
    expect(mockStop).toHaveBeenCalledTimes(1);
    });
    it("dispatches to open sidebar once the whalebutton is clicked", ()=>{
                render(<WhaleSidebarButton/>);
            const buttonElement = screen.getByLabelText('grandparent-container');
            fireEvent.click(buttonElement);
            expect(mainStore.dispatch).toHaveBeenCalledWith({type: 'switchers/setIsSidebarOpen'})
    });
    it("stops freezeframe motion if clicked and sidebar opens", ()=>{
        render(<WhaleSidebarButton/>);
        const buttonElement= screen.getByLabelText('grandparent-container');
        fireEvent.click(buttonElement);
        expect(mockToggle).toHaveBeenCalledTimes(1);

    });

})