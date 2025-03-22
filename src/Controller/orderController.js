import db from '../model/index.js';
import { createOrder, getOrderDetails } from '../Services/orderService.js';
import { generateVietQRCode } from '../Services/VietQRservice.js';
import { processPayment } from '../Services/paymentService.js';

export const checkoutOrderController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {paymentMethod, recipientName, phoneNumber, addressLine1, addressLine2, city, state} = req.body;
        
        const address = await db.Address.create({
            recipientName,
            phoneNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            userId
        });

        const order = await createOrder(userId, address.id);
        const payment = await processPayment(order.id, paymentMethod, address.id, userId);

        let responseData = {
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentMethod: paymentMethod,
            paymentStatus: payment.status,
            shippingAddress: address
        };

        // Nếu thanh toán qua VIETQR
        if (paymentMethod === 'vietqr') {
            const qrData = await generateVietQRCode({
                orderId: order.id,
                totalAmount: order.totalAmount
            });
            
            responseData.qrPayment = qrData;
            responseData.paymentInstructions = [
                "1. Mở ứng dụng Mobile Banking",
                "2. Quét mã QR hoặc tải hình ảnh QR",
                "3. Kiểm tra thông tin và xác nhận thanh toán",
                "4. Đơn hàng sẽ được xử lý sau khi nhận được thanh toán"
            ];
        }

        return res.status(200).json({
            errorCode: 0,
            message: 'Đặt hàng thành công',
            data: responseData
        });

    } catch (error) {
        console.error("Error in checkout:", error);
        return res.status(500).json({
            errorCode: 1,
            message: error.message
        });
    }
};

export const getOrderDetailsController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderDetails = await getOrderDetails(orderId);

        return res.status(200).json({
            errorCode: 0,
            message: 'Lấy thông tin đơn hàng thành công',
            data: orderDetails
        });
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            message: error.message
        });
    }
};