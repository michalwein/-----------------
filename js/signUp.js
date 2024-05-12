// function that sign up user
function store() {
  //variable that include the status of gmail
  var gmailFlag = false;
  //variable that include the status of phone
  var phoneFlag = true;
  var flagD = true;
  var nameUser = document.getElementById('myName');
  var pw = document.getElementById('myPassword');
  var gmail = document.getElementById('myGmail');
  var phoneUser = document.getElementById('myPhone');
  var flag = false;
  //array of all users
  var users = JSON.parse(localStorage.getItem('users')) || [];
  //validation
  //if the must field are missing
  if (nameUser.value.length == 0 || gmail.value.length == 0 || pw.value.length == 0) {
    alert('שדות חובה ריקים');
    flagD = false;
  }
  else {
    if (pw.value.length < 8) {
      alert('אורך סיסמה פחות מ8 תווים')
      flagD = false;
    }
    else {
      for (var i = 0; i < gmail.value.length && !gmailFlag; i++) {
        if (gmail.value[i] == '@') {
          gmailFlag = true;
        }
      }
      if (!gmailFlag) {
        alert('כתובת מייל אינה תקינה')
        flagD = false;
      }
    }
  }
  if (flagD) {
    for (var i = 0; i < users.length && !flag; i++) {
      // check if the user is exist in the users array
      if (users[i][0].name == nameUser.value && users[i][3].phone == phoneUser.value) {
        //save user name to game page
        alert("הינך כבר רשום במערכת");
        flag = true;
        window.location.href = "./signIn.html";
        break;
      }
    }
    if (!flag) {
      var userData = [{ name: document.getElementById('myName').value },
      { pw: document.getElementById('myPassword').value }, { gmail: document.getElementById('myGmail').value }, { phone: document.getElementById('myPhone').value }
      ];
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      //save user name to game page
      sessionStorage.name = nameUser.value;
      alert("נרשמת בהצלחה!");
      window.location.href = '../html/game.html';
    }
  }
}