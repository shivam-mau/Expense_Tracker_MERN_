export const BASE_URL = "https://localhost:8000";

// Utils/apiPath.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        LOGOUT: "/api/v1/auth/logout",
        GET_USER_INFO: "/api/v1/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard/data",
    },
    INCOME: {
        GET_ALL_INCOME: "/api/v1/income",
        ADD_INCOME: "/api/v1/income/add",
        DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/download",
    },

    EXPENSES: {
        GET_ALL_EXPENSES: "/api/v1/expenses",
        ADD_EXPENSE: "/api/v1/expenses/add",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expenses/delete/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/download",
        UPDATE_EXPENSE: (expenseId) => `/api/v1/expenses/update/${expenseId}`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/image/upload",
    }

    };
