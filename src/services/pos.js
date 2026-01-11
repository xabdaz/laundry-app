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

export const getListTransaction = async (page, isPayment) => {
  const params = new URLSearchParams();
  params.append("page", page);

  if (typeof isPayment === "boolean") {
    params.append("isPayment", isPayment); // hanya ditambahkan kalau boolean
  }

  const response = await axios.get(`/listTransactions?${params.toString()}`);
  return response.data;
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
export const getVariantByProduct = async (productId) => {
  const response = await axios.get(`/laundry-variants?laundry_service_id=${productId}`);

  console.log("transaction detail Prodct By Etalase:", response.data);
  return response.data.data;
};

export const updateTransaction = async (id, payload) => {
  const response = await axios.put(`/transactions/${id}`, payload);
  return response.data;
};

// ============== Master Data Service APIs ==============

// Get all services (including inactive)
export const getAllServices = async () => {
  const response = await axios.get('/laundry-services/all');
  return response.data;
};

// Get single service with variants
export const getServiceById = async (id) => {
  const response = await axios.get(`/laundry-services/${id}`);
  return response.data;
};

// Create new service
export const createService = async (payload) => {
  const response = await axios.post('/laundry-services', payload);
  return response.data;
};

// Update service
export const updateService = async (id, payload) => {
  const response = await axios.put(`/laundry-services/${id}`, payload);
  return response.data;
};

// Delete service (soft delete)
export const deleteService = async (id) => {
  const response = await axios.delete(`/laundry-services/${id}`);
  return response.data;
};

// ============== Master Data Variant APIs ==============

// Get all variants for a service (including inactive)
export const getAllVariantsByService = async (serviceId) => {
  const response = await axios.get(`/laundry-variants/all?laundry_service_id=${serviceId}`);
  return response.data;
};

// Get single variant
export const getVariantById = async (id) => {
  const response = await axios.get(`/laundry-variants/${id}`);
  return response.data;
};

// Create new variant
export const createVariant = async (payload) => {
  const response = await axios.post('/laundry-variants', payload);
  return response.data;
};

// Update variant
export const updateVariant = async (id, payload) => {
  const response = await axios.put(`/laundry-variants/${id}`, payload);
  return response.data;
};

// Delete variant (soft delete)
export const deleteVariant = async (id) => {
  const response = await axios.delete(`/laundry-variants/${id}`);
  return response.data;
};
