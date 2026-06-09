from ebooklib import epub
from PIL import Image
import os

EPUB_FOLDER = "ebooks"
COVER_FOLDER = "frontend/public/covers"

os.makedirs(
    COVER_FOLDER,
    exist_ok=True
)

for file in os.listdir(
    EPUB_FOLDER
):

    if file.endswith(".epub"):

        book = epub.read_epub(
            os.path.join(
                EPUB_FOLDER,
                file
            )
        )

        for item in book.get_items():

            if item.get_type() == 9:

                cover_name = (
                    file
                    .replace(".epub", "")
                    .lower()
                    .replace(" ", "_")
                    + ".jpg"
                )

                cover_path = os.path.join(
                    COVER_FOLDER,
                    cover_name
                )

                with open(
                    cover_path,
                    "wb"
                ) as f:

                    f.write(
                        item.get_content()
                    )

                print(
                    "Saved:",
                    cover_name
                )

                print(
    "Saved:",
    os.path.abspath(cover_path)
)

                break