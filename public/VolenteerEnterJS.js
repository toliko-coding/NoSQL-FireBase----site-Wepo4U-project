console.log(auth)



const Msg = document.getElementById('textarea');
const DelBtn = document.getElementById('buttonD');
const updateBtnp = document.getElementById('updateBtnp');
const updateBtna = document.getElementById('updateBtna');


//const update_phone = document.getElementById('update_phone').value;
//const update_addres = document.getElementById('update_addres').value;

function getuser(user){
  j=user.uid
}
firebase.auth().onAuthStateChanged(function(user) {
  
  
  
  if (user) {
    // User is signed in.
    console.log("המשתמש המחובר: " + user.uid)
    displayNumofCompletedReq();
  

   readUserDetails(user.uid);
   readUserReq(user.uid);

    
  } else {
    // No user is signed in.
    alert("משתמש לא מחובר !")
    
  }
});



/*
//UPDATE PHONE
updateBtnp.addEventListener('click', e => {
  e.preventDefault();
  userss.child(j).update({
    phone:update_phone
  });
  alert("phoneee !")

});

//UPDATE ADDRES
updateBtna.addEventListener('click', e => {
  e.preventDefault();
  userss.child(j).update({
    addres:update_addres

  });
  alert("adresss !")
});

*/








  //SingUp - Function

    function singUp()
    {
       
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
        alert("תודה שהצטרפת :)");
    }
  
  
    //SingIn - Function

    function signIn()
    {
      var email = document.getElementById("email");
      var password = document.getElementById("password");

       const promise = auth.signInWithEmailAndPassword(email.value, password.value);
       promise.catch(e => alert(e.message));

        alert("התחברת !" + email.value );
        
    }

    function signOut()
    {
      auth.signOut();
      alert("התנתקת !")
      location.replace("VolenteerSignUp.html")
      
    }


    function change(){
      location.replace("ChooseVol.html");
    }


//Function that display the user info in live
function readUserDetails(userId) {
  firebase.database().ref('/VolenteerUsers/' + userId).once('value').then((snapshot) => {
      var firstName = snapshot.val().firstName
      var lastName = snapshot.val().lastName
      var email = snapshot.val().email
      var phone =snapshot.val().phone
      var points = snapshot.val().points
      
      

      var userDetails = {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          phone : phone,
          email:email,
          points: points
          
          
      }
      console.log("jason good")
      console.log(userId)
      showUser(userDetails)

  });
}


function showUser(userDetails) {
  document.querySelector('#root').innerHTML += 
  `
   <div>   <p id="nameid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal" style="font-size: xx-large;"></i>${userDetails.firstName} ${userDetails.lastName}</p>
   <p id="emailid"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.email}</p>
   <p id="pointsid"><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.phone}</p>
   <p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.points}</p>
    </div>
  `
}



    // FUNCTION THAT READ AND DISPLAY THE INFORMATION OF THE REQUEST
function readUserReq(userId) {
  firebase.database().ref('/Volenteering/' + userId).once('value').then((snapshot) => {
      var place = snapshot.val().place
      var time = snapshot.val().time
      var type = snapshot.val().type
    
      

      var userDetails2 = {
        place: place,
        time: time,
        type : type
        
         
          
      }
      console.log("jason info good")
      console.log(userId)
      showUserInfo(userDetails2)
      Searchplace(userDetails2)

  });
}


function showUserInfo(userDetails) {
  document.querySelector('#reqInfo').innerHTML += `
  
  
   <p id="phoneid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.place}</p>
   
   <p id="emailid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.time}</p>
   <p id="addresid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.type}</p>

    </div>
  `
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


const Oldref=firebase.database().ref('VolenterRequests');
function Searchplace (detail)
{
  var i =0;
    const place=detail.place;
    console.log(place);
    Oldref.orderByChild('place').equalTo(place).on("value", function(snapshot)
     {
        console.log(snapshot.val());


        
        snapshot.forEach(function(data) {
            if (data.key)
            {

            }
            console.log(data.key);
            SearchBoth(detail,data.key);
            
            if (data.key)
            {
              

            }
            else 
            {
              alert("לא נמצאו התאמות");

            }
            i=i+1;
            
         
        });
    });



}


function SearchBoth(detail,ID)
{
  firebase.database().ref('/VolenterRequests/' + ID).once('value').then((snapshot) => {
    
    var time = snapshot.val().time
    var type = snapshot.val().type
    var voltime=detail.time
    var voltype=detail.type
    console.log(time);
    console.log(type);
    console.log(voltime);
    console.log(voltype);
    console.log(ID);


    if(time===voltime)
    {
      if(type===voltype)
      {
        console.log("Found MotherFucker!!!!")
        showmatch(ID);
        
      }
      else {console.log("not found")}

    }
    else {console.log("not found")}


  }); 

    


}



//Function that display the user info in live
function showmatch(userId) {
  console.log('1')
  firebase.database().ref('/OldmanUsers/' + userId).once('value').then((snapshot) => {
      var firstName = snapshot.val().firstName
      var lastName = snapshot.val().lastName
      var email = snapshot.val().email
      var phone =snapshot.val().phone
      var addres = snapshot.val().addres
      
      console.log('2')


      var userDetails = {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          phone : phone,
          email:email,
          points: addres
          
          
      }
      console.log("jason good")
      console.log(userId)
      displaymatch(userDetails)

  });
}


function displaymatch(userDetails) {
  document.querySelector('#match').innerHTML += 
  `
   <div>   <p id="nameid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal" style="font-size: xx-large;"></i>${userDetails.firstName} ${userDetails.lastName}</p>
   <p id="emailid"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.email}</p>
   <p id="pointsid"><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.phone}</p>
   <p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.addres}</p>
    </div>
  `
}