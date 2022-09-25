const result = document.querySelector(".result-box");
const passBtn = document.querySelector("#pass-btn");
const passLength = document.querySelector("#length");
const checkBox = document.querySelectorAll('input[type="checkbox"');
const checked = { checked: false, length: 0 };
const clipBoardButton = document.querySelector('#clipBoardButton');
const checkBoxCases = {
  uppercase: false,
  numbers: false,
  symbols: false,
};
const allowedCases = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+",
};

passLength.addEventListener("change", (e) => {
  if (e.target.value >= 4 && e.target.value <= 12) {
    checked.length = e.target.value;
    checked.checked = true;
  } else {
    alert("Please Enter valid length password");
    e.target.value = 0;
  }
  console.log(checked.length);
});

Array.from(checkBox).forEach((box, index) => {
  box.addEventListener("change", (e) => {
    //if every box is checked
    if (Array.from(checkBox).every((box) => box.checked)) {
      Object.keys(checkBoxCases).forEach((key) => {
        checkBoxCases[key] = true;
        checked.checked = true;
        console.log("all true");
      });
    }
    //if every box is unchecked
    else if (Array.from(checkBox).every((box) => !box.checked)) {
      Object.keys(checkBoxCases).forEach((key) => {
        checkBoxCases[key] = false;
        checked.checked = false;
        console.log("all false");
      });
    }
  
    else {
      Object.keys(checkBoxCases).forEach((_, index) => {
        if (index === 0) {
          checkBoxCases.uppercase = e.target.checked;
          checked.checked = true;
          console.log("some true");
        } else if (index === 1) {
          checkBoxCases.numbers = e.target.checked;
          checked.checked = true;
          console.log("some true");
        } else if (index === 2) {
          checkBoxCases.symbols = e.target.checked;
          checked.checked = true;
          console.log("some true");
        } else if (index === 0 && index === 1) {
          checkBoxCases.uppercase = e.target.checked;
          checkBoxCases.numbers = e.target.checked;
          checked.checked = true;
          console.log("some true");
        } else if (index === 0 && index === 2) {
          checkBoxCases.uppercase = e.target.checked;
          checkBoxCases.symbols = e.target.checked;
          checked.checked = true;
          console.log("some true");
        }
      });
    }
  });
});

console.log(passLength.value);
const allChecked = () => {
  Object.keys(checkBoxCases).every((key) => checkBoxCases[key]);
};

const noneChecked = () => {
  Object.keys(checkBoxCases).every((key) => !checkBoxCases[key]);
};

const anyChecked = () => {
  Object.keys(checkBoxCases).some((key) => checkBoxCases[key]);
};

const getRandomChar = (str) =>
  str.charAt(Math.floor(Math.random() * `${str.length}`));

const generatePassword = (length = passLength.value) => {
  let pass = "";
  if (allChecked) {
    pass += getRandomChar(allowedCases.uppercase);
    pass += getRandomChar(allowedCases.numbers);
    pass += getRandomChar(allowedCases.symbols);
    for (let i = pass.length; i < length; i++) {
      pass += getRandomChar(Object.values(allowedCases).join(""));
    }
  }

  result.textContent = pass;
};

passBtn.addEventListener("click", () => {
  if (checked.checked) {
    setTimeout(() => {
      generatePassword();
    }, 100);
  } else {
    alert("Please select the options");
  }
});



//CLIPBOARD FUNCTIONALITY

clipBoardButton.addEventListener('click', () => {
   if(checked.checked){
    if(navigator.clipboard){
        navigator.clipboard.writeText(result.textContent)
        .then(() => {
             alert('Password copied to clipboard')
        })
        .catch((err) => {
             console.log(err)
        })
  }
   }
});

