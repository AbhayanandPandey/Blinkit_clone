const verifyEmailTemplate = ({ name, url }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Verify Your Email</title>
        <style>
            body {
                background: linear-gradient(135deg, #f0f4ff, #e1f5fe);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 10px;
                padding: 40px 30px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
            }
            h1 {
                color: #2e7d32;
                font-size: 28px;
                margin-bottom: 20px;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                margin: 15px 0;
            }
            .btn {
                display: inline-block;
                margin-top: 25px;
                padding: 12px 25px;
                background-color: #2e7d32;
                color: #ffffff !important;
                text-decoration: none;
                font-size: 16px;
                border-radius: 6px;
                font-weight: bold;
            }
            .footer {
                margin-top: 40px;
                font-size: 14px;
                color: #666;
                text-align: center;
            }
            .support {
                color: #00695c;
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello ${name},</h1>
            <p>Welcome to <strong>Blinkyt</strong>! You're one step away from accessing all the amazing features we offer.</p>
            <p>Please confirm your email address by clicking the button below:</p>
            <a href="${url}" class="btn">Verify My Email</a>
            <p>Once verified, you’ll be able to:</p>
            <ul>
                <li>Access personalized dashboards</li>
                <li>Track your orders and preferences</li>
                <li>Receive updates and offers</li>
            </ul>
            <p>If you didn’t create an account, no action is required. This link will expire in 24 hours.</p>
            <p>Need help? Reach out to our <a href="" class="support">support team</a>.</p>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Blinkyt. All rights reserved.
            </div>
        </div>
    </body>
    </html>
  `;
};

export default verifyEmailTemplate;
