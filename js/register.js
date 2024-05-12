function store() {
    //הגדרת משתנים להכנסה לנערכת
    var name = document.getElementById('name');
    var pw = document.getElementById('pw');
    var mail = document.getElementById('mail');
    var address = document.getElementById('address');
    var birthday = document.getElementById('birthday');
    //משתנה בוליאני לבדיקה האם נמצא במערך
    var flag = false;
    //בדיקות תקינות
    if (name.value.length == 0) {
        alert('הכנס שם');

    } else if (pw.value.length == 0) {
        alert('הכנס סיסמא');

    } else if (name.value.length == 0 && pw.value.length == 0) {
        alert('חסרים שם משתמשים');

    } 
    else {
        // שליפת המערך (מלא או ריק) מהאחסון הכללי
        var users = JSON.parse(localStorage.getItem('Users')) || [];
        var userData = [{ name: document.getElementById("name").value },
        { pw: document.getElementById("pw").value }, { mail: document.getElementById("mail").value },
        { address: document.getElementById("address").value }, { birthday: document.getElementById("birthday").value }];

        // בדיקה האם שם משתמש וסיסמא כאלו קיימים כבר
        for (var i = 0; i < users.length&&!flag; i++) {
            if (users[i][0].name === name.value && users[i][1].pw === pw.value) {
                flag = true;
            }
        }
        // הודעה על קליטה שניה
        if (flag === true) {
            alert('שם משתמש או הסיסמא קיימים במערכת נסה שוב');
            document.getElementById("pw").value = null;
        }
        // הוספה לזכרון
        if (flag === false) {
            // הכנסת האובייקט למערך הכללי
            users.push(userData);
            //עדכון סופי למערך
            localStorage.setItem('Users', JSON.stringify(users));
        }
    }
}



function exist() {
    var indx = 0;
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');
    // שליפת מידע
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    // מעבר על המידע השמור עד למציאת המשתמש
    for (var i = 0; i < users.length && indx === 0; i++) {
        if (users[i][0].name == userName.value && users[i][1].pw == userPw.value) {
            indx = 1;
        }
    }
    if (indx === 1) {
        alert(userName.value + '  ברוך הבא!');
    }
    else {
        alert('שם משתמש או הסיסמא שגויים');
        document.getElementById("userPw").value = null;
    }
}