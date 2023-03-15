const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const pinFileToIpfs = async () => {
  const formData = new FormData();
  const src = "img/11.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "my character.png",
  });
  formData.append("pinataMetaData", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: "c4ab4260c6cc6170e015",
          pinata_secret_api_key:
            "157f107a8423474f1d277f808d8a505c612a85f667ae669476d364a5bceace87",
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
// pinFileToIpfs();

// pinFileToIpfs(); node index 실행 후 아래 해쉬 값 복사해서 아래에 적어 넣고 주석처리
// QmcsstUVYRHxbLNx1XpKWz6VbqLa6D3Ub4SrrED3UwNy1N  이 값은 pinata의 CID = URL 값

const pinJson = async () => {
  const formData = {
    pinataMetaData: { name: "NFT 1" },
    pinataOptions: { cidVersion: 0 },
    pinataContent: {
      name: "315 NFT",
      description: "피나타 사용 중",
      image:
        "https://gateway.pinata.cloud/ipfs/QmcsstUVYRHxbLNx1XpKWz6VbqLa6D3Ub4SrrED3UwNy1N",
      attributes: [],
    },
  };

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      formData,
      {
        headers: {
          "content-type": "application/json",
          pinata_api_key: "c4ab4260c6cc6170e015",
          pinata_secret_api_key:
            "157f107a8423474f1d277f808d8a505c612a85f667ae669476d364a5bceace87",
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

// pinJson(); 이걸 실행 하면 CID 값이 나온다.
// QmZ5peLXtAmFY3CDMurvXPMqYdZukCivX1sNKtMXTLgwVg 는 CID 값
