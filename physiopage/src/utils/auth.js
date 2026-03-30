
import { useSelector } from 'react-redux';


export function getUserObject(){
    const user = useSelector(state => state.userSlice?.user ?? '');
    return user;
}

export function useAuthState() {
    return useSelector((state) => ({
        user: state.userSlice?.user ?? '',
        authResolved: state.userSlice?.authResolved ?? true,
    }));
}
