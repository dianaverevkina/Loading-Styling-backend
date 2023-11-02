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
    image: "https://images.unsplash.com/photo-1596448181829-f637a01081d6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxpbmt8ZW58MHx8MHx8fDA%3D",
    header: "'Люди икс: Темный феникс' - свой против своих. Показ стартует 7 июня",
    content: "История Джин Грей, которая разворачивается в тот момент, когда героиня превращается в культового Тёмного Феникса. Во время опасной для жизни спасательной миссии в космосе девушка оказывается поражена таинственной космической силой, которая превращает её в одного из самых могущественных мутантов",
    created: new Date(),
  },
  {
    id: crypto.randomUUID(),
    image: "https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxpbmt8ZW58MHx8MHx8fDA%3D",
    header: "'Джон Уик 4' - продолжение истории наемного убийцы уже 16 мая в кино",
    content: "Нью-Йорк, Париж, Осака, Берлин — месть не признаёт государственных границ. Джон Уик объявил войну Правлению Кланов, и теперь его голова — самый желанный трофей для наёмников со всего света.",
    created: new Date(),
  },
  {
    id: crypto.randomUUID(),
    image: "https://media.istockphoto.com/id/1435226213/photo/expanding-global-connection-lines-global-business-financial-network-flight-routes.webp?b=1&s=170667a&w=0&k=20&c=u94eb8MJzcyBhTAWNY8MAn5lFQSpE7hRa31aS0idgg4=",
    header: "'Мститети 4: Финал' показ стартует 25 апреля",
    content: "Оставшиеся в живых члены команды Мстителей и их союзники должны разработать новый план, который поможет противостоять разрушительным действиям могущественного титана Таноса.",
    created: new Date(),
  },
  {
    id: crypto.randomUUID(),
    image: "https://media.istockphoto.com/id/1433041100/photo/communication-technology-with-global-internet-network-connected-in-europe-telecommunication.webp?b=1&s=170667a&w=0&k=20&c=Nm8nUEU0jF3e6R7g_VRYCPvgAOzn9qdcxuG1HwjDq2k=",
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