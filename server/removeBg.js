const axios = require("axios/index.d.cts");
const FormData = require("form-data");
const fs = require("fs");

async function removeBackground(inputPath, outputPath) {
  const formData = new FormData();
  formData.append("image_file", fs.createReadStream(inputPath));
  formData.append("size", "auto");

  const response = await axios.post(
    "https://api.remove.bg/v1.0/removebg",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVE_BG_KEY,
      },
      responseType: "arraybuffer",
    }
  );

  fs.writeFileSync(outputPath, response.data);
}

module.exports = removeBackground;
