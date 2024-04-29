export default function authHeader() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      return { 
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          };
    } else {
      return {};
    }
  }