import re
import json
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

OPENROUTER_API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"


def clean_json_response(response_text):
    """ تنظيف الرد بحيث يبقى JSON صالح للقراءة """
    cleaned_text = re.sub(r"```json\n|\n```", "", response_text).strip()
    return cleaned_text



def analyze_interview_answers(interview_data):
    if not isinstance(interview_data, list):
        return {"error": "Data must be a list of objects"}
    
    prompt = """
    أنت خبير تقني ومُقيّم للمقابلات. لديك قائمة بأسئلة تقنية وإجابات المرشح. المطلوب منك هو:
    
    1. تقييم كل إجابة بعلامة من 0 إلى 10 بناءً على دقتها واكتمالها.
    2. تحديد الحالة "Correct" أو "Incorrect".
    3. إذا كانت العلامة أقل من 6، اقترح موارد تعليمية متنوعة لتحسين الإجابة.
    
    الأسئلة والإجابات:
    """
    
    for item in interview_data:
        prompt += f"- السؤال: {item['question']}\n  الإجابة: {item['answer']}\n"
    
    prompt += """
    رجّع النتيجة فقط في صيغة JSON كما يلي:
    {
        "scores": [
            {"number": 1, "status": "Correct", "resource": ""},
            {"number": 2, "status": "Incorrect", "resource": "Deep Learning Book by Ian Goodfellow - Chapter 7"}
        ],
        "report": "تقييم شامل للأداء.",
        "total_score": "إجمالي التقييم من 100"
    }
    """
    
    headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"}
    payload = {"model": "google/gemini-flash-8b-1.5-exp", "messages": [{"role": "user", "content": prompt}], "max_tokens": 2000}
    
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        if 'choices' in result:
            cleaned_content = clean_json_response(result['choices'][0]['message']['content'])
            return json.loads(cleaned_content)
        return {"error": "Unexpected API response"}
    except (requests.RequestException, json.JSONDecodeError) as e:
        return {"error": str(e)}


@app.route('/analyze-answers', methods=['POST'])
def api_analyze_answers():
    data = request.json
    if not isinstance(data, list):
        return jsonify({"error": "Invalid input format, expected a list of questions and answers."}), 400
    return jsonify(analyze_interview_answers(data))
    
    
    
    
    
    
def generate_interview_questions(domain, experience_years=0, skills="", projects=""):
    prompt = f"""
    تصرف كمقابل في مقابلة تقنية في مجال {domain}.
    المتقدم لديه {experience_years} سنوات من الخبرة، ومهارات في {skills}، وعمل على مشاريع مثل {projects}.
    قدم 10 أسئلة تقنية فقط باللغة العربية متدرجة من السهل إلى الصعب بصيغة JSON:
    """
    
    prompt += """
    {
        "questions": [
            {"number": 1, "question": "السؤال", "difficulty": "سهل"},
            {"number": 10, "question": "السؤال", "difficulty": "صعب"}
        ]
    }
    """
    
    headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"}
    payload = {"model": "google/gemini-flash-8b-1.5-exp", "messages": [{"role": "user", "content": prompt}], "max_tokens": 1500}
    
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        if 'choices' in result:
            cleaned_content = clean_json_response(result['choices'][0]['message']['content'])
            return json.loads(cleaned_content)
        return {"error": "Unexpected API response"}
    except (requests.RequestException, json.JSONDecodeError) as e:
        return {"error": str(e)}


@app.route('/generate-questions', methods=['POST'])
def api_generate_questions():
    data = request.json
    required_fields = ["domain", "experience_years", "skills", "projects"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    return jsonify(generate_interview_questions(data["domain"], data["experience_years"], data["skills"], data["projects"]))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
