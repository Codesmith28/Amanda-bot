import pandas as pd 

# Load the data
data = pd.read_csv('Website Making Challenge 5.0.csv')
newCsv = {
	"username": [],
	"role": [],
	"xp":[],
	"level":[],
}

problemMap = {
	"Chat With Los Santos Legends (EASY)": "easy",
	"Luxury Los Santos (MEDIUM I)":"medium-1",
	"Epsilon Program Recruitment Website (MEDIUM II)": "medium-2",
	"WANTED: Los Santos Police Department (LSPD) Website (HARD)": "hard",
	
}
print(data.columns)
for index, row in data.iterrows():
	
	username = row["Your Discord Username"]
	role = problemMap[row['Which Problem Statement would you like to work on?']]
	username2 = row['Discord Username']
	newCsv["username"].append(username)
	newCsv["role"].append(role)
	newCsv["xp"].append(0)
	newCsv["level"].append(0)
	if not pd.isnull(username2):
		print(username2)
		newCsv["username"].append(username2)
		newCsv["role"].append(role)
		newCsv["xp"].append(0)
		newCsv["level"].append(0)
		


newData = pd.DataFrame(newCsv)
newData.to_csv("newData.csv", index=False)
