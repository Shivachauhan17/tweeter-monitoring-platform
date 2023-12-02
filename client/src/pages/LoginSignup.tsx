import React,{memo} from "react";
// import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
// import './css/signup_login_page.css'

const LoginSignup:React.FC=()=>{



    return(
        <div>
            <div>
            </div>
            <div >
                <h2 className="logoname font-bold text-2xl text-black outline-4 flex justify-center">Friends loop</h2>
                <div className="flex justify-center">
                    <div className='border-2 border-gray-300 rounded-3xl flex flex-col gap-x-10 w-1/4 h-2/5 mt-24 shadow-lg'>
                        <div className="flex justify-center mt-12">
                            <h3 className="font-bold">Learn in Public</h3>
                        </div>
                        <div className="flex justify-center mt-12">
                            <div>
                                <a href='/login'><button type="button" className="btn btn-outline-primary" >Login</button></a>
                                <a href='/signup' > <button type="button" className="btn btn-outline-success">Signup</button></a>
                            </div>
                        </div>
                        
                        <div className="flex justify-center mt-12 mb-10">
                            {/* <GoogleLoginButton /> */}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default memo(LoginSignup);