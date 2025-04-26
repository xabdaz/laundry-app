import axios from '@/utils/axios'

export const getUserProfile = async () => {
  const response = await axios.get('/customers')
  return response.data
}

export const postCheckout = async (checkoutPayload) => {
  const response = await axios.post('/checkout', checkoutPayload);
  return response.data;
}
