import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { validateUser } from "../../utils/validateUser";

const Signup = () => {

    const navigate = useNavigate();

    const [signUpDetail, setSignUpDetail] = useState({
        name : "",
        email : "",
        password : "",
        role : "user"
    })

    const [errorMessage, setErrorMessage] = useState('');
    

    const handleSubmit = async () =>{

        const message = validateUser(signUpDetail.email, signUpDetail.password);
        console.log(message);
        setErrorMessage(message);
        
        try {
            const users = await createUserWithEmailAndPassword(auth, signUpDetail.email, signUpDetail.password);

             // create user object
             const user = {
                name: signUpDetail.name,
                email: users.user.email,
                uid: users.user.uid,
                role: signUpDetail.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            //user reference
            const userReference = collection(fireDB, "user");


            // add user data
            addDoc(userReference, user)

            setSignUpDetail({
                name : "",
                email : "",
                password : ""
            });

            
            navigate('/login');
            toast.success("User Created Successfully");
            
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <div className='flex justify-center items-center w-[100%] h-screen'>
            {/* Login Form  */}
            <div className="login_Form flex flex-col justify-center items-center bg-blue-50 w-[90%] md:w-[40%] px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-blue-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        name='name'
                        required
                        value={signUpDetail.name}
                        onChange={(e)=> setSignUpDetail({
                            ...signUpDetail,
                            name : e.target.value
                        })}
                        placeholder='Full Name'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-200'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        value={signUpDetail.email}
                        onChange={(e)=> setSignUpDetail({
                            ...signUpDetail,
                            email : e.target.value
                        })}
                        placeholder='Email Address'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        name="password"
                        value={signUpDetail.password}
                        onChange={(e) => setSignUpDetail({
                            ...signUpDetail,
                             password : e.target.value
                        })}
                        placeholder='Password'
                        className='bg-blue-50 border border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5 md:w-100">
                    <button
                        onClick={handleSubmit}
                        type='button'
                        className='bg-blue-500 hover:bg-blue-600 w-75 md:w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-blue-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;