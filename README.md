# The Potterverse 🪄

A magical Harry Potter Sorting Hat quiz application that allows users to discover their Hogwarts house through an interactive quiz experience. Built with React and Node.js, this full-stack application features user authentication, a dynamic quiz system, and personalized house results.

## ✨ Features

- **Interactive Sorting Quiz**: Answer thought-provoking questions to discover which Hogwarts house you belong to
- **User Authentication**: Secure login and registration system with password protection
- **House Information**: Learn about all four Hogwarts houses (Gryffindor, Slytherin, Hufflepuff, and Ravenclaw)
- **Character Profiles**: Discover notable characters from each house
- **House Traits**: Explore the unique characteristics and values of each house
- **Personalized Results**: Get detailed information about your sorted house, including founder details
- **Beautiful UI**: Stunning animations and visual effects using Framer Motion and React Sparkle
- **Responsive Design**: Fully responsive interface built with TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **TypeWriter Effect** - Text animation effects
- **React Sparkle** - Magical sparkle effects
- **@codaworks/react-glow** - Glow effects

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MySQL2** - Database driver
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
The-Potterverse/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (Home, Login, Register, Quiz, Results, UserPage)
│   │   ├── assets/        # Images and static assets
│   │   ├── App.jsx        # Main app component with routing
│   │   └── main.jsx       # Application entry point
│   ├── public/            # Public static files
│   ├── fonts/             # Custom fonts
│   └── package.json       # Frontend dependencies
├── routes/                # Express route handlers
│   ├── login.js          # Login authentication
│   ├── register.js       # User registration and quiz data
│   └── userpage.js       # User profile and house information
├── db.js                 # MySQL database connection
├── index.js              # Express server entry point
└── package.json          # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amnashah110/The-Potterverse.git
   cd The-Potterverse
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set up the database**
   - Create a MySQL database for the application
   - Set up the required tables:
     - `users` - Store user account information
     - `houses` - Hogwarts house information
     - `questions` - Quiz questions
     - `options` - Quiz answer options
     - `characters` - Notable characters for each house
     - `traits` - House characteristics

5. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=2000
   HOST=localhost
   DBPORT=3306
   DATABASE=your_database_name
   USER=your_mysql_username
   PASSWORD=your_mysql_password
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   The server will run on `http://localhost:2000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or another port shown in terminal)

3. **Access the application**
   
   Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

## 📡 API Endpoints

### Authentication

- **POST** `/login`
  - Body: `{ username, password }`
  - Returns user information and house details

- **POST** `/register`
  - Body: `{ firstName, lastName, username, password, houseID }`
  - Creates a new user account

### Quiz Data

- **GET** `/register`
  - Returns all quiz questions

- **GET** `/register/options?question_id={id}`
  - Returns options for a specific question

### User Profile

- **POST** `/userpage`
  - Body: `{ house_id }`
  - Returns characters and traits for the user's house

## 🏰 Houses

The application features all four Hogwarts houses:

- **Gryffindor** - Courage, bravery, and determination
- **Slytherin** - Ambition, cunning, and resourcefulness
- **Hufflepuff** - Loyalty, patience, and hard work
- **Ravenclaw** - Intelligence, wisdom, and creativity

## 📝 Database Schema

### Required Tables

1. **users**
   - `id`, `first_name`, `last_name`, `username`, `password`, `house_id`, `gender`

2. **houses**
   - `house_id`, `house`, `quote`, `founder`, `founder_description`

3. **questions**
   - `question_id`, `question`, `question_heading`

4. **options**
   - `option_id`, `question_id`, `options`, `house_id`

5. **characters**
   - `id`, `house_id`, `name`, `description`

6. **traits**
   - `id`, `house_id`, `trait`

## 🎨 UI Features

- Magical sparkle effects throughout the application
- Smooth page transitions with Framer Motion
- Typewriter effects for dynamic text
- Glow effects on interactive elements
- Custom Harry Potter themed fonts (Bluu Next, Sofia Sans)
- Responsive design for all screen sizes

## 🔒 Security Notes

The current implementation stores passwords in plain text. For production use, ensure proper password hashing is implemented using bcrypt (already included in dependencies).

## 📄 License

ISC

## 👤 Author

**Amna Shah**
- GitHub: [@amnashah110](https://github.com/amnashah110)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ✨ and magic by Amna Shah
