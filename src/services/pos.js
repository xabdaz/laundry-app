import axios from '@/utils/axios'

export const getUserProfile = async () => {
  const response = await axios.get('/customers')
  return response.data
};

export const postCheckout = async (checkoutPayload) => {
  const response = await axios.post('/checkout', checkoutPayload);
  return response.data;
};

export const getEtalase = async () => {
  const response = await axios.get('/etalase')
  return response.data
};

export const getListTransaction = async (page) => {
  // const response = await axios.get('listTransactions?page=${page}')

  console.log("transaction detail id:", page);
  const response = await axios.get(`/listTransactions?page=${page}`);
  return response.data
};

export const paymentTransaction = async (payload) => {
  const response = await axios.post('/payment', payload);
  return response.data;
}

export const getTransactionDetail = async (id) => {
  console.log("transaction detail id:", id);
  const response = await axios.get(`/transactions/${id}/detail`);
  return response.data;
};


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
  const response = await axios.get(`/laundry-services?q=${etalseId}`);

  console.log("transaction detail Prodct By Etalase:", response.data);
  return response.data.data;
};
