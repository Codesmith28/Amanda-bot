import pandas as pd 

excel_data_df = pd.read_excel('Website Making Challenge 5.0.xlsx', sheet_name='Form Responses 1')

# print whole sheet data
missing_usernames = [
    "Arptel",
    "marshall_004",
    "sushi_2806",
    "dax_shah555",
    "renimodiya_21402",
    "yash0113",
    "aarchi0497",
    "satoru_gojo_08",
    "dhruvirajput_29",
    "@KRISHPATEL#2610",
    ".knight_14",
    "malavmodi0115"
]

def mobileToWALink(mobile):
	return "wa.me/+91"+str(mobile)
# iterate over the rows of the Excel file
for index, row in excel_data_df.iterrows():
	if row['Your Discord Username'] in missing_usernames:
		print(
			row["Your Discord Username"],"|",
			row["Name"], mobileToWALink(row["Mobile Number"])), "|",
	elif row["Discord Username"] in missing_usernames:
		# access name.1
		print(
			row["Discord Username"], "|",
			row["Name.1"],"|",
			mobileToWALink(row["Mobile Number.1"]))


# print(excel_data_df)