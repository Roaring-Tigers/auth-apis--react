
import React, { useState } from "react"; 
import AWS from "aws-sdk";



const ImageUpload = () => {

      let [file, setFile] = useState(null)
      let [imgLink, setImgLink] = useState(null)

        // console.log(process.env.REACT_APP_ACCESS_KEY_ID)
        // console.log(process.env.REACT_APP_SECRET_KEY)
        // console.log(process.env.REACT_APP_REGION)
     
     AWS.config.update({
             accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
             secretAccessKey: process.env.REACT_APP_SECRET_KEY,
             region: process.env.REACT_APP_REGION
     })

      async function uploadFile() {
          const s3 = new AWS.S3()
          let filename = `${Date.now()}-${file.name}`
          try{
              const response  =  await s3.putObject({
                    Bucket: "insta-roaring-tigers",
                    Key: filename,
                    Body: file,
                    ContentType: file.type,
              }).promise()
             setImgLink(`https://insta-roaring-tigers.s3.ap-south-1.amazonaws.com/${filename}`)
          }
            catch(error){
                 console.log(error.message)
            }
     }

     return(
        <div>
                 <input type="file" onChange={e => setFile(e.target.files[0])} />

                 <button onClick={uploadFile}>Upload</button>

                 {
                        imgLink && <img src={imgLink} alt="uploaded" />
                 }
        </div>
     )



}

export default ImageUpload;