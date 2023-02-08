import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
const port: number = 4000;

app.get("/pdf/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const filePath = `./sample${id}.pdf`;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).send("pdf cannot be read");
    }
    const base64Encoded = data.toString("base64");
    const encodedJsonData = data.byteOffset;
    console.log("byteOffset is", encodedJsonData);
    console.log("chunkSized is", base64Encoded.length);
    res.status(200).send(base64Encoded);
  });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
