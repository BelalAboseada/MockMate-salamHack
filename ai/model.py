import re  # استيراد مكتبة الـ Regex
from flask import Flask, request, jsonify
import requests
import json  

app = Flask(__name__)

OPENROUTER_API_KEY = "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"

def clean_json_response(response_text):
    """ تنظيف الرد بحيث يبقى JSON صالح للقراءة """
    cleaned_text = re.sub(r"```json\n|\n```", "", response_text).strip()
    return cleaned_text

def generate_interview_questions(domain, experience_years=0, skills="", projects=""):
    prompt = f"""
    تصرف كمقابل في مقابلة تقنية في مجال {domain}.
    الطالب لديه {experience_years} سنوات من الخبرة، ومهارات في {skills}، وعمل على مشاريع مثل {projects}.
    قدم 10 أسئلة تقنية مكتوبة (written) فقط باللغة الإنجليزية في شكل JSON، متدرجة من السهل إلى الصعب، وتشمل:
    - المعرفة الأساسية (سهل).
    - المهارات العملية (متوسط).
    - تحليل المشكلات وتقديم الحلول (متوسط إلى صعب).
    - الابتكار والإبداع (صعب).

    الصيغة المطلوبة:
    {{
        "questions": [
            {{"number": 1, "question": "السؤال", "difficulty": "سهل"}},
            {{"number": 2, "question": "السؤال", "difficulty": "سهل"}},
            ...
            {{"number": 10, "question": "السؤال", "difficulty": "صعب"}}
        ]
    }}
    لا تضف أي نصوص خارج الـ JSON.
    """

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "google/gemini-flash-8b-1.5-exp",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 1500
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        # ✅ طباعة الرد للتحقق منه
        print("Response JSON:", result)
        
        if 'choices' in result and len(result['choices']) > 0:
            content = result['choices'][0]['message']['content']
            
            # ✅ تنظيف النص قبل تحويله إلى JSON
            cleaned_content = clean_json_response(content)
            
            try:
                questions_json = json.loads(cleaned_content)  # تحويل النص إلى JSON
                return jsonify(questions_json)
            except json.JSONDecodeError:
                return jsonify({"error": "Failed to parse cleaned response JSON"}), 500
        else:
            return jsonify({"error": "Unexpected response format"}), 400
    except requests.RequestException as e:
        print("Error:", str(e))
        return jsonify({"error": f"Request failed: {str(e)}"}), 500

@app.route('/generate-questions', methods=['POST'])
def api_generate_questions():
    data = request.json

    required_fields = ["domain", "experience_years", "skills", "projects"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    return generate_interview_questions(data["domain"], data["experience_years"], data["skills"], data["projects"])

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
