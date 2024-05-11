const api = "https://api.quotable.io/random";

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");
const shareBtn = document.getElementById("sbth");

function getQuote() {
  fetch(api)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(data => {
      quote.textContent = data.content;
      author.textContent = `${data.author}`;
    })
    .catch(error => {
      console.error("Error occurred:", error);
    });
}

btn.addEventListener("click", getQuote);

shareBtn.addEventListener("click", () => {
    const quoteText = quote.textContent + " - " + author.textContent;
    if (navigator.share) {
      navigator
        .share({
          title: "Quote",
          text: quoteText,
        })
        .then(() => console.log("Shared successfully"))
        .catch(error => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  });

getQuote();
