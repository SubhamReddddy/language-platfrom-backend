import app from "./app.js";
import connnectToDB from "./config/DB.js";

//connected to mongodb
connnectToDB();

app.listen(Number(process.env.PORT), String(process.env.HOST), () => {
  console.log(`server running on port no ${process.env.PORT}`);
});
