from database import SessionLocal
from database_models import Books

db = SessionLocal()

count = db.query(Books).count()

print(
    f"Books in database: {count}"
)

db.close()