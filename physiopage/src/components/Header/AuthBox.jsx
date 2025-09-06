
import { switcherActions } from '../../store/slices/switchers'
import { getUserObject } from '../../utils/auth'
import mainStore from '../../store'
import { useNavigate } from 'react-router-dom';
import { Form, Link } from 'react-router-dom';


export default function AuthBox() {
  const user = getUserObject();
  const navigate = useNavigate();

  function navigateAuth(){
    mainStore.dispatch(switcherActions.setRouteHeader());
    navigate('/auth')
  }

  return (
    <>
    {user ? <Form action='/logout' method='post'><div id="authdiv" className='h-20 flex basis-[20%] place-items-end justify-end'>
        <button className='auth-button mr-[1rem]'>Log out</button>
        </div></Form> : 
        <div id="authdiv" className='h-20 flex basis-[20%] place-items-end justify-end'>
        <button onClick={navigateAuth} className='auth-button mr-[1rem]'>Log in/ Sign up</button>
        </div>}</>
    
  )
}
