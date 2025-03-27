import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { validateUser } from "../../utils/validateUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Login = () => {

    const navigate = useNavigate();
    const [userLogInDetails, setUserLoginDetails] = useState({
        email : '',
        password : ''
    })
    
    const [isLogInUser, setIsLoginUser] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit= async()=>{   

      const message = validateUser(userLogInDetails.email, userLogInDetails.password);
      console.log(message);
      setErrorMessage(message);

        // login logic

        try {
            const users = await signInWithEmailAndPassword(auth, userLogInDetails.email, userLogInDetails.password);
            // console.log(users.user)
            setLoading(true)
            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLoginDetails({
                        email: "",
                        password: ""
                    })
                    setLoading(false)
                    toast.success("Login Successfully");
                    if(user.role === "user") {
                        navigate('/user-dashboard');
                    }else{
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                // console.log(error);
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage)
            toast.error("Login Failed");
        }

        console.log(errorMessage);
        
      
    }
    return (
        <div>
        {loading && <Loader/>}
        <div className='flex justify-center items-center w-[100%] h-screen'>
            {/* Login Form  */}
            <div className="login_Form flex flex-col justify-center items-center bg-blue-50 w-[90%] md:w-[40%] px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-blue-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        name="email"
                        value={userLogInDetails.email}
                        onChange={(e)=>{
                            setUserLoginDetails({
                                ...userLogInDetails,
                                email : e.target.value
                            })
                        }}
                        type="email"
                        placeholder='Email Address'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        name="password"
                        value={userLogInDetails.password}
                        onChange={(e)=>{
                            setUserLoginDetails({
                                ...userLogInDetails,
                                password : e.target.value
                            })
                        }}
                        type="password"
                        placeholder='Password'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-200'
                    />

                </div>

                <div className="text-red-500 text-sm m-2">
                    {errorMessage}
                </div>

                {/* Signup Button  */}
                <div className="mb-5 md:w-100">
                    <button
                        onClick={handleFormSubmit}
                        type='button'
                        className='bg-blue-500 hover:bg-blue-600 w-75 md:w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-blue-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
            </div>
        </div>
    );
}

export default Login;