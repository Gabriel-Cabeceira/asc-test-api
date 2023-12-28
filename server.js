import express from 'express';
import cors from 'cors';
import fs from 'fs';

const server = express();
const port = 3000;

server.use(express.json());

server.use(cors());


server.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`Requisição recebida do IP: ${ip}`);
  next();
});

server.use(express.json());


// Rota de teste POST
server.post('/', async (req, res) => {
  console.log(req.body);
  return res.status(200).json({ mensagem: 'Rota post' });
});


// Rota de teste GET
server.get('/', async (req, res) => {
  return res.status(200).json({mensagem: 'Rota GET. Testando esta rota'});
});


// Rota de teste GET consultando um CEP
server.get('/cep/:cep?', async (req, res) => {
  if (!req.params.cep) {
    return res
      .status(500)
      .json({ mensagem: 'Vc esqueceu de informar um CEP!' });
  }

  const { cep } = req.params;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const requisicao = await fetch(url, { method: 'GET' });

  if (requisicao.status !== 200) {
    return res
      .status(requisicao.status)
      .json({ messagem: 'CEP informado é inválido!' });
  }

  const dados = await requisicao.json();
  return res
    .status(200)
    .json({ mensagem: 'A requisição deu certo!', dados: dados.logradouro });
});



// Rota de teste que envia um arquivo base64
server.get('/base64', async (req, res) => {

  const filePath = './file1.pdf';
  const fileData = fs.readFileSync(filePath);
  const base64Data = fileData.toString('base64');


  return res.status(200).json({ file: base64Data});

});


// Rota teste que envia uma lista de objetos
server.get('/objectsArray', async (req, res) => {
  const SE1 = [
    {
      "E1_OPCAO": "01",
      "E1_NUMBOR": "002807",
      "E1_PREFIXO": "1",
      "E1_NUM": "000033347",
      "E1_PARCELA": "043",
      "E1_VALOR": 26911.67,
      "E1_VENCTO": "20231121",
      "E1_TIPO": "NF"
    },
    {
      "E1_OPCAO": "02",
      "E1_NUMBOR": "002807",
      "E1_PREFIXO": "1",
      "E1_NUM": "000033347",
      "E1_PARCELA": "044",
      "E1_VALOR": 26911.67,
      "E1_VENCTO": "20231121",
      "E1_TIPO": "NF"
    },
    {
      "E1_OPCAO": "03",
      "E1_NUMBOR": "002807",
      "E1_PREFIXO": "1",
      "E1_NUM": "000033347",
      "E1_PARCELA": "045",
      "E1_VALOR": 26911.67,
      "E1_VENCTO": "20231121",
      "E1_TIPO": "NF"
    },
    {
      "E1_OPCAO": "04",
      "E1_NUMBOR": "002807",
      "E1_PREFIXO": "1",
      "E1_NUM": "000033347",
      "E1_PARCELA": "046",
      "E1_VALOR": 26911.67,
      "E1_VENCTO": "20231121",
      "E1_TIPO": "NF"
    },
  ]

  return res.status(200).json({ data: array });

});

server.listen(port, () =>
  console.log(`A API está escutando requisições na porta ${port}`)
);
