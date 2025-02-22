const path = require("path");

const uploadSingleFile = async (fileObject) => {

    // save => public/images/upload
    //remember to create the upload folder first
    let uploadPath = path.resolve(__dirname, "../public/image");
    console.log("Upload path:", uploadPath);


    let extName = path.extname(fileObject.name);

    let baseName = path.basename(fileObject.name, extName);

    //create final path: eg: /upload/your-image.png
    let finalName = `${baseName}-${Date.now()}${extName}`
    let finalPath = `${uploadPath}/${finalName}`;


    try {
        await fileObject.mv(finalPath);

        return {
            status: 'success',
            path: finalName,
            err: null
        }
    } catch (error) {
        console.log(">>> check err: ", error);
        return {
            status: 'failed',
            path: null,
            err: JSON.stringify(err)
        }
    }

}

const uploadMultipleFiles = () => {

}

module.exports = {
    uploadSingleFile, uploadMultipleFiles
}