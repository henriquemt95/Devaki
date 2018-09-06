import express from 'express'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import EmployRouter from './routers/EmployeesRouter'


const app = express()
// Express configuration

app.set('port', process.env.PORT || 3004);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.disable('x-powered-by')

app.use(EmployRouter)
export default app
