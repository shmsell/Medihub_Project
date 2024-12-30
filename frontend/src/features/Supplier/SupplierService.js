import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getSuppliers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};

const SupplierService = {
  getSuppliers,
};

export default SupplierService;
