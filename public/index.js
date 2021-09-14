console.log(firebase)

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("משתתמש מחובר !")
     
     
     displayNumofCompletedReq();
     console.log("this is in auth" + user.uid)
    
    } else {
      displayNumofCompletedReq();
      console.log("משתמש לא מחובר");
    }
  });





function AdminIn()
{

  var Admin = document.getElementById('Admin');
  console.log(Admin.value);
  if (Admin.value=='Wepo4U2222')
  {
    console.log("yes");

    
    var AdminEmail = 'wepo4U@gmail.com';
    var AdminPassword = '123456'
    console.log("Admin Details")
    console.log(AdminEmail);
    console.log(AdminPassword)
    auth.signInWithEmailAndPassword(AdminEmail, AdminPassword)
    .then((user) => {
        console.log("after then")
        console.log(user);
        alert(user.uid)
        location.replace("AdminEnter.html")
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });





    


  }
  else {
      alert("נראה לנו שהתבלבלתם");
  }

}




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
  
  
     <p style="margin-left: 43%;" id="phoneid"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${_CounterReq} :כמות התנדבויות שבוצעו  </p>
     
     
      </div>
    `

  });
}
