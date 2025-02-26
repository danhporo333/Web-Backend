// const { uploadSingleFile } = require('../Services/fileService')
import { uploadSingleFile } from '../Services/fileService.js';

export const postUploadSingleFileApi = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let result = await uploadSingleFile(req.files.image);
    console.log("check result =", result)

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

// module.exports = postUploadSingleFileApi;