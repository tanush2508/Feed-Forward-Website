const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const cors = require('cors');
app.use(cors())

app.use(express.json())

// Endpoint to insert data into aushad table
app.post('/api/payment', async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'medical',
      database: 'my_database3'
    });

    console.log(req.body);
    const { name, preference, city, amount_to_donate , dateA } = req.body;

    // Insert the data into the aushad table
    await connection.execute(`
      INSERT INTO PaymentTable (name, preference, city, amount_to_donate , dateA)
      VALUES (?, ?, ?, ?, ?)
    `, [ name, preference, city, amount_to_donate , dateA]);
   
    console.log([name, preference, city, amount_to_donate , dateA]);

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error inserting data' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

app.post('/api/volunteer', async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'medical',
      database: 'my_database3'
    });

    console.log(req.body);
    const { name, location, mobilenumber} = req.body;

    // Insert the data into the aushad table
    await connection.execute(`
      INSERT INTO volunteering (name, location, mobilenumber)
      VALUES (?, ?, ?)
    `, [ name, location, mobilenumber]);
   
    console.log([name, location, mobilenumber]);

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error inserting data' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
