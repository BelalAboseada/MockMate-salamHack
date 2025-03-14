import requests

OPENROUTER_API_KEY = "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"

def generate_interview_questions(domain, experience, skills, projects):
    prompt = f"""
    تصرف كمقابل في مقابلة تقنية في مجال {domain}.
    الطالب لديه {experience_years} سنوات من الخبرة، ومهارات في {skills}، وعمل على مشاريع مثل {projects}.
    قدم 10 أسئلة تقنية مكتوبة (written) فقط باللغة الانجليزية في شكل JSON، متدرجة من السهل إلى الصعب، وتشمل:
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
        
        if 'choices' in result:
            questions_text = result['choices'][0]['message']['content']
            return questions_text
        else:
            return f"Error: {result}"
    except requests.RequestException as e:
        return f"Request failed: {str(e)}"
    
    
#%%   
    
# استخدام الدالة
domain = input("please enter domain: ")
experience_years = input("please enter experience_year: ")
skills = input("please enter skills: ")
projects = input("please enter projects: ")



#%%

questions = generate_interview_questions(domain, experience_years, skills, projects)
print(questions)