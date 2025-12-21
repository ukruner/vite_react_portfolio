import { vi } from 'vitest'

import * as storeModule from '../../store/index.js'


vi.mock('../../store/index.js', () => ({
    default: {
        getState: vi.fn(() => ({
            
            userSlice: {},
        })),
        dispatch: vi.fn(),
        subscribe: vi.fn(),
    },
}))

vi.mock(import('react-redux'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useDispatch: vi.fn(),
    }
})

import mainStore from '../../store'

import { useDispatch } from 'react-redux'
import { describe, it, expect } from 'vitest'
import { logoutAction } from "./Authentication";

describe("LogoutAction function testing suite", ()=>{
    const mockDispatch = vi.fn()
    useDispatch.mockReturnValue(mockDispatch)
    console.log(mainStore.dispatch.mock.calls)

    global.fetch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks()

    })
    
   

    it("Logs out fine if user exists, ok response is received, therefore dispatching an action to clear the user object", async ()=>{
        mainStore.getState.mockReturnValue({
            userSlice: {user: 'loggedinuser'}, ...mainStore.getState,
        })

        global.fetch.mockResolvedValue({
            ok: true,
            json: () => {}                    
        });
    
        const response = await logoutAction();
        expect(mainStore.dispatch).toHaveBeenCalledWith({type: 'userSlice/clearUser'})
        expect(response.headers.get('Location')).toBe('/')

    });

    it("Log out doesnt happen because reponse received is not ok", async ()=>{

          vi.spyOn(console, 'error').mockImplementation(() => {});

        mainStore.getState.mockReturnValue({
            userSlice: {user: 'loggedinuser'}, ...mainStore.getState,
        })

        global.fetch.mockRejectedValue(new Error('unspecified-logout-error'))
    
        await expect(logoutAction()).rejects.toThrow('unspecified-logout-error')
        expect(mainStore.dispatch).not.toHaveBeenCalled();
    })

})