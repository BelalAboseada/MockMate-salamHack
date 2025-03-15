
import requests
import json

OPENROUTER_API_KEY = "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"

def analyze_interview_answers(interview_data):
    if not isinstance(interview_data, list):
        return {"error": "Data must be a list of objects"}
    
    prompt = """
    أنت خبير تقني ومُقيّم للمقابلات. لديك قائمة بأسئلة تقنية وإجابات المرشح. المطلوب منك هو:
    
    1. تقييم كل إجابة بعلامة من 0 إلى 10 بناءً على دقتها واكتمالها. 
       - إذا كانت الإجابة خاطئة أو غير ذات صلة، أعطها علامة 0.
       - إذا كانت الإجابة ناقصة أو ضعيفة، أعطها علامة بين 1 و 5.
       - إذا كانت الإجابة صحيحة ومكتملة، أعطها علامة بين 6 و 10.
    
    2. لكل إجابة، حدد الحالة إذا كانت "Correct" أو "Incorrect".
    
    3. إذا كانت العلامة أقل من 6، اقترح موارد تعليمية تتنوع بين اسماء كتب وروابط مواقع تعليمية وكورسات يوتيوب  لتحسين الإجابة. 
    
    الأسئلة والإجابات هي:
    """
    
    for item in interview_data:
        prompt += f"- السؤال: {item['question']}\n  الإجابة: {item['answer']}\n"
    
    prompt = """
    أنت خبير تقني ومُقيّم للمقابلات. لديك قائمة بأسئلة تقنية وإجابات المرشح. المطلوب منك هو:
    
    1. تقييم كل إجابة بعلامة من 0 إلى 10 بناءً على دقتها واكتمالها. 
       - إذا كانت الإجابة خاطئة أو غير ذات صلة، أعطها علامة 0.
       - إذا كانت الإجابة ناقصة أو ضعيفة، أعطها علامة بين 1 و 5.
       - إذا كانت الإجابة صحيحة ومكتملة، أعطها علامة بين 6 و 10.
    
    2. لكل إجابة، حدد الحالة إذا كانت "Correct" أو "Incorrect".
    
    3. إذا كانت العلامة أقل من 6، اقترح موارد تعليمية تتنوع بين اسماء كتب وروابط مواقع تعليمية وكورسات يوتيوب  لتحسين الإجابة. 
    
    الأسئلة والإجابات هي:
    """
    
    for item in interview_data:
        prompt += f"- السؤال: {item['question']}\n  الإجابة: {item['answer']}\n"
    
    prompt += """
    رجّع النتيجة فقط في صيغة JSON كما يلي:
    {
        "scores": [
            {
                "number": 1,
                "status": "Correct",
                "resource": ""
            },
            {
                "number": 2,
                "status": "Incorrect",
                "resource": "Deep Learning Book by Ian Goodfellow - Chapter 7"
            }
        ],
        "report": "Overall feedback about the candidate's performance."
        "total_score":percentage of score 
    }عاوزه يطلع فى الاخر total score يكون مساوي لمجموع الscores كلها بتاعه كل سؤال وعاوزه كمان تكلع من 100+عاوزاك تتكلم معاه بطريقه friendly  ببالعاميه العربيه  كانك انسان زيه وتشجعه وكمان عاوزه المصادر اللى هتطلعهاله يذاكر منها تتنوع  بين لينكات يوتيوب ومواقع وكتب  لا تضف أي نصوص خارج الـ JSON.    
    عاوزه كل الكلام ده بالعربى 
   """   
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "google/gemini-flash-8b-1.5-exp",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 2000
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        if 'choices' in result:
            analysis_text = result['choices'][0]['message']['content']
            
            # إزالة العلامات ```json ... ``` إذا كانت موجودة
            if analysis_text.startswith("```json"):
                analysis_text = analysis_text.replace("```json", "").strip()
            if analysis_text.endswith("```"):
                analysis_text = analysis_text.replace("```", "").strip()
            
            try:
                analysis_json = json.loads(analysis_text)
                return analysis_json
            except json.JSONDecodeError:
                return {"error": "Failed to parse analysis as JSON", "response_text": analysis_text}
        else:
            return {"error": f"API Error: {result}"}
    except requests.RequestException as e:
        return {"error": f"Request failed: {str(e)}"}
#%%
# مثال للاستخدام
interview_data = [
    {"number": 1, "question": "What is supervised learning?", "answer": "It's when the model learns from labeled data."},
    {"number": 2, "question": "Explain overfitting.", "answer": "I don't know."}
]

result = analyze_interview_answers(interview_data)
print(json.dumps(result, indent=2, ensure_ascii=False))
