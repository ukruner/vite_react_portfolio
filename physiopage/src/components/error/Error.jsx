import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ErrorPage({loggedIn}) {
  const error = useRouteError() || false;
const navigate = useNavigate();
  let title = 'An error occurred!';
  let message = 'Something went wrong!';
let routeText = 'home page'

  if (error.status === 500) {
    message = error.data.message;
  }

  if (loggedIn) {
    console.log(loggedIn)
    title = "Looks like you are already logged in, wanderer"
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';

  }

  if (error.status === 401) {
    title = "Unauthorised"
    message = "User not logged in or does not exist"
    routeText = "authentication page"
  }

  function routeToEscape(){
    if (error.status === 401){
        
        navigate("/auth")
    }
    else {navigate('/')};
  }

  return (
    <div className='flex flex-col gap-4 h-screen w-screen justify-center items-center'>
       <h1 className='justify-center items-center text-5xl text-red-600'>
       {error.status}
        </h1>
        <h1 className='justify-center items-center text-5xl text-red-600'>
       {title}
        </h1> 
        {!loggedIn && <p>{message}</p>}
        <button onClick={routeToEscape}>Press here for {routeText}</button>
    </div>
  );
}

export default ErrorPage;
