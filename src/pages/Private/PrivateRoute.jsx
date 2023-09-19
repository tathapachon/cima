// useIsUserAuthenticated.js
import { getCookie } from "../Login/cookies.js"

const useIsUserAuthenticated = () => {
  const isAuthenticated = getCookie('token'); // Utiliza la función getCookie para obtener el valor de autenticación (token)
  console.log("isAuthenticated ", isAuthenticated);
  console.log("perro",isAuthenticated)
  return isAuthenticated;
};

export default useIsUserAuthenticated;



