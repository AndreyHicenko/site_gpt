// Определение переменных
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const messages = document.querySelector('.messages');

// Функция для добавления сообщений в список сообщений
function addMessage(text, sender) {
  const message = document.createElement('div');
  message.classList.add('message');

  const messageText = document.createElement('p');
  messageText.textContent = text;
  message.appendChild(messageText);

  const messageSender = document.createElement('p');
  messageSender.textContent = sender;
  message.appendChild(messageSender);

  messages.appendChild(message);
}

// Обработчик отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Отправка запроса на сервер
  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: input.value
    })
  })
  .then(response => response.json())
  .then(data => {
    // Добавление ответа на запрос в список сообщений
    addMessage(data.text, 'ChatGPT');
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // Очистка поля ввода
  input.value = '';
});

// Отображение приветственного сообщения при загрузке страницы
addMessage('Привет! Я ChatGPT модель GPT-3.5-Turbo. Отправь мне сообщение, и я отвечу на него.', 'ChatGPT');
