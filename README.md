# Klimarisk Dashboard

This repository contains the source code for a web-based dashboard for exploring **municipality-level climate risk in Norway**. The application was originally developed as part of a [master's thesis in Geomatics at NTNU](https://www.ntnu.edu/studies/courses/TBA4925/2025), using [climate risk data from the Noradapt climate service](https://klimamonitor.no/analysar/kommunerangering-2024).

The dashboard is designed to make composite climate risk data easier to inspect, compare, and understand. It combines coordinated views including maps, distribution charts, rankings, tables, and indicator-level information, allowing users to move between the overall climate risk score and its underlying determinants and indicators.

For the specific repository version described in the master's thesis, see the [`thesis-submission` Git tag](https://github.com/tiltobias/klimarisk/tree/thesis-submission).

## Online application

The dashboard is hosted by GitHub Pages and is available online at:

[tiltobias.github.io/klimarisk](https://tiltobias.github.io/klimarisk/)

The online deployment reflects the current version of the application.

### Embedded mode

Add `?embed` to use the version intended for embedding in [Klimamonitor.no](https://klimamonitor.no/klimarisiko/), including its corresponding color scheme:

```text
https://tiltobias.github.io/klimarisk/?embed
```

## Data

The processed data used by the dashboard is maintained in a separate repository:

[github.com/tiltobias/klimarisk-data](https://github.com/tiltobias/klimarisk-data)

The two repositories have separate responsibilities:

* `klimarisk` contains the dashboard application and source code.
* `klimarisk-data` contains the processed JSON and GeoJSON files used by the deployed dashboard.

Keeping the application and data separate allows the climate risk dataset to be updated without requiring changes to the dashboard frontend.

## Repository structure

```text
klimarisk/
├── frontend/   # React, TypeScript, and Vite dashboard application
└── scripts/    # Python preprocessing script and source data
```

## Running locally

Running the project locally is useful for development, testing, or inspecting a specific checked-out version of the dashboard.

You need to have [Node.js](https://nodejs.org/) installed. Node.js also installs `npm`, which is used to install the frontend dependencies and start the development server.

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

### Using local data

When working with an older commit or a specific tagged version, the frontend should normally use the local data files belonging to that version. This ensures that the application is run against the data structure it was developed for.

The data source is configured in:

```text
frontend/src/hooks/getPublicUrl.ts
```

In `getDataUrl`, enable the local data path:

```ts
export const getDataUrl = (fileName: string) => {
  return getPublicUrl(`data/${fileName}`); // Local development: data files in public/data/
  // return `https://tiltobias.github.io/klimarisk-data/${fileName}`; // Production data
}
```

If the production URL is active, swap the commented lines so that the local `getPublicUrl` path is used instead.

This can be particularly important when checking out older commits, since the current files in `klimarisk-data` may use a newer data structure than the application version being inspected.

## Running the Python preprocessing script

The preprocessing script only needs to be run when the source climate risk workbook or data model has changed and the processed dashboard data should be regenerated.

You need to have Python installed.

From the repository root, create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Or on macOS and Linux:

```bash
source .venv/bin/activate
```

Install the required packages:

```bash
pip install -r scripts/requirements.txt
```

Then run the preprocessing script:

```bash
python scripts/prepare_data.py
```

The script prepares the processed data files used by the dashboard frontend.
