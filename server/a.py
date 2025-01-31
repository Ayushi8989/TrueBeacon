import pandas as pd
import sqlite3 as sql3


# Load the CSV
data = pd.read_csv("historical_prices.csv", sep=",", index_col=0)

# Remove the timezone part from the 'date' column
data["date"] = data["date"].str.slice(0, 10)

# Save the modified CSV
data.to_csv('cleaned_historical_prices.csv', index=False)

# data = pd.read_csv("historical_prices.csv", sep=",", index_col=0)
# data["date"] = data["date"].str.slice(0, 10)
# print(data.head())

# conn = sql3.connect("historical_prices.db")  # This creates or connects to an SQLite database

# # Write data to SQL table
# data.to_sql("historical_prices", conn, if_exists="replace", index=False)

# conn.commit()
# df = pd.read_sql("SELECT * FROM historical_prices LIMIT 10;", conn)

# # Print the contents
# print(df)
# df_check = pd.read_sql("SELECT name FROM sqlite_master WHERE type='table';", conn)
# print(df_check)


# # Close the connection
# conn.close()