# Personal Finance Visualizer

A simple web application for tracking personal finances using Next.js, React, shadcn/ui–inspired styling (with Tailwind CSS), Recharts, and MongoDB.

## Features (Stage 2)
- **Basic Transaction Tracking:** Add, edit, and delete transactions (amount, date, description).
- **Categories:** Predefined categories for transactions.
- **Transaction List View:** See and manage all transactions.
- **Charts:**
  - **Monthly Expenses Bar Chart:** Visualizes expenses over time.
  - **Category-wise Pie Chart:** Shows expense breakdown by category.
- **Dashboard:** Summary cards displaying:
  - Total expenses
  - Category breakdown
  - Most recent transactions

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS (with shadcn/ui–inspired components)
- **Charts:** Recharts
- **Backend:** Next.js API Routes with MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- A MongoDB instance (local or remote)

### Environment Variables
Create a `.env.local` file in the project root and add your MongoDB connection string:
