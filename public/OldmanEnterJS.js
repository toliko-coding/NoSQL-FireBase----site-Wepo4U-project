console.log(firebase)
console.log(database)
console.log(auth)
//

const Msg = document.getElementById('textarea');
const DelBtn = document.getElementById('buttonD');
const updateBtnp = document.getElementById('updateBtnp');
const updateBtna = document.getElementById('updateBtna');
const userss = database.ref('/OldmanUsers');

const update_phone = document.getElementById('update_phone').value;
const update_addres = document.getElementById('update_addres').value;



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


j = 0;


// event that change/set all the data from begining (like new) + cerat message in the DB
const usersRef = database.ref('/DeletedRequests/DeletedOldMan');

DelBtn.addEventListener('click', e => {
  e.preventDefault();
  usersRef.child(j).set({   //set new message to the DB
    
    Msg:Msg.value

    
  });
  console.log("Data Deleted")
  console.log(Msg.value)
  console.log(j)
  alert("בקשתך נמחקה)")

  const Ref = database.ref('/VolenterRequests');
//setting the new values
       Ref.child(j).set({
            place :  "נמחק ",
            placekey : "נמחק ",
            time :  "נמחק ",
            timekey : "נמחק ",
            type :  " נמחק",
            typekey : "נמחק "
        })
  console.log("DATA Updated !")
  location.replace("OldmanEnter.html")
});



//function that uploadin image to the STORAGE by ID
function UploadImage()
{
//j = jser id
  console.log(j)
  const ref = firebase.storage().ref()
//taking the image id from the html
  const file = document.querySelector("#pimage").files[0]

  const name = j
//creating EXTRA data to the image - STORAGE
  const metadata = {
    contentType:file.type,
    customMetadata: {
      'location': 'Yosemite, CA, USA',
      'activity': 'Hiking',
      'date' : Date()
      
    }
    
  }
//ref
  const task = ref.child(name).put(file,metadata)

  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => 
    {
      console.log(url)
      alert("image uploaded")
      const image = document.querySelector('#image')
      image.src = url
    })
}


// function that run at the beggining of the load and display the image from the gallery
const storageRef = firebase.storage().ref();
function displayProfilepic(userId)
{
  storageRef.child(userId).getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'
  
    // This can be downloaded directly:
   
    // Or inserted into an <img> element:
    var img = document.getElementById('image');
    img.src = url;
    console.log("image downloaded URL is :")
    console.log(url)
    console.log("to this id :")
    console.log(userId)
    
  }).catch(function(error) {
    // Handle any errors
  });}







   function signOut()
    {
      auth.signOut();
      alert("התנתקת !")
      location.replace("OldmanSignUp.html")
    }

    


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   console.log("TAKIN !")
   
   j = user.uid;
   readUserDetails(j)
   readUserReq(j);
   displayProfilepic(j);
   displayNumofCompletedReq();
    
  } else {
    
    // No user is signed in.
  }
});
 

//Function that display the user info in realtime DB
function readUserDetails(userId) {
  firebase.database().ref('/OldmanUsers/' + userId).once('value').then((snapshot) => {
      var firstName = snapshot.val().firstName
      var lastName = snapshot.val().lastName
      var email = snapshot.val().email
      var phone = snapshot.val().phone
      var addres = snapshot.val().addres
      

      var userDetails = {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          phone : phone,
          email:email,
          addres:addres
          
      }
      console.log("jason good")
      console.log(userId)
      showUser(userDetails)

  });
}


function showUser(userDetails) {
  document.querySelector('#root').innerHTML += `
  <div>   <p id="nameid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal" style="font-size: xx-large;"></i>${userDetails.firstName} ${userDetails.lastName}</p>
  
   <p id="phoneid"><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.phone}</p>
   
   <p id="emailid"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.email}</p>
   <p id="addresid"><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.addres}</p>

    </div>
  `
}


// FUNCTION THAT READ AND DISPLAY THE INFORMATION OF THE REQUEST
function readUserReq(userId) {
  firebase.database().ref('/VolenterRequests/' + userId).once('value').then((snapshot) => {
      var place = snapshot.val().place
      var time = snapshot.val().time
      var type = snapshot.val().type
    
      

      var userDetails = {
        userId: userId,
        place: place,
        time: time,
        type : type
        
         
          
      }
      console.log("jason info good")
      console.log(userId)
      showUserInfo(userDetails)

  });
}


function showUserInfo(userDetails) {
  document.querySelector('#reqInfo').innerHTML += `
  
  
   <p id="phoneid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.place}</p>
   
   <p id="emailid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.time}</p>
   <p id="addresid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${userDetails.type}</p>

    </div>
  `
  console.log("completed")
}



//function that display the SUM of all the compledte OLDMANREQUEST

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

//function that increase the counter of the num Requests by 1 
function UpdateNumReq()
{
 var newnumReq = numReq + 1;
 database.ref('CounterReq').set(newnumReq, (error) => {
  if (error)
   {
      alert("Something went wrong..." + error.errorMessage)
   }
   else
   {
     alert("updated to" + newnumReq)
     location.replace("VolenteerSurvey.html")
   }
      
      
  
})

  
}
