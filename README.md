# MessFood

A web application for managing college mess food services, providing students with an interface to provide feedback, make suggestions, and access mess-related information.

## Tech Stack

### Frontend
- React (built with Vite)
- React Router Dom for navigation
- Recharts for data visualization
- Tailwind CSS for styling

### Backend
- Node.js with Express.js
- MySQL database
- Dotenv for environment variables
- CORS for cross-origin resource sharing
- ExcelJS for Excel file generation
- PDFKit for PDF generation

## Features

- User authentication (login/register)
- Mess food suggestions system
- Admin dashboard for management
- Feedback collection and analysis
- Mess menu display
- Report generation (PDF and Excel)

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

### Clone the repository
```bash
git clone https://github.com/AWESOMEACOUSTIC/Mess-Food.git
cd MessFood
```

### Database Setup
1. Install MySQL if not already installed
2. Create a database named `backend`
3. Import the SQL schema from `Backend/sql.sql`

### Backend Setup
```bash
cd Backend
npm install
```

#### Install Backend Dependencies Individually
If you need to install backend dependencies one by one:
```bash
npm install express
npm install cors
npm install dotenv
npm install mysql2
npm install exceljs
npm install pdfkit
```

Create a `.env` file in the Backend directory with the following content:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=backend
PORT=3000
```

### Frontend Setup
```bash
cd ../Frontend
npm install
```

#### Install Frontend Dependencies Individually
If you need to install frontend dependencies one by one:
```bash
npm install react
npm install react-dom
npm install react-router-dom
npm install react-toastify
npm install recharts
npm install tailwindcss
npm install @vitejs/plugin-react
npm install eslint
npm install eslint-plugin-react-hooks
npm install eslint-plugin-react-refresh
```

Create a `.env` file in the Frontend directory with the following content:
```
VITE_API_URL=http://localhost:3000
```

## Running the Application

### Start the Backend Server
```bash
cd Backend
node server.js
```

### Start the Frontend Development Server
```bash
cd Frontend
npm run dev
```

The application will be available at http://localhost:5173 (or the port specified by Vite).

## Building for Production

### Frontend
```bash
cd Frontend
npm run build
```

This will generate optimized production files in the `dist` directory.

## License

ISC 