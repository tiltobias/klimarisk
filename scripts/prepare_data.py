import pandas as pd
import json

file = "./scripts/kommunerangering+2024+-+datasett.xlsx"
sheet = "KomRang17_2000"
# out_path = "./scripts/kommune_data.json"
out_path = "./frontend/public/data/kommune_data.json"


df = pd.read_excel(file, sheet_name=sheet)

kommune_data = {}

for index, row in df.iterrows():
    iKomNr = str(row['iKomNr']).zfill(4) # Ensure 4-digit kommune number #TODO: settle on format, keep consistent with frontend
    kommune_data[iKomNr] = {
        'Navn': row['KomNavn'],
        'Risk2000': row['Risk2000'],
    }

# print(df)
# print(df.columns)
# print(df.iloc[0])

# print(kommune_data)

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(kommune_data, f, ensure_ascii=False, indent=2)
