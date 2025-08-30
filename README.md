# 📖 Bookstore API Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD68?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

This repository contains an automated API testing framework for the Bookstore API, built with **Playwright** and **JavaScript**. It provides a structured, maintainable, and environment-configurable approach to testing **Signup, Login, and Book CRUD APIs**.

---

## ✨ Features

-   ✅ **Multi-Environment Support** (QA, STAGE, UAT, PROD via `.env`)
-   ✅ **Reusable Test Classes** following an API-centric Page Object Model
-   ✅ **Unique Test Data Generation** for reliable signups, preventing data conflicts
-   ✅ **Positive & Negative Test Coverage** for every major endpoint
-   ✅ **Efficient Authentication Flow** with a one-time setup for token sharing
-   ✅ **Detailed HTML Reporting** for clear, step-by-step test analysis

---

## 🛠️ Tech Stack

-   **Test Runner**: [Playwright Test](https://playwright.dev/docs/intro)
-   **Language**: JavaScript (ES Modules)
-   **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)
-   **Runtime**: [Node.js](https://nodejs.org/)

---

## ⚙️ Getting Started

Follow these steps to get the project running on your local machine.

### 📌 Prerequisites

-   [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
-   npm (comes bundled with Node.js)

### 🔧 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install Dependencies**
    This command installs all the necessary packages defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Install Playwright Browsers**
    This downloads the browser binaries required by Playwright.
    ```bash
    npx playwright install
    ```

4.  **Set Up Environment Variables**
    Create a `.env` file from the provided template. This file will store your environment configurations and credentials.
    ```bash
    cp .env.example .env
    ```
    Now, **open and edit the `.env` file** to match your target environments.

    ```ini
    # .env - Configuration File

    # Set the default environment to run tests against
    ENV=QA

    # Base URLs for different environments
    BASE_URL_QA=[http://127.0.0.1:8000](http://127.0.0.1:8000)
    BASE_URL_STAGE=[http://stage-api.example.com](http://stage-api.example.com)
    BASE_URL_UAT=[http://uat-api.example.com](http://uat-api.example.com)
    BASE_URL_PROD=[http://api.example.com](http://api.example.com)

    # Environment-specific user emails (used as a base for unique signups)
    EMAIL_QA=qa_user@gmail.com
    EMAIL_STAGE=stage_user@gmail.com
    EMAIL_UAT=uat_user@gmail.com
    EMAIL_PROD=prod_user@gmail.com

    # Common password for all test users
    PASSWORD=YourSecretPassword123
    ```

---

## 🧪 Running the Tests

Execute tests from the command line against the target API.

### **Prerequisites: Start the Local API Server**

Before running the automated tests, you must have the Bookstore API application running.

#### **Option A: Running with Python/Pip (Recommended)**

1.  **Extract the API Project**: Unzip the provided FastAPI project folder.
2.  **Navigate to the Directory**:
    ```bash
    cd path/to/bookstore
    ```
3.  **Install Packages**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Start the Server**:
    ```bash
    uvicorn main:app --reload
    ```
    The API will now be available at `http://127.0.0.1:8000`. Keep this terminal running.

#### **Option B: Running with Docker**

1.  **Navigate to the Directory**:
    ```bash
    cd path/to/bookstore
    ```
2.  **Build and Run the Container**:
    ```bash
    docker compose up --build -d bookstore
    ```
    The API will now be available at `http://127.0.0.1:8000`.

---

### **Execute the Test Suite**

Once the API server is running, open a **new terminal** in this test framework's root directory and run the following commands.

#### **Run All Tests on a Specific Environment**

```bash
# Run tests on the QA environment (default)
ENV=QA npx playwright test

# Run tests on the UAT environment
ENV=QA npx playwright test
ENV=UAT npx playwright test
```

#### **Run a Specific Test File**

```bash
ENV=QA npx playwright test tests/main.spec.js
```

#### **Run in Debug Mode**

This opens the Playwright Inspector, allowing you to step through your tests.
```bash
ENV=QA npx playwright test --debug
```

## 📊 Test Reports

After a test run, generate and view the detailed HTML report.

```bash
npx playwright show-report
```
The report provides a step-by-step log of each test, including API requests, responses, and assertion results.

### **Advanced Reporting with Allure**

For a more powerful, interactive, and detailed report, use Allure.

#### **Why Use Allure?**

-   **Rich Visualizations**: Interactive dashboards with graphs and widgets provide a high-level overview of test results, trends, and execution times.
-   **Detailed Test Steps**: Every `test.step` from your code is displayed hierarchically, with its own status and duration.
-   **Attachments**: Automatically attaches API requests and response bodies to the relevant test step, making debugging failures incredibly fast.
-   **Historical Data**: Allure can track test execution history, showing trends and helping identify flaky tests over time.
-   **Smart Categorization**: Group tests by features, stories, or severity, providing valuable insights for project managers and stakeholders.



#### **Allure Setup and Usage**

1.  **Install Allure Playwright Adapter**
    This package connects Playwright to Allure.
    ```bash
    npm install --save-dev allure-playwright
    ```

2.  **Configure `playwright.config.js`**
    Add `allure-playwright` to the list of reporters in your `playwright.config.js` file.

    ```javascript
    // playwright.config.js
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
      // ... other configurations
      reporter: [
        ['list'], // Prints results to the console
        ['html'], // The default HTML reporter
        ['allure-playwright'], // Add this line for Allure
      ],
      // ... other configurations
    });
    ```

3.  **Install Allure Commandline Tool**
    This is a separate tool (which requires Java) used to generate the HTML report from the test results.

    -   **macOS (with Homebrew):**
        ```bash
        brew install allure
        ```
    -   **Windows (with Scoop):**
        ```bash
        scoop install allure
        ```
    -   For other systems, follow the [official Allure installation guide](https://allurereport.org/docs/gettingstarted-installation/).

4.  **Generate and View the Allure Report**
    After running your tests with `npx playwright test`, follow these two steps:

    ```bash
    # Step 1: Generate the report from the results (stored in allure-results)
    allure generate allure-results --clean

    # Step 2: Open the generated report in your browser
    allure open
    ```

---

## 📂 Project Structure

The framework is organized to separate concerns, making it clean and scalable.

```
project-root/
│
├── tests/
│   ├── main.spec.js                 # Main test orchestrator file
│   ├── signup_api/signupTests.spec.js
│   ├── login_api/loginTests.spec.js
│   └── book_api/
│       ├── createBookTests.spec.js
│       ├── getAllBooksTests.spec.js
│       ├── updateBookTests.spec.js
│       └── deleteBookTests.spec.js
│
├── utils/
│   └── apiContextFixture.spec.js      # Creates shared API context & handles credentials
│
├── .env                             # Local environment configurations (ignored by git)
├── .env.example                     # Template for .env file
├── package.json
└── playwright.config.js
```

---

## 💡 Testing Strategy & Framework Design

### **Approach to Test Flows**

The strategy uses an **Orchestrator Pattern** for clarity and control.

1.  **API Action Classes**: Each API resource (e.g., `books`, `signup`) has a dedicated class (e.g., `CreateBookTests`). These classes contain all logic for interacting with that resource, including methods for positive and negative scenarios. This is the Page Object Model adapted for APIs.

2.  **Orchestrator Spec File (`main.spec.js`)**: This central file imports the action classes and arranges them into logical test flows using `test.describe`. Inside each test, `test.step` is used to label actions, creating a highly readable test report that mirrors user stories (e.g., "Step 1: Create a book", "Step 2: Update the created book").

### **Ensuring Reliability & Maintainability**

| Strategy | Implementation | Benefit |
| :--- | :--- | :--- |
| **Configuration Isolation** | All environment-specific URLs and credentials are in `.env`. The `apiContextFixture.spec.js` dynamically selects the correct configuration based on the `ENV` variable. | **Easy Maintenance**: No hardcoded data. Adding a new environment requires only updating the `.env` file. |
| **Code Reusability** | API logic is encapsulated in action classes. | **Scalability**: If an endpoint changes (e.g., `/books/` to `/api/v2/books/`), the update is made in only one place. |
| **Test Data Management** | The `getEnvCredentials({ makeUnique: true })` utility generates unique user emails for signup tests by appending a random string. | **High Reliability**: Prevents test failures from "user already exists" errors, making tests idempotent. |
| **Atomic Test Groups** | Dependent operations (Create → Update → Delete) are grouped within a single `test()` block in `main.spec.js`. | **Guaranteed Order**: Eliminates flakiness from unpredictable parallel execution, ensuring state (like `bookId`) is passed correctly. |
| **Precise Assertions** | Every API call is validated for the correct status code and a response body that matches the expected schema or data using `expect().toMatchObject()`. | **Fast Debugging**: Failures are immediately obvious, with clear messages explaining the mismatch. |

### **Challenges Faced & Solutions**

1.  **Challenge**: Tests for user creation failed on re-runs due to duplicate email errors.
    -   **Solution**: The `getEnvCredentials` utility was created with a `makeUnique: true` option to dynamically append a random string to the base email from `.env`, ensuring a new user for every test run.

2.  **Challenge**: Managing tests across multiple environments (QA, UAT) without code changes.
    -   **Solution**: The `.env` file and `ENV` command-line variable were implemented. This allows the framework to dynamically configure the API base URL and credentials at runtime.

3.  **Challenge**: Ensuring the Delete test runs only after a successful Create test.
    -   **Solution**: The entire CRUD (Create, Read, Update, Delete) flow was structured within a single `test()` block using `test.step` for each operation. This enforces a strict sequential execution order.

---

## 🚀 Adding New Tests

The framework is designed for easy extension.

1.  Create a new test class in the appropriate folder (e.g., `tests/profile_api/profileTests.spec.js`).
2.  Define methods for positive and negative scenarios inside the class.
3.  Import the new class in `main.spec.js`.
4.  Initialize an instance of the class in the `beforeAll` hook.
5.  Create a new `test()` block or add steps to an existing one to call your new methods.

*Example:*
```javascript
// In main.spec.js
import { ProfileTests } from "./profile_api/profileTests.spec.js";

// ... inside beforeAll
const profile = new ProfileTests(api, token);

// ... inside a new test block
test('Profile API | Get user profile', async () => {
    await test.step('Positive - Fetch user profile', async () => {
        await profile.positiveProfileFetch();
    });
});
```