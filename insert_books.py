import pandas as pd
from database import SessionLocal
from database_models import Books

#Creating DB Session
db=SessionLocal()

#Reading CSV
df=pd.read_csv('books_with_price.csv',low_memory=False)

df['Year-Of-Publication']=pd.to_numeric(
    df['Year-Of-Publication'],errors='coerce'
)

# Keep only realistic years
df = df[
    (df['Year-Of-Publication'].isna()) |
    (
        (df['Year-Of-Publication'] >= 1800) &
        (df['Year-Of-Publication'] <= 2026)
    )
]

# Convert float years to proper Python int
df['Year-Of-Publication'] = df['Year-Of-Publication'].apply(
    lambda x: int(x) if pd.notnull(x) else None
)

# Replace NaN with None
df = df.where(pd.notnull(df), None)

# Remove rows with missing important fields
df = df.dropna(subset=['ISBN', 'Book-Title', 'Book-Author'])
count=0

for _, row in df.iterrows():

    if (
    row['ISBN'] is None or
    row['Book-Title'] is None or
    row['Book-Author'] is None
    ):
        continue

    try:
        book=Books(
            isbn=str(row['ISBN']),
            book_title=row['Book-Title'],
            book_author=row['Book-Author'],
            year_of_publication=row['Year-Of-Publication'],
            publisher=row['Publisher'],
            price=row['price'],
            img_url_s=row['Image-URL-S'],
            img_url_m=row['Image-URL-M'],
            img_url_l=row['Image-URL-L']
        )
        db.add(book)
        db.commit()
        count+=1

    except Exception as e:
        db.rollback()
        print(f"Error inserting row: {e}")


print(f"{count} books inserted successfully!")

db.close()