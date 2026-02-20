import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ErrorPage({loggedIn, formEmpty}) {
  const error = useRouteError() || false;
  console.log(error);
const navigate = useNavigate();
  let title = 'An error occurred!';
  let message = 'Something went wrong!';
let routeText = 'home page'

  if (error.status === 500) {
    message = error.data.message;
  }

  if (formEmpty){
     message = "Looks like you haven't filled the questionnaire yet!"
  }
  if (loggedIn) {
    message = "Looks like you are already logged in, wanderer"
  }


  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';

  }

  if (error.status === 401 || loggedIn === "noToken") {
    title = "Unauthorised"
    message = "User not logged in or does not exist"
    routeText = "authentication page"
  }

  function routeToEscape(){
    if (error.status === 401 || loggedIn === "noToken"){
        
        navigate("/auth")
    }
    else {navigate('/')};
  }

  return (
    <div aria-label='error-container' className='error-container'>
       <h1 className='error-header'>
       {error.status}
        </h1>
        <h1 className='error-header'>
       {title}
        </h1> 
        {!loggedIn && <p>{message}</p>}
        <button onClick={routeToEscape}>Press here for {routeText}</button>
    </div>
  );
}

export default ErrorPage;
