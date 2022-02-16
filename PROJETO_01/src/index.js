const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];
//Middleware
function verify_acc_cpf_exists(req, res, next) {
	const { cpf } = req.headers;
	const customer = customers.find((customer) => customer.cpf === cpf);
	if (!customer) {
		return res.status(400).json({ error: 'Customer not Found!' });
	}
	req.customer = customer;
	return next();
}
function getBalance(statement) {
	const balance = statement.reduce((acc, operation) => {
		if (operation.type === 'credit') {
			return acc + operation.amount;
		} else {
			return acc - operation.amount;
		}
	}, 0);
	return balance;
}
// app.use(verify_acc_cpf_exists); //todos abaixo usam o middleware
app.get('/balance', verify_acc_cpf_exists, (req, res) => {
	const { customer } = req;
	const balance = getBalance(customer.statement);
	return res.json(balance);
});
app.delete('/delete', verify_acc_cpf_exists, (req, res) => {
	const { customer } = req;
	
	//splice -remove dados da array
	
	customers.splice(customers.indexOf(customer), 1);
	return res.status(200).json(customers);
});
app.put('/account', verify_acc_cpf_exists, (req, res) => {
	const { name } = req.body;
	const { customer } = req;
	customer.name = name;
	return res.status(201).json({
		ok: `Nome alterado com sucesso! 😀 Novo nome:  ${name}`,
	});
});
app.post('/withdraw', verify_acc_cpf_exists, (req, res) => {
	const { amount } = req.body;
	const { customer } = req;
	const balance = getBalance(customer.statement);
	if (balance < amount) {
		return res.status(400).json({
			erro: 'Insufficient funds!',
		});
	}

	const statement_operation = {
		amount,
		create_at: new Date(),
		type: 'debit',
	};
	customer.statement.push(statement_operation);
	return res.status(201).json({ ok: 'Transação efetuada!' });
});
app.post('/deposit', verify_acc_cpf_exists, (req, res) => {
	const { description, amount } = req.body;
	const { customer } = req;

	const statement_operation = {
		description,
		amount,
		create_at: new Date(),
		type: 'credit',
	};
	customer.statement.push(statement_operation);
	return res.status(201).send();
});
app.get('/customer', verify_acc_cpf_exists, (req, res) => {
	const { customer } = req;
	return res.json(customer);
});
app.get('/statement/date', verify_acc_cpf_exists, (req, res) => {
	const { customer } = req;
	const { date } = req.query;
	const date_format = new Date(date + ' 00:00');

	const statement = customer.statement.filter(
		(statement) =>
			statement.create_at.toDateString() ===
			new Date(date_format).toDateString(),
	);

	return res.json(statement);
});
app.get('/statement', verify_acc_cpf_exists, (req, res) => {
	const { customer } = req;
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
