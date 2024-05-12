
// יצירת מטריצה לשמירת לשינוי נתונים ואיתחול
var dataMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
var wichPleyer = true;

var pop = new Audio("../img/pop.mp3");
var timeOut = new Audio("../img/timeOut.mp3");
var comlete = new Audio("../img/levelComplete.mp3");


//פונקציה לבניית טבלת בסיס
function addTable() {
  var myTableDiv = document.getElementById("board");

  var table = document.createElement('TABLE');
  //מסגרת שחורה 
  table.border = '5px soild black';
  table.style.backgroundColor = "blue";

  //הוספת שורות
  for (var i = 0; i < 6; i++) {
    var tr = document.createElement('TR');
    tr.id = "t" + i;
    table.appendChild(tr);
    //הוספת עמודות
    for (var j = 0; j < 8; j++) {
      var td = document.createElement('TD');
      td.id = "b" + i + "_" + j;
      td.width = '75';
      td.height = '75';
      td.style.border = "3px solid black";
      td.style.backgroundColor = "white";
      td.style.borderRadius = '50%';
      //הוספה לנתוני הטבלא
      tr.appendChild(td);

    }
  }
  //הוספת טבלא לדיב סופי- לדף
  myTableDiv.appendChild(table);
}

//יצרת כפורי חיצים להוספת כדור
function createButtons() {

  var myButtons = document.getElementById("arrow");
  //לולאה ליצרת לחצנים
  for (var i = 0; i < 8; i++) {
    var btn = document.createElement('button');
    btn.id = "btn" + i;
    btn.style.backgroundImage = "url(../img/point-down.png)";
    btn.style.backgroundRepeat = "no-repeat";
    btn.style.backgroundPosition = "center";
    btn.style.backgroundSize = "cover";
    btn.style.margin = '25px';
    btn.style.height = '35px';
    btn.style.width = '35px';
    btn.style.backgroundColor = 'transparent';
    btn.style.border = 'transparent';
    //אירוע קליק בכפתורים שנוצרו
    myButtons.appendChild(btn);
    btn.addEventListener("click", addBall(i));
  }
}

// פונקציה להוספת כדור לטבלה במיקום המתאים ללחיצה על כפתור החיצים
function addBall(colIndex) {
  return function () {
    // מציאת המקום הראשון פנוי בטור שהועבר כפרמטר לפונקציה
    var rowIndex = -1;
    for (var i = 5; i >= 0 && rowIndex !== i + 1; i--) {
      if (!dataMatrix[i][colIndex]) {
        rowIndex = i;
      }
    }

    // אם לא נמצא מקום פנוי בטור, החזרת הפונקציה ללא פעולה נוספת
    if (rowIndex === -1) {
      return;
    }

    //עדכון המטריצה עם המיקום שבו נוסף הכדור ובצבע הנכון
    if (wichPleyer)
      dataMatrix[rowIndex][colIndex] = 1;
    else
      dataMatrix[rowIndex][colIndex] = 2;

    // עדכון הטבלה ב-HTML עם הכדור החדש
    var x = document.getElementById("b" + rowIndex + "_" + colIndex);
    //עדכון הצבע של הכדור בתא המתאים והעברת התור 
    if (wichPleyer) {
      //עדכון התא בצבע המתאים
      x.style.backgroundColor = 'red';
      pop.play();
      timer();
      //אם ניצח מזמן פונקציית ניצחון
      if (isWin(rowIndex, colIndex)) {
        winingTab();
        clearInterval(countdown)
      }
      //החלפת שחקן נוכחי
      
      wichPleyer=false;
      var txt = document.getElementById("player");
    txt.innerText ='שחקן 2 עכשיו תורך...';

    }
    else {
      //עדכון התא בצבע המתאים
      x.style.backgroundColor ='blue' ;
      pop.play();
      wichPleyer = true;
      timer();
      //אם ניצח מזמן פונקציית ניצחון
      if (isWin(rowIndex, colIndex)) {
        winingTab();
        clearInterval(countdown)
      }
      //החלפת שחקן נוכחי
      

      var txt = document.getElementById("player");
      txt.innerText =  'שחקן 1 עכשיו תורך...';   
       
      
    }
    //בדיקה האם כעת הטבלה מלאה ונגמר המשלק
    let count = 0;
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 8 && count === 0; j++)
        if (dataMatrix[i][j] === 0)
          count++;
    if (count === 0) { 
      clearInterval(countdown)
      loosingTab();
    }
  }
}

//פונקציה לבדיקה האם ניצח והשלים רביעיה לאורך לרוחב או באלכסון
function isWin(rowIndex, colIndex) {
  var count = 1;
  //לולאה לבדיקת כל השורה לאורך עד שנמצאת רביעייה
  for (let i = 1; i < 8 && count < 4; i++) {
    //השוואה בין התא בשורה עם התא שלפניו
    if (dataMatrix[rowIndex][i - 1] === dataMatrix[rowIndex][i] && dataMatrix[rowIndex][i - 1] !== 0)
      count++;
    else
      count = 1;
  }
  //אם נמצאה רביעייה מאותו צבע החזר נצחון
  if (count === 4)
    return true;
  //איתחול המשתנה המונה
  count = 1;
  //לולאה לבדיקת כל עמודה לאורך עד שנמצאת רביעייה
  for (let i = 1; i < 6 && count < 4; i++) {
    //השוואה בין התא בטור עם התא שלפניו
    if (dataMatrix[i - 1][colIndex] === dataMatrix[i][colIndex] && dataMatrix[i - 1][colIndex] !== 0)
      count++;
    else
      count = 1;
  }
  //אם נמצאה רביעייה מאותו צבע החזר נצחון
  if (count === 4)
    return true;
  //איתחול המשתנה המונה
  count = 1;
  // לולאות לבדיקת כל עמודה ושורה באלכסון מימין למעלה עד שמאל למטה עד שנמצאת רביעייה 
  //לולאה למעבר על האלכסונים בכל 3 השורות הראשונות
  for (let i = 0; i < 3; i++) {
    //מעבר על כל תא בכל שורה
    for (let j = 0; j < 5; j++) {
      //הכנסת הערך הנוכחי לתוך משתנה עזר
      let val = dataMatrix[i][j];
      //בדיקב בעזרת המשתנה האם יש רצף של 4
      if (val && val === dataMatrix[i + 1][j + 1] && val === dataMatrix[i + 2][j + 2] && val === dataMatrix[i + 3][j + 3])
        return true;
    }
  }

  // לולאות לבדיקת כל עמודה ושורה באלכסון שמאל למעלה עד ימין למטה עד שנמצאת רביעייה 
  //לולאה למעבר על האלכסונים בכל 3 השורות הראשונות
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      let val = dataMatrix[i][j];
      if (val && val === dataMatrix[i - 1][j + 1] &&
        val === dataMatrix[i - 2][j + 2] && val === dataMatrix[i - 3][j + 3]) {
        return true;
      }
    }
  }
  return false;
}


//משתנה לעדכון ערכי הטיימר בכל שלב
var countdown;
//הגדרת טיימר
function timer() {
  var elem = document.getElementById("in");
  var height = 0;
  clearInterval(countdown);
  countdown = setInterval(
    function () {
      if (height >= 100) {
        clearInterval(countdown);
        loosingTab();
        end();
      }
      else if (height >= 70) {
        height++;
        elem.style.height = height + '%';
        elem.style.backgroundColor = "red";
      }
      else {
        height++;
        elem.style.height = height + '%';
      }
    }, 100);

}

//חלון קופץ ניצחון
function winingTab() {
  
  alert('נצחת במשחק');

 
}

//חלון קופץ הפסד
function loosingTab() {
  alert('נגמר הזמן')

}
//הסתרת כפתור
function hide() {
  let btn = document.getElementById("begin");
  btn.style.display = 'none';
  let arr = document.getElementById("arrow");
  arr.style.display = 'block';
  timer();
  setPlayer(wichPleyer);
}