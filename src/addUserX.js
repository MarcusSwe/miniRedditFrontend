

 export default function addUser(user, password) {
    async function fetchAdd(){
      const resp = await fetch('http://localhost:8080/user/newuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user,
          password: password
        }) 
      })
      const stringrespons = await resp.text();
      switch(resp.status) {
        case 409:         
          alert(stringrespons)
          break;
        case 500:
          alert(stringrespons)
          break;
       default:
         alert("user created")         
      }
    }
    fetchAdd();
  
  }