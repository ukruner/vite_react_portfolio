
import { switcherActions } from '../../store/slices/switchers'
import { getUserObject } from '../../utils/auth'
import mainStore from '../../store'
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-router-dom';


export default function AuthBox() {
  const user = getUserObject();
  const navigate = useNavigate();

  function navigateAuth(){
    mainStore.dispatch(switcherActions.setRouteHeader(true));
    navigate('/auth')
  }

  return (
    <>
    {user ? <Form action='/logout' method='post'><div id="authdiv" className='authbox-container'>
        <button className='auth-button'>Log out</button>
        </div></Form> : 
        <div id="authdiv" className='authbox-container'>
        <button onClick={navigateAuth} className='auth-button'>Log in/ Sign up</button>
        </div>}</>
    
  )
}
