console.log(firebase)




const FullName = document.getElementById('FullName');
const Company = document.getElementById('Company');
const Email = document.getElementById('Email');
const Phone = document.getElementById('Phone')
const Msg = document.getElementById('Msg');
const Points = document.getElementById('points');
const Prize = document.getElementById('prize');

const addBtn = document.getElementById('addBtn');





const database = firebase.database();
const usersRef = database.ref('/BuisnessRequest');


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   
    FetchAllData()
    displayNumofCompletedReq()
    
    

    
  } else {
    FetchAllData()
    displayNumofCompletedReq()
  }
});





    addBtn.addEventListener('click', e => {
      e.preventDefault();
      if (validate() == true)
    {
        
        usersRef.child(Company.value).set({
          first_name: FullName.value,
          Company_name: Company.value,
          Email: Email.value,
          Phone:Phone.value,
          Msg:Msg.value,
          points:Points.value,
          Prize:Prize.value

      
          
        });
        
        console.log("Data Written")
        alert("תודה שפנית אלינו :)")
        location.replace("BusinessPage.html")
    }
    else
    {
     

      
    }

    });



function validate(){
  var remember = document.getElementById('checkbox1');
  if (remember.checked){
      
      return true;
  }else{
      alert("אנא אשר את התקנון")
      return false;
  }
}


//function that get all the data ubout some kind of root

function FetchAllData()
{
  firebase.database().ref('BuisnessRequest/').once('value' , function(snapshot){
    snapshot.forEach(
      function(childSnapshot){
        var Company_name = childSnapshot.val().Company_name;
        var Msg = childSnapshot.val().Msg;
        var Phone = childSnapshot.val().Phone;
        var Points = childSnapshot.val().points;
        var Prize = childSnapshot.val().Prize;


        addItemsToList(Company_name  ,Msg , Phone,Prize,Points);

      }
    );
  });
}



//function that innerHTML where ever you want
function showBuissnesInfo(Company_name  ,Msg , Phone) {
  document.querySelector('#Bdata').innerHTML += 
  `
  <p id="pointsid"><i class="fa fa-check-square fa-fw w3-margin-right w3-large w3-text-teal"></i>${Company_name}</p>
  <div>   <p id="nameid"><i class="fa fa-spinner fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal" style="font-size: xx-large;"></i>${Msg} ${Msg}</p>
  <p id="emailid"><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>${Phone}</p>
  </div>
  `
  }


  //Function that get values and display it when ever you want in div
function addItemsToList(Company_name,Msg,Phone,Prize,Points)
{
  var ul = document.getElementById('list');
  var p = document.getElementById('p')
  var header = document.createElement('h2');

  var _Company_name = document.createElement('li');
  var _Msg = document.createElement('li');
  var _Phone = document.createElement('li');
  var _Prize = document.createElement('li');
  var _Points = document.createElement('li');


  /*
  header.innerHTML = 'Company Name ' + (Company_name);

  _Msg.innerHTML = 'הודעה :' + Msg;
  _Phone.innerHTML = 'מספר טלפון :' + Phone;
  _Msg.innerHTML = 'הודעה :' + Msg;
*/
  document.querySelector('#Bdata').innerHTML += 
  `
  <div class="w3-container w3-teal">
  
</div>
  
  <div class="w3-content">
  
    <div class="w3-row w3-margin">
  
      <div class="w3-third">
      <img src="Logo.png" style="width:100%;min-height:200px">
      </div>
    <div class="w3-twothird w3-container">
     <h2>${Company_name}</h2>
     <p>
     ${Msg}
     </p>

     <h3>Phone Number : ${Phone}</h3>

     <h3>מה אני מציע  :</h3>
     <p> ${Prize}</p>


     <h3>תמורת כמה נקודות ? : </h3>
     <p> ${Points}</p>

     <button onclick="reduce()">לחץ כאן כדי לממש את הנקודות שלי</button>


   </div>
  
  </div>
  `
  


  ul.appendChild(header);
  ul.appendChild(_Msg);
  ul.appendChild(_Phone);


}

//his HTML is :

/*

this is working 
---------------
<div id="Bdata"></div>
---------------


//this is for the unchecd
<ul id="list">
<h2></h2> 
 <li></li>

</ul>
*/


function sorry()
{
  alert("סליחה אבל האפשרות לא קיימת כרגע ..")
}

var numReq;
function displayNumofCompletedReq() 
{
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











function reduce()
{
    firebase.auth().onAuthStateChanged(function(user) 
  {
    
    
    
    if (user) 
    {
      console.log(user.uid);
      database.ref('/VolenteerUsers/' + user.uid).once('value').then((snapshot) =>
      {
        
    
      var Upoints = snapshot.val().points
      if (Upoints)
      {
        console.log("yes21");
        console.log(user.uid);
        console.log(Upoints)
        newone=(+Upoints)-15
        console.log(newone);
        if(newone<0){
          newone=0;
        }

        
        var firstName = snapshot.val().firstName
        var lastName = snapshot.val().lastName
        var email = snapshot.val().email
        var phone =snapshot.val().phone
    
        console.log(newone);
        
        
        console.log("djhfjds");
      
        var updatedform = {
          userId: user.uid,
          firstName: firstName,
          lastName: lastName,
          phone : phone,
          email:email,
          points : newone}
        
          console.log(newone)
          newpoints(updatedform,user.uid)
          alert("נקודות המתנדב עודכנו בהצלחה!")}
      else{}
      });


    

      
    } 
    else 
    {
      // No user is signed in.
      alert("משתמש לא מחובר !")
      
    }
  });


}




function newpoints(updatedform, ID) 
{
    database.ref('VolenteerUsers/' + ID).set(updatedform, (error) => {
        if (error)
         {
            alert("Something went wrong..." + error.errorMessage)
         }
            
            
        
    });
}


