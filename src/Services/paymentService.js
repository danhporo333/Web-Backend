import { vietQRConfig } from '../Config/vietqr.js';
import db from '../model/index.js';

export const createVietQRUrl = async ({ amount, orderId, description }) => {
    try {
        // Tạo URL VietQR
        const vietQrUrl = `https://api.vietqr.io/image/${vietQRConfig.bankId}/${vietQRConfig.accountNo}/${amount}/${description}/${vietQRConfig.template}`;

        // Lưu thông tin thanh toán
        await db.Payment.create({
            orderId: orderId,
            amount: amount,
            paymentMethod: 'VIETQR',
            status: 'pending'
        });

        return {
            qrUrl: vietQrUrl
        };
    } catch (error) {
        throw error;
    }
};

export const processPayment = async (orderId, paymentMethod, addressId, userId) => {
    try {
        const order = await db.Order.findByPk(orderId);
        if (!order) {
            throw new Error('Không tìm thấy đơn hàng');
        }

        let paymentStatus = 'pending';
        if (paymentMethod === 'COD') {
            paymentStatus = 'pending';
        } else if (paymentMethod === 'VIETQR') {
            paymentStatus = 'processing';
        }

        const payment = await db.Payment.create({
            userId: userId,
            orderId: orderId,
            addressId: addressId, 
            amount: order.totalAmount,
            paymentMethod: paymentMethod,
            status: paymentStatus
        });

        await order.update({ status: 'processing' });

        return payment;
    } catch (error) {
        throw error;
    }
};