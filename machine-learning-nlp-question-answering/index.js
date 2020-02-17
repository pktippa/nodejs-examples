const qa = require("question-answering");

const text = `
  Super Bowl 50 was an American football game to determine the champion of the National Football League (NFL) for the 2015 season.
  The American Football Conference (AFC) champion Denver Broncos defeated the National Football Conference (NFC) champion Carolina Panthers 24–10 to earn their third Super Bowl title. The game was played on February 7, 2016, at Levi's Stadium in the San Francisco Bay Area at Santa Clara, California.
  As this was the 50th Super Bowl, the league emphasized the "golden anniversary" with various gold-themed initiatives, as well as temporarily suspending the tradition of naming each Super Bowl game with Roman numerals (under which the game would have been known as "Super Bowl L"), so that the logo could prominently feature the Arabic numerals 50.
`;

const question = "Who won the Super Bowl?";
const nTxt = `Online analytical processing, or OLAP , is an approach to answer multi-dimensional analytical (MDA) queries swiftly in computing. OLAP is part of the broader category of business intelligence, which also encompasses relational databases, report writing and data mining. Typical applications of OLAP include business reporting for sales, marketing, management reporting, business process management (BPM), budgeting and forecasting, financial reporting and similar areas, with new applications emerging, such as agriculture.`;

const nQuest = "Which category does OLAP belong to?";

qa.QAClient.fromOptions().then((qaClient) => {
  qaClient.predict(nQuest, nTxt).then((answer) => { console.log('Ans', answer);}).catch((err) => {
    console.error(err);
  })
}).catch((err) => {console.error(err);});
// const answer = await ;

// console.log(answer); // { text: 'Denver Broncos', score: 0.3 }