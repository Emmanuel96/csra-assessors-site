const s3Client = require("../utils/s3Client");
const AdmZip = require("adm-zip");
const User = require('../models/User')
const fs = require("fs")
const {
  ListObjectsCommand,
  GetObjectCommand
} = require("@aws-sdk/client-s3");

exports.download_all = async (req, res, next) => {
  const request = await User.findOne({ application: req.params.id })
  const Dir = await request._id.toString()

  const bucketParams = {
    Bucket: "csra",
    Key: `users/${Dir}/`
  }

  // Function to turn the file's body into a string.
  const parseStream = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream.on('error', (err) => reject(err))
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })
  }

  try {
    const response = await s3Client.send(new ListObjectsCommand(bucketParams))

    const filesToDownload = response.Contents.filter(content => content.Key.startsWith(`users/${Dir}/`))

    const downloadedFiles = await Promise.all(filesToDownload.map(async (file) => await s3Client.send(new GetObjectCommand({ Bucket: "csra", Key: file.Key }))))

    const parsedFiles =  await Promise.all(downloadedFiles.map(async (response) => await parseStream(response.Body)))

    const zip = new AdmZip()

    filesToDownload.forEach((file, i) => {
      console.log(file.Key.split("/").pop(), i)
      zip.addFile(file.Key, parsedFiles[i])
    })

    if(filesToDownload < 1){
      return res.status(400).end()
    }

    fs.writeFileSync("/tmp/attached.zip", zip.toBuffer())
    res.status(200).download("/tmp/attached.zip")
  } catch (err) {
    console.log("no files for this user")
    res.status(400).end()
  }
}