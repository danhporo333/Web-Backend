import { uploadSingleFile } from '../Services/fileService';

export const uploadFileController = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                errorCode: 1,
                message: 'No files were uploaded.'
            });
        }

        let result = await uploadSingleFile(req.files.image);

        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )

    } catch (error) {
        console.error("Error in file upload:", error);
        return res.status(500).json({
            errorCode: 1,
            message: 'Server error! Unable to upload file.'
        });
    }
}