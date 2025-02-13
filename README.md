# Mini Galamsey Data Analysis Tool

This project is a Django REST API designed to manage and analyze data related to illegal mining (Galamsey) sites in various towns and regions. It provides functionalities to:
- Upload and manage Galamsey site data via CSV files.
- Perform CRUD operations on the data.
- Analyze the data to calculate:
  - The total number of Galamsey sites across all regions.
  - The average number of Galamsey sites per region.
  - The region with the highest number of Galamsey sites.

---

## Why This Project Was Created

Illegal mining (Galamsey) is a significant environmental and social issue in many regions. This project was created to:
1. Provide a centralized platform for storing and managing Galamsey site data.
2. Enable easy analysis of the data to identify trends and hotspots.
3. Support decision-making for environmental and regulatory bodies.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete Galamsey site data.
- **CSV Upload**: Upload Galamsey site data via CSV files.
- **Data Analysis**:
  - Total number of Galamsey sites across all regions.
  - Average number of Galamsey sites per region.
  - Region with the highest number of Galamsey sites.

---

## Technologies Used

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To run the development server, use the below command:

# How to Run the Next.js Application
## Prerequisites
1. **Node.js**
Ensure that Node.js is installed on your system. You can download the latest LTS version from [Node.js official website](https://nodejs.org/).
To verify installation, run the following command in your terminal:
``` bash
   node -v
```
Also, verify `npm` (Node Package Manager) using:
``` bash
   npm -v
```
1. **Package Manager**
The project can use `npm` (default) or `yarn`. If you don't have `yarn` installed but prefer to use it, install it globally:
``` bash
   npm install -g yarn
```
1. **Code Editor**
It’s recommended to use a reliable code editor such as [Visual Studio Code](https://code.visualstudio.com/).

## Steps to Set Up the Project
1. **Clone the Repository**
Clone the project from the version control system (e.g., Git):
``` bash
   git clone <repository-url>
   cd <your-project-folder>
```
1. **Install Dependencies**
Install all the project dependencies specified in `package.json` using npm or yarn:
``` bash
   npm install
```
Or, if you're using yarn:
``` bash
   yarn install
```
1. **Environment Variables**
Create a `.env.local` file in the root directory of the project and add the necessary environment variables. Refer to `.env.example` (if available) for guidance on what variables need to be defined.
Example:
``` plaintext
   NEXT_PUBLIC_API_URL=http://your-api-url.com
```
1. **Run the Development Server**
Start the Next.js application in development mode:
``` bash
   npm run dev
```
Or, using yarn:
``` bash
   yarn dev
```
The application will be accessible at:
``` plaintext
   http://localhost:3000
```
## Additional Notes for Setup
1. **Database Connection**
If your application connects to a database, ensure that the database is set up and running. Verify the connection details in your environment file or configuration files.
2. **Linting and Formatting**
Lint your code and ensure it is properly formatted before running it in production. Commands:
``` bash
   npm run lint
   npm run prettier --write .
```
1. **Build for Production**
To create an optimized build for production, run:
``` bash
   npm run build
```
1. **Start the Production Server**
After building the app, start the production server:
``` bash
   npm start
```
## Troubleshooting
- **Port Already in Use**
If port `3000` is already in use, specify a different port:
``` bash
   PORT=4000 npm run dev
```
- **Dependency Issues**
Ensure all dependencies are installed correctly, and if issues persist, try cleaning your dependency files:
``` bash
   rm -rf node_modules package-lock.json
   npm install
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
