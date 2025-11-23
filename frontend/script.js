const form = document.getElementById("userForm");
const responseDiv = document.getElementById("response");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    class: document.getElementById("class").value
  };

  const res = await fetch("http://localhost:5000/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  responseDiv.innerText = result.message;
  form.reset();
});
