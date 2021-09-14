console.log(firebase)
//



const Phone = document.getElementById('Phone');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const Email = document.getElementById('Email');
const Msg = document.getElementById('Msg');

const addBtn = document.getElementById('addBtn');



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   
   
   
   displayNumofCompletedReq();
    
  } else {
    
    displayNumofCompletedReq();
  }
});
 






const database = firebase.database();
const usersRef = database.ref('/ContactUs');


addBtn.addEventListener('click', e => {
  e.preventDefault();
  usersRef.child(Phone.value).set({
    first_name: firstName.value,
    last_name: lastName.value,
    Email: Email.value,
    Phone:Phone.value,
    Msg:Msg.value

    
  });
  console.log("Data Written")
  alert("תודה שפנית אלינו :)")
  location.replace("ContactUs.html")
});



var numReq;
function displayNumofCompletedReq() {
  firebase.database().ref('/CounterReq').once('value').then((snapshot) => {
      var _CounterReq = snapshot.val()
      numReq = _CounterReq;
      console.log("this is value")      
      console.log(_CounterReq)   
      

       

     
      console.log("jason good")
      
     // showU()
     document.querySelector('#numReq').innerHTML += `
  
  
     <p style="margin-left: 53%;" id="phoneid"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${_CounterReq} :כמות התנדבויות שבוצעו  </p>
     
     
      </div>
    `

  });
}