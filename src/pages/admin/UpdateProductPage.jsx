import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import myContext from "../../components/context/myContext";

const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]

const UpdateProductPage = () => {

    const context = useContext(myContext);
    const {getAllProductFunction} = context

    const navigate = useNavigate();
    const {id} = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    console.log(product);
    

    const getSingleProductFunction = async () =>{
        try {
            const productTemp = await getDoc(doc(fireDB, 'products', id));
            const product = productTemp.data();

            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    const updateProduct = async () =>{
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success('Product Updated Successfully');
            getAllProductFunction();
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getSingleProductFunction();
    }, [])
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {/* Login Form  */}
                <div className="login_Form flex flex-col justify-center items-center w-[90%] md:w-[40%] bg-blue-50 px-8 py-6 border border-blue-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-blue-500 '>
                            Update Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e)=>{
                                setProduct({
                                    ...product,
                                    title : e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e)=>{
                                setProduct({
                                    ...product,
                                    price : e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e)=>{
                                setProduct({
                                    ...product,
                                    productImageUrl : e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                        value={product.category}
                        onChange={(e)=>{
                            setProduct({
                                ...product,
                                category : e.target.value
                            })
                        }}
                            className="w-75 md:w-96 px-1 py-2 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={(e)=>{
                                setProduct({
                                    ...product,
                                    description : e.target.value
                                })
                            }}
                            placeholder="Product Description" rows="5" className="w-75 md:w-96 px-2 py-1 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none placeholder-blue-300 ">
                        </textarea>
                    </div>

                    {/* Update Product Button  */}
                    <div className="mb-3">
                        <button
                        onClick={updateProduct}
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 w-75 md:w-96 text-white text-center py-2 font-bold rounded-md '
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;