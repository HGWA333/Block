import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream"; // 데이터를 stream화 해준다.

const app: Express = express();

dotenv.config();

const pinata = new pinataSDK(process.env.API_Key, process.env.API_Secret);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer();

app.get("/api/list", (req: Request, res: Response) => {
  const data = [
    {
      name: "555nft",
      description: "테스트중이에요",
      image:
        "https://gateway.pinata.cloud/ipfs/QmP8dufkjkTqQs1HMr3u9UxVSA28HEdH38oHFyrJvomhGC",
    },
    {
      name: "TestNFT",
      description: "테스트중이에ㅁㄴㅇㅁㄴㅇ",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdaBpCi8xmJE5yV5erN8AKyumFmv1hBRFGPMeFLNDpN5z",
    },
    {
      name: "asd",
      description: "asd",
      image:
        "https://gateway.pinata.cloud/ipfs/QmapbikWyEuy1gdZbVWW4d6w1Meihc7CPDDqP7XyYZoiDG",
    },
    {
      name: "zxczxc",
      description: "zxczxczxc",
      image:
        "https://gateway.pinata.cloud/ipfs/QmYwbEKSAksbxjJd5pynhfsuhDL6Eo6mv7LrkagdKifF5i",
    },
    {
      name: "315 NFT",
      description: "피나타 사용 중",
      image:
        "https://gateway.pinata.cloud/ipfs/QmcsstUVYRHxbLNx1XpKWz6VbqLa6D3Ub4SrrED3UwNy1N",
    },
    {
      name: "zxczxc",
      description: "zxczxczxc",
      image:
        "https://gateway.pinata.cloud/ipfs/QmXZFN89YjKsvXZkkSR8Die6y1YpSVrGRHDk9N48jDtjbj",
    },
    {
      name: "315 NFT",
      description: "피나타 사용 중",
      image:
        "https://gateway.pinata.cloud/ipfs/QmcsstUVYRHxbLNx1XpKWz6VbqLa6D3Ub4SrrED3UwNy1N",
    },
    {
      name: "zxczxc",
      description: "zxczxczxc",
      image:
        "https://gateway.pinata.cloud/ipfs/QmXZFN89YjKsvXZkkSR8Die6y1YpSVrGRHDk9N48jDtjbj",
    },
  ];

  res.send(data);
});

app.post(
  "/api/mint",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { name, description }: { name: string; description: string } =
      req.body;

    const imageResult: {
      IpfsHash: string;
      PinSize: number;
      Timestamp: string;
      isDuplicate?: boolean;
    } = await pinata.pinFileToIPFS(Readable.from(req.file.buffer), {
      pinataMetadata: { name: Date.now().toString() },
      pinataOptions: { cidVersion: 0 },
    });

    if (imageResult.isDuplicate) {
    }
    console.log("imageResult::::", imageResult);

    const jsonResult = await pinata.pinJSONToIPFS(
      {
        name,
        description,
        image: `https://gateway.pinata.cloud/ipfs ${imageResult.IpfsHash}`,
      },
      {
        pinataMetadata: { name: Date.now().toString() + ".json" },
        pinataOptions: { cidVersion: 0 },
      }
    );
    console.log("jsonResult::::", jsonResult);

    res.send({ msg: "mint complete", jsonResult });
  }
);

app.listen(8080, () => {
  console.log(8080 + " server start");
});

// npm start 할 때  npm run start:dev으로 한다. package.json의 script에
//   "start": "node ./build/index.js",
//   "start:dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" src/index.ts" 추가한다.
