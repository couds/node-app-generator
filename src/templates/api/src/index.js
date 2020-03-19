import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import endpoints from 'endpoints';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', endpoints);

app.listen(process.env.PORT || 3000);
