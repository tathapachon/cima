// cookies.js

export const setCookie = (name, value, days = 7) => {
  console.log("name, value, days",name, value, days)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/; secure; sameSite=none`;
  };
  
  export const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? decodeURIComponent(cookieValue.pop()) : '';
  };
  