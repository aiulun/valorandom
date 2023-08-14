const submitButton = document.querySelector("button");

fetch("https://valo-api.onrender.com/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.error(err))
  .finally(() => {});
