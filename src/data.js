//import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "adminAnees",
      email: "admin@weatherbot.com",
      password: "12345",
      //password: bcrypt.hashSync("12345"),
      isAdmin: true,
    },
    {
      name: "Seena",
      email: "seena@weatherbot.com",
      password: "12345",
      isAdmin: false,
    },
  ],

  telegram_api_token: [
    {
      token: "fsdfjf894t 409t5uv9ut5v093v",
    },
  ],
};

export default data;
