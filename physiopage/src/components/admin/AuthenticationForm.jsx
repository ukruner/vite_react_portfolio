
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


    const mode = searchParams.get("mode") || "login"

  return (
    <>
        <Form method='post' className='grid gap-3 justify-center  min-w-[30rem] max-w-[40rem]  p-8 border-2 ~text-xs/lg border-black rounded-3xl'>
           <div className=''><h1 className='text-3xl'>{routeParallax && mode === 'login' && <div>To access the form, please</div>}
           {routeHeader && mode === 'login' && <div>To access useful content, please</div>}
           {routeSidebar && mode === 'login' && <div>To access links on health related content, please</div>}</h1>
     
           <h1 className='text-3xl'>{mode === "login" ? "Log in or create new user" : "Press Save to register your user"}</h1>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err)=> (
                        <li className='text-sm text-red-600' key={err}>{err}</li>
                    ))}
                </ul>
            )}
            {data && data.message && <p className='text-sm text-red-600'>{data.message}</p>}
           </div>
           <div className='grid w-full'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' className="my-1 px-1 leading-tight bg-white border border-slate-200 rounded  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none"/>
                       <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' className="my-1 px-1 leading-tight bg-white border border-slate-200 rounded  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none"/>
           </div>
           <div className='flex flex-row basis-[20%] items-center gap-3 justify-center'>
            <button className='submit-button ~xs/md:~p-1/3 ~text-xs/lg'>{mode === "login" ? "Login" : "Save"}</button>
            {mode !== "signup" && <Link to={`?mode=signup`} className='submit-button ~xs/md:~p-1/3 ~text-xs/lg' >
            Create new user
            </Link>}
            <Link to="/" className='submit-button ~xs/md:~p-1/3 ~text-xs/lg' >
            Back to home
            </Link></div>
           {isSubmitting && <p className='flex justify-center'>submitting...</p>}
           </Form>
    </>
  )
}
