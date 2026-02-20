import { render, screen } from '@testing-library/react'
import { vi } from 'vitest';

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
import {  } from '../../../store/slices/switchers';

describe (" testing suite,", () => {

    const mockReduxSlice = {};

    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)


    useSelector.mockImplementation((selectorFn) => {
        return selectorFn(mockReduxSlice)
    })
})