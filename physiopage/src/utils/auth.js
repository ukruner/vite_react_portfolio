
import { useSelector } from 'react-redux';


export function getUserObject(){
    const user = useSelector(state => state.userSlice.user);
    return user;
}

