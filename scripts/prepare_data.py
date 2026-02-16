import pandas as pd
import json

file = "./scripts/kommunerangering+2024+-+datasett.xlsx"
# out_path = "./scripts/kommune_data.json"
out_path = "./frontend/public/data/kommune_data.json"


# Workaround column names containg year, TODO: possibly define changed excel norm
def fixKey(key: str, year: str):
    if year == "2000": return key
    return key.replace("2000", year)

# Load data model
dm = json.load(open("./scripts/kommune_data_model.json", 'r', encoding='utf-8'))

kommune_data = {}

for year in dm["years"]:
    yr = year["name"]

    df = pd.read_excel(file, sheet_name=year["sheet_name"])

    kommune_data_year = {}

    for index, row in df.iterrows():
        iKomNr = str(row["iKomNr"]).zfill(4) # Ensure 4-digit kommune number #TODO: settle on format, keep consistent with frontend
        row_data = {
            "Navn": row["KomNavn"],
            "sumMetric": {
                "name": dm["name"],
                "value": row[fixKey(dm["col_name"], yr)],
            },
            "elements": [],
        }
        for element in dm["elements"]: #TODO: maybe rename element to indeks
            element_data = {
                "name": element["name"],
                "value": row[fixKey(element["col_name"], yr)], #TODO: add element weighting, as well as metric weightings
            }
            if element.get("invert"):
                element_data["invert"] = True
            element_data["metrics"] = []

            for metric in element["metrics"]: #TODO: maybe rename metric to indikator
                metric_data = {
                    "name": metric["name"],
                    "value": row[fixKey(metric["col_name"], yr)],
                }
                if metric.get("invert"):
                    metric_data["invert"] = True
                
                element_data["metrics"].append(metric_data)
            
            row_data["elements"].append(element_data)
        
        kommune_data_year[iKomNr] = row_data

    kommune_data[yr] = kommune_data_year

print(df)
print(df.columns)
print(df.iloc[0])

# print(kommune_data)

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(kommune_data, f, ensure_ascii=False, indent=2)
