export default function handler(req, res) {
  const { message } = req.body;

  const palavrasChave = [
    "paguei", "já paguei", "paguei o plano", "ativei", "já ativei", "pagamento feito", "plano ativado"
  ];

  const msg = message.toLowerCase();
  const ativado = palavrasChave.some(palavra => msg.includes(palavra));

  return res.status(200).json({ pagamento: ativado });
}
