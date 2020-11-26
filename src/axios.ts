import { Plugins } from "@capacitor/core";
import axios, { AxiosInstance, AxiosResponse } from "axios";
const { Storage } = Plugins;

class API {
  instance: AxiosInstance;
  constructor() {
    const baseURL = process.env.REACT_APP_BASE_URL || "https://nomades-server.woozir.app/v0";
    this.instance = axios.create({
      baseURL,
      timeout: 3000,
    });
  }

  async get(url: string): Promise<AxiosResponse> {
    const token = await this.getToken();
    return this.instance.get(url, { headers: { sectoken: token.value } });
  }
  async post(url: string, payload: any): Promise<AxiosResponse> {
    const token = await this.getToken();
    return this.instance.post(url, payload, { headers: { sectoken: token.value } });
  }
  async put(url: string, payload: any): Promise<AxiosResponse> {
    const token = await this.getToken();
    return this.instance.put(url, payload, { headers: { sectoken: token.value } });
  }
  async delete(url: string): Promise<AxiosResponse> {
    const token = await this.getToken();
    return this.instance.delete(url, { headers: { sectoken: token.value } });
  }

  async getToken() {
    return await Storage.get({ key: "token" });
  }
}

export default new API();
