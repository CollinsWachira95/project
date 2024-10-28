# Recipe Management System
The Recipe Management System is a web application designed for users and chefs to interact through recipes. Users can like and comment on recipes, while chefs can manage their own recipes with full CRUD (Create, Read, Update, Delete) capabilities. The system also includes user authentication and form validation, ensuring a secure and user-friendly experience.

## Authors
- Job Kiptoo
- Collins Wachira
- Clara Thuo


## Features
- CRUD Operations: Users can create, read, update, and delete recipes.
- User Interaction: Users can like and comment on recipes.
- Chef Functionality: Chefs can add, edit, and delete their recipes.
- Form Validation: Ensures data integrity with proper form validation.
- User Authentication: Login, logout, and password validation for user accounts.
- Rate Limiting: Users can access recipes only three times before requiring re-login.
- Database Integration: Store recipes, user and chef information, comments, and likes.
## Technologies Used
- Frontend: HTML, CSS, JavaScript (with a framework/library like React, Angular, or Vue.js)
- Backend: Node.js, Express.js
- Database: MongoDB (or any SQL database)
- Authentication: JSON Web Tokens (JWT) or similar methods
- Version Control: Git and GitHub
## Installation
- Clone the repository:
git clone https://github.com/CollinsWachira95/project
- Navigate to the project directory:
cd project
- Install the dependencies:
npm install
- Set up the database and update the connection string in the configuration file.
- Start the application:
npm start
## Usage
- Register: Create a new account as a user or chef.
- Login: Access your account with your credentials.
- Explore Recipes: Browse through available recipes, like, and comment.
- Manage Recipes: If you are a chef, add new recipes, or edit/delete your existing ones.
- Rate Limiting: Note that you can only access recipes three times before needing to log in again.
## Database Structure
- Users Table: Stores user information (username, password, role).
- Chefs Table: Stores chef information (username, password).
- Recipes Table: Contains recipe details (title, ingredients, instructions, chef ID).
- Comments Table: Stores user comments related to recipes (recipe ID, user ID, comment text).
- Likes Table: Tracks likes on recipes (recipe ID, user ID).
## Contributing
We welcome contributions! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

