const forgotPassOtp = ({ name, otp }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Password Reset OTP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f1f5f9;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .email-wrapper {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                overflow: hidden;
                padding: 40px;
            }
            .email-header {
                text-align: center;
                color: #4f46e5;
                font-size: 26px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .email-content {
                font-size: 16px;
                color: #334155;
                line-height: 1.6;
            }
            .otp-box {
                margin: 20px auto;
                padding: 15px 20px;
                background-color: #fef9c3;
                color: #1e293b;
                font-size: 28px;
                font-weight: bold;
                text-align: center;
                border-radius: 8px;
                letter-spacing: 6px;
                width: fit-content;
                box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            }
            .email-footer {
                margin-top: 30px;
                font-size: 13px;
                color: #94a3b8;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="email-header">Password Reset Request</div>
            <div class="email-content">
                <p>Hello <strong>${name}</strong>,</p>
                <p>You have requested to reset your password. Use the OTP below to proceed:</p>
                <div class="otp-box">${otp}</div>
                <p>This OTP is valid for a limited time only. Do not share it with anyone.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>Regards,<br><strong>Blinkyt Team</strong></p>
            </div>
            <div class="email-footer">
                &copy; ${new Date().getFullYear()} Blinkyt. All rights reserved.
            </div>
        </div>
    </body>
    </html>
  `;
};

export default forgotPassOtp;
