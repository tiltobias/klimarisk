import pandas as pd
import json

file = "./scripts/kommunerangering+2024+-+datasett.xlsx"
sheet = "KomRang17_2000"
# out_path = "./scripts/kommune_data.json"
out_path = "./frontend/public/data/kommune_data.json"


# Load data model
dm = json.load(open("./scripts/kommune_data_model.json", 'r', encoding='utf-8'))

df = pd.read_excel(file, sheet_name=sheet)


kommune_data = {}

for index, row in df.iterrows():
    iKomNr = str(row["iKomNr"]).zfill(4) # Ensure 4-digit kommune number #TODO: settle on format, keep consistent with frontend
    row_data = {
        "Navn": row["KomNavn"],
        "sumMetric": {
            "name": dm["name"],
            "value": row[dm["col_name"]],
        },
        "elements": [],
    }
    for element in dm["elements"]: #TODO: maybe rename element to indeks
        element_data = {
            "name": element["name"],
            "value": row[element["col_name"]], #TODO: add element weighting, as well as metric weightings
            "metrics": [],
        }

        for metric in element["metrics"]: #TODO: maybe rename metric to indikator
            metric_data = {
                "name": metric["name"],
                "value": row[metric["col_name"]],
            }
            element_data["metrics"].append(metric_data)
        
        row_data["elements"].append(element_data)
    
    kommune_data[iKomNr] = row_data

print(df)
print(df.columns)
print(df.iloc[0])

# print(kommune_data)

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(kommune_data, f, ensure_ascii=False, indent=2)
