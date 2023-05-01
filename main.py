from flask import Flask, request, jsonify, render_template
import openai
import os

# Инициализация приложения Flask
app = Flask(__name__)

# Инициализация API OpenAI
openai.api_key = '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'
model_engine = "gpt-3.5-turbo" # можно изменить на другой движок

# Маршрут для обслуживания главной страницы
@app.route('/')
def home():
    return render_template('index.html')

# Маршрут для обслуживания запросов на чат
@app.route('/chat', methods=['POST'])
def chat():
    # Получение текста сообщения из запроса
    message = request.json['text']

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
    ]
    item = {"role": "user", "content": message}
    messages.append(item)
    response = openai.ChatCompletion.create(
        model=model_engine,
        messages=messages)


    # Возврат ответа в формате JSON
    response_text = response['choices'][0]['message']['content']
    return jsonify({'text': response_text})

# Запуск приложения Flask
if __name__ == '__main__':
    app.run(debug=True)
