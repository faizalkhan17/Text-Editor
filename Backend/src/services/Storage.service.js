const {ImageKit} = require("@imagekit/nodejs")

const imageKit = new ImageKit({
  privateKey: 'private_gj1CM3G9bKbh/lmIaUpm5o4N52U='
});

async function uploadFile(Buffer){

const result = await imageKit.files.upload({
    file: Buffer.toString("base64"),
    fileName: "image.jpg"

})

return result;
}

module.exports = uploadFile

