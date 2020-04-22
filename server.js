const express = require("express");
const app = express();

let { quotes } = require("./data");
const { getRandomElement, higherIdQuote, createId } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => console.log("Now listening on port " + PORT));

const apiRouter = express.Router();
app.use("/api/quotes", apiRouter);

apiRouter.get("/", (req, res, next) => {
  const { query } = req;
  if (Object.keys(query).length === 0) {
    res.send({ quotes });
  } else {
    const quotesFromAuthor = quotes.filter(q => q.person === query.person);
    if (quotesFromAuthor) {
      res.status(200).send({ quotes: quotesFromAuthor });
    } else {
      res.status(404).send(quotesFromAuthor);
    }
  }
});

apiRouter.get("/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.send({ quote });
});

apiRouter.post("/", (req, res, next) => {
  const { quote, person } = req.query;
  if (quote && person) {
    const quoteObj = {
      id: createId(quotes, quote),
      quote,
      person
    };
    quotes.push(quoteObj);
    res.status(201).send({ quote: quoteObj });
  } else {
    res.status(404).send();
  }
});

apiRouter.put("/", (req, res, next) => {
  const { id, quote, person } = req.query;
  if (quote && person && id) {
    const quoteObj = {
      id: parseInt(id),
      quote,
      person
    };
    quotes = quotes.map(quote => (quote.id === quoteObj.id ? quoteObj : quote));
    res.status(200).send({ quote: quoteObj });
  } else {
    res.status(404).send();
  }
});

apiRouter.get("/:id", (req, res, next) => {
  const matchingQuote = quotes.find(quote => quote.id == req.params.id);
  if (matchingQuote) {
    res.send({ quote: matchingQuote });
  }
});
