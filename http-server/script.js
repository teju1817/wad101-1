let users = [];

function displayUsers() {
  let tableHTML = "";

  users.forEach((user) => {
    if (user.name && user.email && user.password && user.dob && user.terms) {
      tableHTML += "<tr>";
      tableHTML += `<td>${user.name}</td>`;
      tableHTML += `<td>${user.email}</td>`;
      tableHTML += `<td>${user.password}</td>`;
      tableHTML += `<td>${user.dob}</td>`;
      tableHTML += `<td>${user.terms}</td>`;
      tableHTML += "</tr>";
    }
  });

  document.getElementById("userTableBody").innerHTML = tableHTML;
}

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const ageDifference = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifference);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
}

function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address format.");
    return;
  }

  const user = {
    name,
    email,
    password,
    dob,
    terms: terms ? "true" : "false",
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("registrationForm").reset();
  displayUsers();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
    displayUsers();
  }
});

document.getElementById("registrationForm").addEventListener("submit", handleSubmit);

document.getElementById("clearTableBtn").addEventListener("click", () => {
  users = [];
  localStorage.removeItem("users");
  displayUsers();
});
