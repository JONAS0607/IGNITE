const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];
app.get('/customer', (req, res) => {
	return res.send(customers);
});
app.get('/statement/:cpf', (req, res) => {
	const { cpf } = req.params;
	const customer = customers.find((customer) => customer.cpf === cpf);
	return res.json(customer.statement);
});
app.post('/account', (req, res) => {
	const { cpf, name } = req.body;

	const customer_already_exists = customers.some(
		(customer) => customer.cpf === cpf,
	);
	if (customer_already_exists) {
		return res.status(400).json({ error: 'Cliente já existe!' });
	} else {
		customers.push({
			cpf,
			name,
			id: uuidv4(),
			statement: [],
		});

		return res.status(201).json({ ok: 'Cliente Cadastrado com sucesso!' });
	}
});

app.listen(3333);
