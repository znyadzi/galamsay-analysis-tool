# **Galamsey Analysis Tool**

A web-based tool for analyzing **illegal mining ("Galamsey") activities** across various regions in Ghana. Users can upload CSV files, and the system will clean, analyze, and present insights.

## **🚀 Features**

- **Upload CSV Files** containing data on Galamsey activities
- **Automated Data Cleaning** (fix headers, remove duplicates, handle missing values)
- **Statistical Analysis**, including:
  - Total number of Galamsey sites
  - Region with the highest sites
  - Cities exceeding a given threshold
  - Average sites per region
- **Data Persistence** (Stores past analyses in PostgreSQL)

## Django API
This project has a fully developed API with django in the repository:
https://github.com/znyadzi/ofwa-Interview-test

## Project Deployment
This Project has been deployed to Vercel and can be accessed via:
https://galamsay-analysis-tool.vercel.app/

## **⚙️ Tech Stack**

- **Frontend:** Next.js, Shadcn UI, Tailwind CSS, React Query, Axios
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (on Supabase)
- **ORM:** Prisma
- **Libraries Used:**
  - `papaparse` – CSV Parsing
  - `danfojs` – Data Analysis

## **📦 Installation**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/znyadzi/galamsey-analysis-tool.git
cd galamsey-analysis-tool
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

1. Create a [Supabase](https://supabase.com) account.
2. In your Supabase **dashboard**, create a new project (note your password).
3. Click on the **"Connect"** tab in the header.
4. Select the **"ORM"** tab.
5. Ensure the selected tool is **"Prisma"**.
6. Copy the text from the **".env.local"** tab.
7. In your text editor, create a **`.env`** file and paste the copied text.
8. Replace **`[YOUR-PASSWORD]`** in the connection string with your **actual password**.

Now your environment variables are set up! ✅

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

App will be available at **`http://localhost:3000`**

## **🛠️ API Endpoints**

### **1️⃣ Upload and Analyze CSV Data**

**POST `/api/analysis-results`**

- **Body:** FormData with file & threshold
- **Response**
  ```json
  {
    "id": "cm73yp9dt0000jo03fvgtt7ng",
    "filename": "raw_galamsay_data.csv",
    "totalGalamseySites": 686,
    "regionWithHighestGalamseySites": "Ashanti",
    "citiesExceedingThreshold": ["Kumasi", "Accra", "Adenta", "Tema"],
    "regionalSiteAverages": [
      { "region": "Western", "averageGalamseySiteCount": 13.6 },
      { "region": "Ashanti", "averageGalamseySiteCount": 16.1 },
      { "region": "Upper East", "averageGalamseySiteCount": 4.5 },
      { "region": "Greater Accra", "averageGalamseySiteCount": 25.4 },
      { "region": "Northern", "averageGalamseySiteCount": 6 },
      { "region": "Central", "averageGalamseySiteCount": 12.7 },
      { "region": "Bono", "averageGalamseySiteCount": 10.5 },
      { "region": "Upper West", "averageGalamseySiteCount": 6 },
      { "region": "Volta", "averageGalamseySiteCount": 10.8 },
      { "region": "Eastern", "averageGalamseySiteCount": 9.3 },
      { "region": "Bono East", "averageGalamseySiteCount": 13.5 },
      { "region": "Savannah", "averageGalamseySiteCount": 7 },
      { "region": "", "averageGalamseySiteCount": 15 },
      { "region": "Invalid Region", "averageGalamseySiteCount": 16 }
    ],
    "threshold": 24,
    "createdAt": "2025-02-13T23:19:30.498Z"
  }
  ```

### **2️⃣ Fetch Past Analyses**

**GET `/api/analysis-results`**

- **Response:** List of previous analysis results

## **📌 Notes**

- Ensure your **CSV file** has the correct headers: `City, Region, Number_of_Galamsey_Sites`
- The **threshold** parameter determines which cities are flagged as high-risk
