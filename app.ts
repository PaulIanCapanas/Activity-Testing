import express, { response } from 'express'
import { pool } from './db'

async function startServer () {
  const app = express()
  const connection = await pool.connect()

  app
    .post('/Pogs', async (request, response) => {
      try {
        const { name, ticket_symbol, price, color } = request.body
        const newPogs = await pool.query(
          'INSERT INTO Pogs (name, ticker_symbol, price, color) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, ticket_symbol, price, color]
        )
        response.json(newPogs.rows)
      } catch (err) {
        console.log('error', err)
        response.status(500).json({ error: '' })
      }
    })
    .get('/Pogs', async ( _, response) => {
        try {
            const result = await connection.query('SELECT * FROM Pogs')
            response.status(200).json(result.rows)
        }
        catch (err) {
            console.log('error', err)
            response.status(404).send('Not  Found')
        }
    })
    .get('/Pogs/:id', async (request, response) => {
        try {
            const id = request.params.id
            const result = await connection.query('SELECT * FROM Pogs WHERE id = $1', [id])
            response.status(200).json(result.rows)
        }
        catch(err) {
            console.log('error', err)
            response.status(404).send('Not found')
        }
    })
    .put('/Pogs/:id', async (request, response) => {
        try {
            const {name, ticker_symbol, price, color} = request.body
            const result = await connection.query('UPDATE Pogs SET name = $1, ticker_symbol = $2, price = $3, color = $4 WHERE id = $5 RETURNING *',
            [name, ticker_symbol, price, color, request.params.id])
            response.status(200).json(result.rows)
        }catch (err) {
            console.log('error', err)
            response.status(404).send('not found')
        }
    })
    .delete('/Pogs/:id', async ( request, response) => {
        try {
            const result = await connection.query('DELETE FROM pogs WHERE pogs_id = $1 RETURNING *', [request.params.id]);
    response.status(200).json(result.rows);
        } catch (err) {
            console.log('error', err) 
            response.status(404).send('Not found')
        }
    } )
    .use(express.static('frontend')) 
    .listen(3000, () => {
      console.log('carlo mbappe http://localhost:3000')
    })
}
startServer()
