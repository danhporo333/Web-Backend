import QRCode from 'qrcode';

export const generateVietQRCode = async (orderData) => {
    try {
        const qrData = {
            accountNo: "113366668888", 
            accountName: "NGUYEN VAN A", 
            acqId: "970415",  // Mã ngân hàng VIETINBANK
            bankName: "VIETINBANK",
            amount: orderData.totalAmount,
            addInfo: `Thanh toan don hang ${orderData.orderId}`,
            template: "compact"
        };

        // Tạo URL QR theo định dạng VietQR 
        const qrUrl = `https://img.vietqr.io/image/${qrData.acqId}-${qrData.accountNo}-${qrData.template}.png?amount=${qrData.amount}&addInfo=${qrData.addInfo}&accountName=${qrData.accountName}`;
        
        return {
            qrUrl: qrUrl,
            bankInfo: {
                bankName: qrData.bankName,
                accountNo: qrData.accountNo,
                accountName: qrData.accountName,
                amount: qrData.amount
            }
        };
    } catch (error) {
        throw error;
    }
};