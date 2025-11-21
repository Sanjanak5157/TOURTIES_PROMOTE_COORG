TouristSpot project (frontend + backend).

Frontend:
  - cd frontend
  - npm install
  - npm start
  - If you use a different API URL, set REACT_APP_API_BASE in .env

Backend (Flask):
  - cd backend
  - python -m venv venv
  - venv\Scripts\activate
  - pip install -r requirements.txt
  - Ensure MySQL is running and run db_schema.sql in MySQL Workbench
  - Set environment variables DB_HOST, DB_USER, DB_PASSWORD, DB_NAME if needed
  - python app.py

Notes:
  - For quick testing without MySQL, you can mock API endpoints or insert sample JSON into frontend.
