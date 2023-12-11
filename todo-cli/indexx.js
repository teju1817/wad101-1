let userList = [];

function displayUsers() {
  let userHTML = "";
  userList.forEach((user) => {
    if (user.name && user.email && user.password && user.dob && user.terms) {
      userHTML += "<tr>";
      userHTML += `<td>${user.name}</td>`;
      userHTML += `<td>${user.email}</td>`;
      userHTML += `<td>${user.password}</td>`;
      userHTML += `<td>${user.dob}</td>`;
      userHTML += `<td>${user.terms}</td>`;
      userHTML += "</tr>";
    }
  });
  console.log(userHTML);
  document.querySelector("#userTableBody").innerHTML = userHTML;
}

function calculateAge(date) {
  const dob = new Date(date);
  const diff = Date.now() - dob.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
}

function handleSubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const dob = document.querySelector("#dob").value;
  const terms = document.querySelector("#terms").checked;
  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("Register if you're between 18 and 55 years old.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email.");
    return;
  }

  if (!terms) {
    userList.push({ name, email, password, dob, terms: "false" });
  } else {
    userList.push({ name, email, password, dob, terms: "true" });
  }

  console.log(userList);
  localStorage.setItem("userList", JSON.stringify(userList));
  document.querySelector("#regForm").reset();
  displayUsers();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUsers = localStorage.getItem("userList");
  if (storedUsers) {
    userList = JSON.parse(storedUsers);
    displayUsers();
  }
});

document.querySelector("#regForm").addEventListener("submit", handleSubmit);

document.querySelector("#clearBtn").addEventListener("click", () => {
  userList = [];
  localStorage.removeItem("userList");
  displayUsers();
});
