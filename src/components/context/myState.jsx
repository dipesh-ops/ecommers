import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import MyContext from './myContext';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function MyState({children}) {
  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async () => {
    try {
        const q = query(
            collection(fireDB, "products"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllProduct(productArray);
        });
        return () => data;
    } catch (error) {
        console.log(error);
    }
}

  const [getAllOrder, setGetAllOrder] = useState([]);

  const getAllOrderFunction = async () =>{
    try {
      const q = query(
        collection(fireDB, 'order'),
        orderBy('time')
      );

      const data = onSnapshot(q, (QuerySnapshot)=>{
        let orderArray = [];

        QuerySnapshot.forEach((doc) => {
          orderArray.push({...doc.data(), id : doc.id });
        });
        setGetAllOrder(orderArray);
      })
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  //Delete Order 

  const deleteOrder = async (id) =>{
    try {
      await deleteDoc(doc(fireDB, 'order', id));
      toast.success('Order Deleted Successfully');
      getAllOrderFunction();
    } catch (error) {
      console.log(error);
    }
  }

  //Get All User Function

  const [getAllUser, setGetAllUser] = useState([]);

  const getAllUserFunction = async () =>{
    try {
      const q = query(
        collection(fireDB, 'user'),
        orderBy('time')
      );

      const data = onSnapshot(q, (QuerySnapshot)=>{
        let userArray = [];
        QuerySnapshot.forEach((doc)=> {
          userArray.push({...doc.data(), id : doc.id});
        })
        setGetAllUser(userArray);
      })
      return () => data;
    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(()=>{
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, [])
  return (
    <MyContext.Provider value={{
      getAllProduct,
      getAllProductFunction,
      getAllOrder,
      deleteOrder,
      getAllUser
    }}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState