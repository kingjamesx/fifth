import { axiosClient } from "../../axios/client";
export class UserService {
  fetchUser = async (page: number) =>
    await axiosClient
      .get<any, { data: any }>(`/?page=${page}&results=3&seed=abc`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

  fetchGenderUser = async (gender: string) =>
    await axiosClient
      .get<any, { data: any }>(`/?gender=${gender}&results=3`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

  downloadUsers = async () =>
    await axiosClient
      .get<any, { data: any }>(`/?format=csv`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
}
