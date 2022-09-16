import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = 3000;

// Set up the express app
const app = express();

app.use(cors()); //Allows request from an external url different from that of the server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Master');
	return;
});

app.listen(port, () => {
	console.log(`Game app listening on port ${port}`)
})
  
export default app;