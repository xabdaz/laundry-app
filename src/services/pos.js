import axios from '@/utils/axios'

export const getUserProfile = async () => {
  const response = await axios.get('/customers')
  return response.data
}

export const postCheckout = async (checkoutPayload) => {
  const response = await axios.post('/checkout', checkoutPayload);
  return response.data;
}

export const getEtalase = async () => {
  const response = await axios.get('/etalase')
  return response.data
}


const fetchProduct = async () => {
  // Simulasi delay + mock data
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Cuci Setrika",
          price: 10000,
          image: "laundry.jpg",
          category: "satuan-jas",
        }
      ]);
    }, 1000)
  );
};

export const getProductByEtalase = async (etalseId) => {
  console.log("etalse id cok", etalseId)
  if (etalseId == 0) {
    return fetchProduct
  }
  const laundryServices = [
    {
      id: 1,
      name: "Cuci Setrika",
      price: 10000,
      image: "laundry.jpg",
      category: "satuan-jas",
    }
  ];
  return laundryServices
}