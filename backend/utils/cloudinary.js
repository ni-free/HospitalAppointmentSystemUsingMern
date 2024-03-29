import {v2 as cloudinary} from 'cloudinary';
 import fs from "fs"   

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary=async (localFilePath)=>{
    try{
          if(!localFilePath)
          return null
         const response=await  cloudinary.uploader.upload(localFilePath,
          { 
            resource_type:"auto"
           });
       //    console.log("file uploaded on cld",response.url);

           fs.unlinkSync(localFilePath)
           return response
    }
    catch(error)
    {
            fs.unlinkSync(localFilePath)
    }
}
const deleteOnCloudinary =async(url)=>{
  try {

    const extractPublicId = (link) => {
      link = String(link);
      if (typeof link !== 'string') {
        console.error('Input is not a string');
        return null; // or throw an error, depending on your requirements
      }
    
      const parts = link.split('/');
      const lastPart = parts[parts.length - 1];
    
      if (!lastPart.includes('.')) {
        console.error('Invalid link format');
        return null; // or throw an error
      }
    
      const dottedParts = lastPart.split('.');
      dottedParts.pop();
    
      if (dottedParts.length === 0) {
        console.error('Invalid link format');
        return null; // or throw an error
      }
    
      return dottedParts.join('.');
    };
    
    
    if(!extractPublicId(url))
    return null
       cloudinary.uploader.destroy(extractPublicId(url)).then(result=>console.log(result))
    
  } catch (error) {
    console.log("error in deleting image from cloudinary",error);
  }
}
export {uploadOnCloudinary,deleteOnCloudinary}