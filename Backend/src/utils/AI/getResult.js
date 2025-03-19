import { GoogleGenerativeAI } from "@google/generative-ai";

export const evaluateInterviewAnswers = async (interview_data, next) => {
    const prompt = `
    أنت خبير تقني ومُقيّم للمقابلات. لديك قائمة بأسئلة تقنية وإجابات المرشح. المطلوب منك هو:
    
    1. تقييم كل إجابة بعلامة من 0 إلى 10 بناءً على دقتها واكتمالها.
    2. تحديد الحالة "Correct" أو "Incorrect".
    3. إذا كانت العلامة أقل من 6، اقترح موارد تعليمية متنوعة لتحسين الإجابة.
    
    الأسئلة والإجابات:
    ${interview_data.map(item => `- السؤال: ${item.question}\n  الإجابة: ${item.answer}\n`).join("")}
    
    رجّع النتيجة فقط في صيغة JSON كما يلي:
    {
        "scores": [
            {"number": 1, "status": "Correct", "resource": ""},
            {"number": 2, "status": "Incorrect", "resource": "Deep Learning Book by Ian Goodfellow - Chapter 7"}
        ],
        "report": "تقييم شامل للأداء.",
        "total_score": "إجمالي التقييم من 100"
    }
    `;
console.log(1);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent(prompt);
        const evaluation = result.response.candidates[0].content.parts[0].text;

        return JSON.parse(evaluation.slice(7, -4)); // تحويل النص إلى JSON

    } catch (error) {
        return next(new Error("Error calling Gemini API:", error.response?.data || error.message));
    }
};
