import re
from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

OPENROUTER_API_KEY = "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"

def clean_json_response(response_text):
    """تنظيف الرد بحيث يبقى JSON صالح للقراءة"""
    cleaned_text = re.sub(r"```json\n|\n```", "", response_text).strip()
    return cleaned_text

# Endpoint لتوليد الأسئلة
@app.route('/generate-questions', methods=['POST'])
def generate_interview_questions():
    data = request.json

    required_fields = ["domain", "experience_years", "skills", "projects"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"حقل {field} ناقص، كده مش هينفع!"}), 400

    domain = data["domain"]
    experience_years = data["experience_years"]
    skills = data["skills"]
    projects = data["projects"]

    prompt = f"""
    تصرف كمقابل في مقابلة تقنية في مجال {domain}.
    الطالب لديه {experience_years} سنوات من الخبرة، ومهارات في {skills}، وعمل على مشاريع مثل {projects}.
    قدم 10 أسئلة تقنية مكتوبة (written) فقط باللغة العربية والمصطلحات بالانجليزي في شكل JSON، متدرجة من السهل إلى الصعب، وتشمل:
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
        
        if 'choices' in result and len(result['choices']) > 0:
            content = result['choices'][0]['message']['content']
            cleaned_content = clean_json_response(content)
            
            try:
                questions_json = json.loads(cleaned_content)
                return jsonify(questions_json)
            except json.JSONDecodeError:
                return jsonify({"error": "مش عارف أحول الرد لـ JSON صحيح"}), 500
        else:
            return jsonify({"error": "الرد جالي فاضي أو مش متوقع"}), 400
    except requests.RequestException as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": f"فيه مشكلة في الطلب: {str(e)}"}), 500

# Endpoint لتقييم الإجابات
@app.route('/analyze-answers', methods=['POST'])
def analyze_interview_answers():
    interview_data = request.json

    if not isinstance(interview_data, list):
        return jsonify({"error": "البيانات لازم تبقى لستة من الأسئلة والإجابات"}), 400

    prompt = """
    أنت خبير تقني بتقيّم إجابات مقابلة. عندك قائمة أسئلة تقنية وإجابات المرشح. المطلوب منك الآتي:

    1. قيّم كل إجابة بعلامة من 0 لـ 10 بناءً على دقتها واكتمالها:
       - لو الإجابة غلط أو مالهاش علاقة، اديها 0.
       - لو ناقصة أو ضعيفة، اديها من 1 لـ 5.
       - لو صحيحة وكاملة، اديها من 6 لـ 10.

    2. لكل إجابة، حدد الحالة إذا كانت "Correct" أو "Incorrect".

    3. لو العلامة أقل من 6، اقترح مصادر تعليمية متنوعة (كتب، لينكات يوتيوب، مواقع تعليمية) عشان يحسن الإجابة.

    الأسئلة والإجابات هي:
    """

    for item in interview_data:
        prompt += f"- السؤال: {item['question']}\n  الإجابة: {item['answer']}\n"

    prompt += """
    رجّع النتيجة في صيغة JSON كده:
    {
        "scores": [
            {
                "number": 1,
                "score": "الدرجة من 10",
                "status": "Correct أو Incorrect",
                "resource": "مصادر تعليمية لو العلامة أقل من 6، وإلا خليها فاضية"
            },
            ...
        ],
        "report": "تعليق عام ودود بالعربي بأسلوب مهذب وطبيعي عن أداء المرشح، وشجعه بطريقة لطيفة",
        "total_score": "مجموع الدرجات من 100",
        "percentage": "النسبة المئوية للمجموع من 100"
    }
    ما تضيفش أي نصوص خارج الـ JSON.
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
        
        if 'choices' in result and len(result['choices']) > 0:
            content = result['choices'][0]['message']['content']
            cleaned_content = clean_json_response(content)
            
            try:
                analysis_json = json.loads(cleaned_content)
                return jsonify(analysis_json)
            except json.JSONDecodeError:
                return jsonify({"error": "مش عارف أحول التقرير لـ JSON"}), 500
        else:
            return jsonify({"error": "الرد جالي فاضي أو مش متوقع"}), 400
    except requests.RequestException as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": f"فيه مشكلة في الطلب: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)