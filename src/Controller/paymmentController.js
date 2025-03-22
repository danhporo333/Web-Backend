import { createVietQRUrl } from '../Services/paymentService.js';

export const generateVietQRController = async (req, res) => {
    try {
        const { amount, orderId } = req.body;
        const userId = req.user.userId;

        // Tạo QR code cho thanh toán
        const qrData = await createVietQRUrl({
            amount: amount,
            orderId: orderId,
            description: `Thanh toan don hang ${orderId}`
        });

        return res.status(200).json({
            errorCode: 0,
            message: 'QR Code được tạo thành công',
            data: {
                qrUrl: qrData.qrUrl,
                amount: amount,
                orderId: orderId
            }
        });
    } catch (error) {
        console.error("Error generating QR:", error);
        return res.status(500).json({
            errorCode: 1,
            message: error.message
        });
    }
};