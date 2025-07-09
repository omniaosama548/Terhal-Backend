import { getReply } from '../services/assestantService.js';

export const chatWithAssistant = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Login first" }); // استخدم 401 بدلاً من 300
    }

    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const rawReply = await getReply(message);

    // تنظيف وإزالة أي تغليف أو رموز JSON
    let cleaned = rawReply.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    }

    // تحويل النص إلى JSON فعلي
    const jsonReply = JSON.parse(cleaned);

    res.json(jsonReply); // إرجاع الرد كـ JSON فعلي
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
