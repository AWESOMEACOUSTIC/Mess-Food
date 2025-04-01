require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

const app = express();
const port = process.env.PORT || 3001;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// MySQL Connection Pool using promise interface
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Middleware to parse JSON requests
app.use(express.json());

// Simple route to check if server is running
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Route to test database connection
app.get('/test-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database.');
        const [results] = await connection.query('SELECT VERSION()');
        console.log('MySQL version:', results[0]['VERSION()']);
        connection.release();
        res.status(200).json({
            message: 'Successfully connected to the database!',
            dbVersion: results[0]['VERSION()']
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ message: 'Failed to connect to the database.' });
    }
});

// POST /api/register: Register a new user
app.post("/api/register", async (req, res) => {
    const { reg_no, fullname, email, password, block, room_number, mess_name, mess_type } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO users (reg_no, fullname, email, password, block, room_number, mess_name, mess_type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [reg_no, fullname, email, password, block, room_number, mess_name, mess_type]
        );
        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    } catch (error) {
        console.error("Registration error:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: "Registration failed", details: "A user with this registration number already exists." });
        } else {
            res.status(500).json({ error: "Registration failed", details: error.message });
        }
    }
});



// POST /api/suggestions: Submit a mess suggestion
app.post("/api/suggestions", async (req, res) => {
    const { user_id, food_item_suggestion, meal_type, feasibility } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO mess_suggestions (user_id, food_item_suggestion, meal_type, feasibility)
             VALUES (?, ?, ?, ?)`,
            [user_id, food_item_suggestion, meal_type, feasibility]
        );
        res.status(201).json({ message: "Suggestion submitted successfully", suggestionId: result.insertId });
    } catch (error) {
        console.error("Suggestion submission error:", error);
        res.status(500).json({ error: "Suggestion submission failed" });
    }
});

// GET /api/reports: Generate report in Excel, CSV or PDF format
app.get("/api/reports", async (req, res) => {
    const { reportType, format } = req.query;
    try {
        let query = `
            SELECT u.id AS user_id, u.fullname, ms.suggestion_date AS date, ms.meal_type, ms.food_item_suggestion AS feedback
            FROM mess_suggestions ms
            JOIN users u ON ms.user_id = u.id
        `;
        const [rows] = await pool.query(query);

        if (format === "excel") {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Report");

            worksheet.columns = [
                { header: "User ID", key: "user_id", width: 10 },
                { header: "Name", key: "fullname", width: 30 },
                { header: "Date", key: "date", width: 20 },
                { header: "Meal Type", key: "meal_type", width: 15 },
                { header: "Feedback", key: "feedback", width: 40 },
            ];

            rows.forEach(row => worksheet.addRow(row));

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
            await workbook.xlsx.write(res);
            res.end();
        } else if (format === "csv") {
            // Create CSV content
            let csvContent = "User ID,Name,Date,Meal Type,Feedback\n";
            
            rows.forEach(row => {
                // Escape any commas in the content with quotes
                const escapedFeedback = row.feedback.includes(',') ? `"${row.feedback}"` : row.feedback;
                const escapedName = row.fullname.includes(',') ? `"${row.fullname}"` : row.fullname;
                
                csvContent += `${row.user_id},${escapedName},${row.date},${row.meal_type},${escapedFeedback}\n`;
            });
            
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=report.csv");
            res.send(csvContent);
        } else if (format === "pdf") {
            const doc = new PDFDocument();
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

            doc.pipe(res);
            doc.fontSize(18).text("Mess Suggestions Report", { align: "center" });
            doc.moveDown();

            rows.forEach(row => {
                doc.fontSize(12)
                    .text(`User ID: ${row.user_id} | Name: ${row.fullname} | Date: ${row.date} | Meal Type: ${row.meal_type} | Feedback: ${row.feedback}`);
                doc.moveDown(0.5);
            });

            doc.end();
        } else {
            res.status(400).json({ error: "Invalid format specified" });
        }
    } catch (error) {
        console.error("Report generation error:", error);
        res.status(500).json({ error: "Report generation failed" });
    }
});

// GET /api/dashboard: Return aggregated dashboard data
app.get("/api/dashboard", async (req, res) => {
    try {
        const query = `
        SELECT DATE_FORMAT(ms.suggestion_date, '%b') AS month,
               SUM(CASE WHEN u.mess_type = 'Veg' THEN 1 ELSE 0 END) AS veg,
               SUM(CASE WHEN u.mess_type = 'Non-Veg' THEN 1 ELSE 0 END) AS nonVeg,
               SUM(CASE WHEN u.mess_type = 'Special' THEN 1 ELSE 0 END) AS special
        FROM mess_suggestions ms
        JOIN users u ON ms.user_id = u.id
        GROUP BY MONTH(ms.suggestion_date)
        ORDER BY MONTH(ms.suggestion_date)
      `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Dashboard data error:", error);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

// GET /api/feedback: Return all feedback suggestions
app.get("/api/feedback", async (req, res) => {
    try {
        const query = `
        SELECT u.reg_no AS id, u.fullname AS studentName, ms.suggestion_date AS date, ms.meal_type AS mealType, ms.food_item_suggestion AS feedback
        FROM mess_suggestions ms
        JOIN users u ON ms.user_id = u.id
      `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Feedback fetch error:", error);
        res.status(500).json({ error: "Failed to fetch feedback data" });
    }
});

// POST /api/login: Log in an existing user by matching email and password
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password]
      );
      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const user = rows[0];
      
      console.log(`User logged in: ${user.fullname} (${user.email})`);
      
      // Send response with user details
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          reg_no: user.reg_no,
          fullname: user.fullname,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed", details: err.message });
    }
});
  

// GET /api/seed: Insert dummy data for testing
app.get("/api/seed", async (req, res) => {
    try {
        // Dummy user data
        const dummyUsers = [
            {
                reg_no: "22BCT0043",
                fullname: "Aditya Panigrahy",
                email: "aditya@example.com",
                password: "hashedpassword",
                block: "A",
                room_number: "101",
                mess_name: "Darling",
                mess_type: "Veg"
            },
            {
                reg_no: "22BCI0185",
                fullname: "K Gourav",
                email: "gourav@example.com",
                password: "hashedpassword",
                block: "B",
                room_number: "102",
                mess_name: "PR",
                mess_type: "Non-Veg"
            },
            {
                reg_no: "22BCI0158",
                fullname: "Agam Srivastava",
                email: "agam@example.com",
                password: "hashedpassword",
                block: "C",
                room_number: "103",
                mess_name: "Reddy",
                mess_type: "Special"
            }
        ];

        // Insert dummy users
        const userInsertPromises = dummyUsers.map(async (user) => {
            const [result] = await pool.query(
                `INSERT INTO users (reg_no, fullname, email, password, block, room_number, mess_name, mess_type)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [user.reg_no, user.fullname, user.email, user.password, user.block, user.room_number, user.mess_name, user.mess_type]
            );
            return result.insertId;
        });
        const userIds = await Promise.all(userInsertPromises);

        // Dummy suggestion data using inserted user IDs
        const dummySuggestions = [
            {
                user_id: userIds[0],
                food_item_suggestion: "Suggest Veg meal with extra spices",
                meal_type: "Breakfast",
                feasibility: 1
            },
            {
                user_id: userIds[1],
                food_item_suggestion: "Non-Veg meal suggestion: Chicken Curry",
                meal_type: "Lunch",
                feasibility: 1
            },
            {
                user_id: userIds[2],
                food_item_suggestion: "Special meal suggestion: Thali with desserts",
                meal_type: "Dinner",
                feasibility: 0
            }
        ];

        // Insert dummy suggestions
        const suggestionInsertPromises = dummySuggestions.map(async (suggestion) => {
            const [result] = await pool.query(
                `INSERT INTO mess_suggestions (user_id, food_item_suggestion, meal_type, feasibility)
                 VALUES (?, ?, ?, ?)`,
                [suggestion.user_id, suggestion.food_item_suggestion, suggestion.meal_type, suggestion.feasibility]
            );
            return result.insertId;
        });
        const suggestionIds = await Promise.all(suggestionInsertPromises);

        res.status(201).json({
            message: "Dummy data inserted successfully",
            usersInserted: userIds,
            suggestionsInserted: suggestionIds
        });
    } catch (error) {
        console.error("Error inserting dummy data:", error);
        res.status(500).json({ error: "Failed to insert dummy data" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    pool.query('SELECT 1')
        .then(() => console.log('Database connection successful on startup.'))
        .catch(err => console.error('Database connection failed on startup:', err));
});
