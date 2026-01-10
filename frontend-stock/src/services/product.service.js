import axios from "axios";
import { config } from "../config";

async function getProducts() {
  try {
    const response = await axios.get(config.urlServerProducts);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

export const productService = {
  getProducts,
};
