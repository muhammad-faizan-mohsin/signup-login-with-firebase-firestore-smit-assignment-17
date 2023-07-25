
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged ,deleteUser , signOut  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore ,setDoc ,doc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

  const firebaseConfig = {
    
  };


  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const db = getFirestore(app);

  const secAuth = getAuth();
const inputEmail = document.getElementById("email-input")
const inputPass = document.getElementById("pass-input")
const inputName = document.getElementById("email-name")
const loginBtn = document.getElementById("loginbtn")
const RegisterBtn =document.getElementById("RegisterBtn")
const signOuts = document.getElementById("signout")

RegisterBtn && RegisterBtn.addEventListener("click" ,  ()=> {

createUserWithEmailAndPassword(secAuth, inputEmail.value, inputPass.value)
  .then(async(res) => {

    const user = res.user;
    const docRef = await setDoc(doc(db, "users" ,user.uid), {
      Name: inputName.value,
      Email: inputEmail.value,
      Pass:  inputPass.value
    });
    Swal.fire({
      icon: 'success',
      title: 'User register successfully',
  })
  localStorage.setItem("uid", user.uid)
  window.location.href = "profile.html"
  console.log("updated")
  inputPass.value = ""
  inputName.value = ""
  inputEmail.value = ""

  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
  })
  
  });

})

loginBtn && loginBtn.addEventListener("click" , ()=>{
signInWithEmailAndPassword(secAuth, inputEmail.value, inputPass.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      icon: 'success',
      title: 'User Login successfully',
  })
  localStorage.setItem("uid", user.uid)
  window.location.href = "profile.html"
  inputEmail.value = ""
  inputPass.value = ""
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
  })
});

})


signOuts && signOuts.addEventListener("click" , ()=>{
signOut(secAuth).then(() => {
  localStorage.clear()
  console.log("hello")
  window.location.href = "index.html"
}).catch((error) => {

console.log(error)
});
})

onAuthStateChanged(secAuth, (user) => {
  if (user) {
    const uid = user.uid;
    if (location.pathname !== '/profile.html') {
      location.href = "profile.html"
  }
} else {
  if (location.pathname !== '/index.html' && location.pathname !== "/register.html") {
      location.href = "index.html"
  }}
});



// const user = auth.currentUser;


// deleteUser(user).then(() => {
// console.log("deleted")
// }).catch((error) => {
//     console.log(error)

// }); 