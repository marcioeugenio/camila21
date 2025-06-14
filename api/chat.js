const form = document.getElementById('chat-form');
const input = document.getElementById('mensagem');
const chatBox = document.getElementById('chat');

function appendMessage(sender, message, classe) {
  const div = document.createElement('div');
  div.classList.add('message', classe);
  div.innerHTML = `<strong class="${classe}">${sender}:</strong> ${converterMarkdown(message)}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function converterMarkdown(texto) {
  return texto.replace(/!\[.*?\]\((.*?)\)/g, '<br><img src="$1" style="max-width:100%;border-radius:12px;margin-top:8px;">');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('Você', userMessage, 'user');
  input.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    appendMessage('Camila', data.reply || 'Sem resposta.', 'camila');
  } catch (error) {
    appendMessage('Camila', 'Erro ao responder. Tente novamente mais tarde.', 'camila');
  }
});
