# Method8 Client

This is the client for the Method8 application.

## Running with Docker

To run the client with Docker, you will need to have Docker and Docker Compose installed.

1.  **Create a `.env` file**:
    Create a `.env` file in the root of the project and add the following environment variable:

    ```
    VITE_API_BASE_URL=http://localhost:3000
    ```

    Replace `http://localhost:3000` with the actual URL of your backend API.

2.  **Build and run the container**:
    Run the following command to build and run the Docker container in detached mode:

    ```
    docker-compose up -d --build
    ```

3.  **Access the application**:
    You can now access the application in your browser at `http://localhost:8080`.

## Local Development

To run the client locally, you will need to have Node.js and npm installed.

1.  **Install dependencies**:
    ```
    npm install
    ```

2.  **Create a `.env` file**:
    Create a `.env` file in the root of the project and add the following environment variable:

    ```
    VITE_API_BASE_URL=http://localhost:3000
    ```

3.  **Run the development server**:
    ```
    npm run dev
    ```

4.  **Access the application**:
    You can now access the application in your browser at `http://localhost:5173`.
