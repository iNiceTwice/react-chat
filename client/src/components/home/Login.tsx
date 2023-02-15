
const Login = () => {
    return ( 
        <>
            <form className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <input type="password" className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                </div>
                <button type="submit" className="shadow-sm bg-primary text-white rounded-full p-1 mt-2 outline-none focus:bg-primary/80 hover:bg-primary/80">Login</button>
                <p className="text-sm text-center">You don't have an account? Sign up.</p>
            </form>
        </>
     );
}
 
export default Login;