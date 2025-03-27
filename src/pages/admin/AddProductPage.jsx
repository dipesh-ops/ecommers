import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

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
const AddProductPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity : 1,
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


const addProductFunction = async ()=>{
    if(product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "" || product.quantity === "" ){
      return toast.error('All fields are required');
    }

    setLoading(true)

    try {
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, product);
      toast.success('Product added successfully');
      navigate('/admin-dashboard');
    } catch (error) {
      console.log(error);
      toast.error('Add product failed');
    }
}

  return (
      <div>
          <div className='flex justify-center items-center w-[100%] h-screen'>
            {loading && <Loader/>}
              {/* Login Form  */}
              <div className="login_Form flex flex-col justify-center items-center w-[90%] md:w-[40%] bg-blue-50 px-8 py-6 border border-blue-100 rounded-xl shadow-md">

                  {/* Top Heading  */}
                  <div className="mb-5">
                      <h2 className='text-center text-2xl font-bold text-blue-500 '>
                          Add Product
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
                          className='bg-blue-50 w-75 md:w-96 text-blue-300 border border-blue-200 px-2 py-2 rounded-md outline-none placeholder-blue-300'
                      />
                  </div>

                  {/* Input Two  */}
                  <div className="mb-3">
                      <input
                          type="number"
                          value={product.price}
                          onChange={(e)=>{
                            setProduct({
                              ...product,
                              price : e.target.value
                            })
                          }}
                          placeholder='Product Price'
                          className='bg-blue-50 w-75 md:w-96 text-blue-300 border border-blue-200 px-2 py-2 rounded-md outline-none placeholder-blue-300'
                      />
                  </div>

                  {/* Input Three  */}
                  <div className="mb-3">
                      <input
                          type="text"
                          value={product.productImageUrl}
                          onChange={(e)=>{
                            setProduct({
                              ...product,
                              productImageUrl : e.target.value
                            })
                          }}
                          placeholder='Product Image Url'
                          className='bg-blue-50 text-blue-300 border border-blue-200 px-2 py-2 w-75 md:w-96 rounded-md outline-none placeholder-blue-300'
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
                      }} className="w-75 md:w-96 px-1 py-2 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none  ">
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
                      <textarea name="description" value={product.description}
                          onChange={(e)=>{
                            setProduct({
                              ...product,
                              description : e.target.value
                            })
                          }} placeholder="Product Description" rows="5" className="w-75 md:w-96 px-2 py-1 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none placeholder-blue-300 ">

                      </textarea>
                  </div>

                  {/* Add Product Button  */}
                  <div className="mb-3">
                      <button
                      onClick={addProductFunction}
                          type='button'
                          className='bg-blue-500 hover:bg-blue-600 w-75 md:w-96 text-white text-center py-2 font-bold rounded-md '
                      >
                          Add Product
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default AddProductPage;