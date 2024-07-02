import pandas as pd

def compare_csv_files(old_file, new_file):
    # Read the CSV files
    df_old = pd.read_csv(old_file)
    df_new = pd.read_csv(new_file)

    # Ensure both dataframes have the same columns
    common_columns = list(set(df_old.columns) & set(df_new.columns))
    df_old = df_old[common_columns]
    df_new = df_new[common_columns]

    # Identify new entries
    merged_df = pd.merge(df_new, df_old, how='left', indicator=True)
    new_entries = merged_df[merged_df['_merge'] == 'left_only'].drop('_merge', axis=1)

    return new_entries

# Example usage
old_file = 'old_responses.csv'
new_file = 'new_responses.csv'

new_entries = compare_csv_files(old_file, new_file)

print("New entries:")
print(new_entries)

# Optionally, save new entries to a CSV file
new_entries.to_csv('new_entries.csv', index=False)