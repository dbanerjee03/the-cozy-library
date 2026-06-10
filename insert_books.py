import pandas as pd
from database import SessionLocal
from database_models import Books
import traceback

# Creating DB Session
db = SessionLocal()

# Reading CSV
df = pd.read_csv(
    "data/books_with_price.csv",
    low_memory=False
)

df['Year-Of-Publication'] = pd.to_numeric(
    df['Year-Of-Publication'],
    errors='coerce'
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
df['Year-Of-Publication'] = df[
    'Year-Of-Publication'
].apply(
    lambda x:
    int(x)
    if pd.notnull(x)
    else None
)

# Replace NaN with None
df = df.where(
    pd.notnull(df),
    None
)

# Remove rows with missing important fields
df = df.dropna(
    subset=[
        'ISBN',
        'Book-Title',
        'Book-Author'
    ]
)

count = 0

batch = []

BATCH_SIZE = 5000

print(
    "Loading existing ISBNs..."
)

existing_isbns = set(

    row[0]

    for row in db.query(
        Books.isbn
    ).all()

)

print(
    f"Loaded {len(existing_isbns)} existing ISBNs"
)

last_isbn = None
last_title = None

for _, row in df.iterrows():

    if (
        row['ISBN'] is None or
        row['Book-Title'] is None or
        row['Book-Author'] is None
    ):
        continue

    isbn = str(
        row['ISBN']
    )

    if isbn in existing_isbns:
        continue

    try:

        last_isbn = isbn

        last_title = row[
            'Book-Title'
        ]

        if pd.isna(
            row['Year-Of-Publication']
        ):
            continue
        if(
            row['Book-Author'] is not None and
            str(row['Book-Author']).isdigit()
        ):
            continue
        if (
            row['Publisher'] is not None and
            "http" in str(
                 row['Publisher']
            )
        ):
            continue

        book = Books(

            isbn=isbn,

            book_title=row[
                'Book-Title'
            ],

            book_author=row[
                'Book-Author'
            ],

            year_of_publication=row[
                'Year-Of-Publication'
            ],

            publisher=row[
                'Publisher'
            ],

            price=row[
                'price'
            ],

            img_url_s=row[
                'Image-URL-S'
            ],

            img_url_m=row[
                'Image-URL-M'
            ],

            img_url_l=row[
                'Image-URL-L'
            ]

        )

        batch.append(book)

        count += 1

        if len(batch) >= BATCH_SIZE:

            try:

                db.bulk_save_objects(
                    batch
                )

                db.commit()

                print(
                    f"{count} NEW books inserted..."
                )

                batch = []

            except Exception as e:

                print(
                    "\nBATCH FAILED\n"
                )

                print(
                    f"Count: {count}"
                )

                print(
                    f"Last ISBN: {last_isbn}"
                )

                print(
                    f"Last Title: {last_title}"
                )

                traceback.print_exc()

                db.rollback()

                break

    except Exception:

        print(
            "\nROW FAILED\n"
        )

        print(
            f"ISBN: {last_isbn}"
        )

        print(
            f"Title: {last_title}"
        )

        traceback.print_exc()

        continue

if batch:

    try:

        db.bulk_save_objects(
            batch
        )

        db.commit()

    except Exception:

        print(
            "\nBAD RECORD FOUND\n"
        )

        print(
            f"Last ISBN: {last_isbn}"
        )

        print(
            f"Last Title: {last_title}"
        )

        print(e)

        traceback.print_exc()

        db.rollback()

print(
    f"{count} NEW books inserted successfully!"
)

db.close()