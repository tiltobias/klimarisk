# Klimarisk dashboard

This repository contains the source code for a web-based dashboard developed as part of a [master thesis in Geomatics at NTNU](https://www.ntnu.edu/studies/courses/TBA4925/2025). The dashboard is used to explore municipal climate risk data for Norway, based on [climate risk data from the Noradapt climate service](https://klimamonitor.no/analysar/kommunerangering-2024).

The dashboard is designed to make municipal climate risk data easier to inspect, compare, and understand through linked views such as maps, tables, charts, rankings, and indicator-level controls.

For the specific repository version described in the master thesis, see the [thesis-submission Git tag](https://github.com/tiltobias/klimarisk/tree/thesis-submission).

## Online application

The dashboard is hosted by GitHub Pages and is available online at:

[tiltobias.github.io/klimarisk](https://tiltobias.github.io/klimarisk/)

This online deployment reflects the current deployed version of the application. To run the project locally, download or clone this repository and follow the guide in [Running locally](#running-locally).

## Related data repository

The processed dashboard data is stored in a separate repository:

[github.com/tiltobias/klimarisk-data](https://github.com/tiltobias/klimarisk-data)

The relation between the two repositories is:

- `klimarisk` contains the dashboard source code and the preprocessing script.
- `klimarisk-data` contains processed data files used by the deployed dashboard, such as JSON and GeoJSON files.

This separation makes it clear that data maintainers can update the dashboard data without needing to update the main dashboard frontend code.

## Repository structure

```text
klimarisk/
├── frontend/   # React, TypeScript, and Vite dashboard application
└── scripts/    # Python preprocessing script and source data
```

## Running locally

Running the project locally is useful for development, testing, or inspecting a specific checked-out version of the dashboard.

You need to have Node.js installed on your computer. Installing Node.js also installs `npm`, which is used to install and run the frontend application.

Open a terminal in the repository folder and run:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will usually start at:

```text
http://localhost:5173/
```

Open this address in a web browser to view the dashboard.

### Local data when running the dashboard locally

When running the dashboard locally, the frontend should normally use the local data files that belong to the checked-out version of the repository. This helps ensure that the application is run with the same data structure as the code version being inspected.

The data URL logic is defined in:

```text
frontend/src/hooks/getPublicUrl.ts
```

In the `getDataUrl` function, the local data URL should be active when running the dashboard locally:

```ts
export const getDataUrl = (fileName: string) => {
  return getPublicUrl(`data/${fileName}`); // For local development, place data files in public/data/
  // return `https://tiltobias.github.io/klimarisk-data/${fileName}`; // For production, fetch from GitHub Pages
}
```

For older commits, it may be necessary to check or change this function so that the frontend uses the corresponding local data files instead of newer files from the external data repository. If the production URL is active, simply swap the commented line so that the local `getPublicUrl` line is active and the external GitHub Pages URL is commented out.

## Running the Python preprocessing script

Running the preprocessing script is only necessary when the source climate risk workbook or data model has been changed and the processed dashboard data should be regenerated.

You need to have Python installed on your computer.

From the project root, create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment.

On Windows:

```bash
.venv\Scripts\activate
```

On macOS or Linux:

```bash
source .venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r scripts/requirements.txt
```

Run the preprocessing script:

```bash
python scripts/prepare_data.py
```

The script prepares the data files used by the dashboard frontend.

