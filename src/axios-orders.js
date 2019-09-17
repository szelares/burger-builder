import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-app-c3f08.firebaseio.com/"
});

export default instance;
