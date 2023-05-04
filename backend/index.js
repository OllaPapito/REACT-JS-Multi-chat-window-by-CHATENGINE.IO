const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        {
            username: username, 
            secret: username, 
            first_name: username
        },
        { headers: { "private-key": "private-key-from-site-here" } }
    );
    console.log("response from chatengine.io", r);
    return res.status(r.status).json(r.data);
  } catch (e) {
        if (e.response) {
        return res.status(e.response.status).json(e.response.data); }
        else {
          return res.status(500).json({error: "unknow error ocurred:", e});
        }
  }
});

app.listen(3001);