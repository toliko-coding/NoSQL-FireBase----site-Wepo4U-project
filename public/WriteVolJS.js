//
console.log(firebase) 

const user = firebase.auth.currentUser;
const requestRef = database.ref('/VolRequest');
var mainuser;


//net var for the button from html
let send = document.getElementById('SubmitBtn');


//check that send var is real






//vars that will be written to the database
        var select1;
        var select2;
        var select3;

        var select11;
        var select22;
        var select33;

    function test()
    {
       
//First Selection :
        if (document.getElementById("grp11").checked)
        {
            select1 = document.getElementById("grp11").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp11").id
            console.log("the key is :" + select11)
        }
        
       else if (document.getElementById("grp12").checked)
        {
            select1 = document.getElementById("grp12").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp12").id
            console.log("the key is :" + select11)
        }
        else if (document.getElementById("grp13").checked)
        {
            select1 = document.getElementById("grp13").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp13").id
            console.log("the key is :" + select11)
        }
         else if (document.getElementById("grp14").checked)
        {
            select1 = document.getElementById("grp14").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp14").id
            console.log("the key is :" + select11)
        }
        else if (document.getElementById("grp15").checked)
        {
            select1 = document.getElementById("grp15").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp15").id
            console.log("the key is :" + select11)
        }
       else if (document.getElementById("grp16").checked)
        {
            select1 = document.getElementById("grp16").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp16").id
            console.log("the key is :" + select11)
        }
       else if (document.getElementById("grp17").checked)
        {
            select1 = document.getElementById("grp17").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp17").id
            console.log("the key is :" + select11)
        }
        else if (document.getElementById("grp18").checked)
        {
            select1 = document.getElementById("grp18").value
            console.log("found the value in place : "  + select1)
            select11 = document.getElementById("grp18").id
            console.log("the key is :" + select11)
        }

        else
        {
            alert("לא הוקשה בחירת איזור")
            location.replace("WriteVol.html")
        }

        //end of the first selection

        // secend selection :

        if (document.getElementById("grp21").checked)
        {
            select2 = document.getElementById("grp21").value
            console.log("found the value in time : "  + select2)
            select22 = document.getElementById("grp21").id
            console.log("the key is :" + select22)
        }
        
       else if (document.getElementById("grp22").checked)
        {
            select2 = document.getElementById("grp22").value
            console.log("found the value in time : "  + select2)
            select22 = document.getElementById("grp22").id
            console.log("the key is :" + select22)
        }
        else if (document.getElementById("grp23").checked)
        {
            select2 = document.getElementById("grp23").value
            console.log("found the value in time : "  + select2)
            select22 = document.getElementById("grp23").id
            console.log("the key is :" + select22)
        }
        else
        {
            alert("לא הוקשה בחירת שעה ")
            location.replace("WriteVol.html")      
        }
           
        //end of selection 2

        //third selection 3 :

        if (document.getElementById("grp31").checked)
        {
            select3 = document.getElementById("grp31").value
            console.log("found the value in type : "  + select3)
            select33 = document.getElementById("grp31").id
            console.log("the key is :" + select33)
        }
        
       else if (document.getElementById("grp32").checked)
        {
            select3 = document.getElementById("grp32").value
            console.log("found the value in type : "  + select3)
            select33 = document.getElementById("grp32").id
            console.log("the key is :" + select33)
        }
        else if (document.getElementById("grp33").checked)
        {
            select3 = document.getElementById("grp33").value
            console.log("found the value in type : "  + select3)
            select33 = document.getElementById("grp33").id
            console.log("the key is :" + select33)
        }
         else if (document.getElementById("grp34").checked)
        {
            select3 = document.getElementById("grp34").value
            console.log("found the value in type : "  + select3)
            select33 = document.getElementById("grp34").id
            console.log("the key is :" + select33)
        }
        else if (document.getElementById("grp35").checked)
        {
            select3 = document.getElementById("grp35").value
            console.log("found the value in type : "  + select3)
            select33 = document.getElementById("grp35").id
            console.log("the key is :" + select33)
        }
       else if (document.getElementById("grp36").checked)
        {
            select3 = document.getElementById("grp36").value
            console.log("found the value in type : "  + select3)
            select33 = document.getElementById("grp36").id
            console.log("the key is :" + select33)
        }
      

        else
        {
            alert("לא הוקשה בחירת סוג ההתנדבות")
            location.replace("WriteVol.html")     
        }


        

       const Ref = database.ref('/VolenterRequests');

       Ref.child(mainuser.uid).set({
            place : select1,
            placekey : select11,
            time : select2,
            timekey : select22,
            type : select3,
            typekey : select33
        })

        console.log("The Data is wriiten to the database")
        alert("הפרטים נשמרו")
        location.replace("OldmanEnter.html")
        
     

        
    }

    

  

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    displayNumofCompletedReq();
    mainuser = user;
    
  } else {
    // No user is signed in.
  }
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
  
  
     <p style="margin-left: 43%;" id="phoneid"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw w3-margin-right w3-large w3-text-teal"></i>${_CounterReq} :כמות התנדבויות שבוצעו  </p>
     
     
      </div>
    `

  });
}