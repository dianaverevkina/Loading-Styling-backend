import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as crypto from "crypto";
import slow from 'connect-slow';

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(slow({ delay: 6000 }));

const news = [
  {
    id: crypto.randomUUID(),
    image: "https://via.placeholder.com/600/c4084a",
    header: "'Люди икс: Темный феникс' - свой против своих. Показ стартует 7 июня",
    content: "История Джин Грей, которая разворачивается в тот момент, когда героиня превращается в культового Тёмного Феникса. Во время опасной для жизни спасательной миссии в космосе девушка оказывается поражена таинственной космической силой, которая превращает её в одного из самых могущественных мутантов",
    created: new Date(),
  },
  {
    id: crypto.randomUUID(),
    image: "https://via.placeholder.com/600/68e0a8",
    header: "'Джон Уик 4' - продолжение истории наемного убийцы уже 16 мая в кино",
    content: "Нью-Йорк, Париж, Осака, Берлин — месть не признаёт государственных границ. Джон Уик объявил войну Правлению Кланов, и теперь его голова — самый желанный трофей для наёмников со всего света.",
    created: new Date(),
  },
  {
    id: crypto.randomUUID(),
    image: "https://via.placeholder.com/600/92c952",
    header: "'Мститети 4: Финал' показ стартует 25 апреля",
    content: "Оставшиеся в живых члены команды Мстителей и их союзники должны разработать новый план, который поможет противостоять разрушительным действиям могущественного титана Таноса.",
    created: new Date(),
  },
  {
    id: crypto.randomUUID(),
    image: "https://via.placeholder.com/600/d32776",
    header: "'Аквамен и потерянное царство' - в кино 14 декабря",
    content: "Аквамен - потомок атланта и человека. Его отец, смотритель маяка, однажды встретил повелительницу Атлантиды и они полюбили друг друга. Но этот союз длился не долго - атланты разлучили их, забрав царицу с собой, а маленький Аквамен остался с отцом.",
    created: new Date(),
  },
];

app.get("/", async (request, response) => {
  response
    .status(200)
    .send(JSON.stringify({ 
      status: "ok",
      news,
    }))
    .end();
});

const port = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();