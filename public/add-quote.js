const submitButton = document.getElementById("submit-quote");
const newQuoteContainer = document.getElementById("new-quote");
const quoteInput = document.getElementById("quote");
const personInput = document.getElementById("person");
const h2 = document.getElementById("title");
let quoteId;

window.addEventListener("load", () => {
  const paramNum = window.location.search.slice(1).split("=")[1];
  if (paramNum) {
    fetch(`/api/quotes/${paramNum}`)
      .then(response => response.json())
      .then(({ quote }) => {
        quoteInput.value = quote.quote;
        personInput.value = quote.person;
        quoteId = quote.id;
        h2.innerHTML = "Edit the Quote";
      });
  } else {
    h2.innerHTML = "Add a New Quote";
  }
});

submitButton.addEventListener("click", () => {
  const quote = quoteInput.value;
  const person = personInput.value;
  const idQuery = quoteId ? `&id=${quoteId}` : "";
  fetch(`/api/quotes?quote=${quote}&person=${person}${idQuery}`, {
    method: quoteId ? "PUT" : "POST"
  })
    .then(response => response.json())
    .then(({ quote }) => {
      const newQuote = document.createElement("div");
      const addedOrEdited = quoteId ? "edited" : "added";
      newQuote.innerHTML = `
      <h3>Congrats, your quote was ${addedOrEdited}!</h3>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `;
      newQuoteContainer.appendChild(newQuote);
    });
});
