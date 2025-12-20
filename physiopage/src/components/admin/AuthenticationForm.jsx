
import { Form, Link, useActionData, useNavigation, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function AuthenticationForm() {
    const [searchParams] = useSearchParams();

    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    
    const routeParallax = useSelector(state => state.switcherSlice.routeParallax);
    const routeHeader = useSelector(state => state.switcherSlice.routeHeader);
    const routeSidebar = useSelector(state => state.switcherSlice.routeSidebar);


    const mode = searchParams.get('mode') || 'login'
    // to make sure only one route to Auth is true at any given moment
    
  return (
    <>
        <Form method='post' className='auth-form-element'>
           <div>{mode === 'login' && <h1 className='text-3xl'>
            {routeParallax && <div aria-label='route-parallax-text'>To access the form, please</div>}
           {routeHeader && <div aria-label='route-header-text'>To access useful content, please</div>}
           {routeSidebar && <div aria-label='route-sidebar-text'>To access links on health related content, please</div>}
           </h1>}
     
           <h1 className='text-3xl' aria-label='header-form-text'>{mode === 'signup' ? 'Press Save to register your user': 'Log in or create new user' }</h1>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err)=> (
                        <li className='data-errors' key={err}>{err}</li>
                    ))}
                </ul>
            )}
            {data && data.message && <p aria-label='error-message' className='data-errors'>{data.message}</p>}
           </div>
           <div className='grid w-full'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' className='auth-input-field '/>
                       <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' className='auth-input-field'/>
           <label htmlFor='rememberMe'>Remember me
            <input type='checkbox' id='rememberMe' name='rememberMe' className='auth-input-checkbox'/>
           </label></div>
           <div className='auth-submission-buttons-container'>
            <button className='submit-button' aria-label='final-button'>{mode === 'login' ? 'Login' : 'Save'}</button>
            {mode !== 'signup' && <Link to={`?mode=signup`} className='submit-button' >
            Create new user
            </Link>}
            <Link to='/' className='submit-button' >
            Back to home
            </Link></div>
           {isSubmitting && <p className='flex-center'>submitting...</p>}
           </Form>
    </>
  )
}
