from dotenv import load_dotenv

import smtplib

from email.mime.text import MIMEText

import os

from email.mime.multipart import MIMEMultipart

from datetime import datetime

from reportlab.lib.pagesizes import letter

from reportlab.pdfgen import canvas

from io import BytesIO

from email.mime.base import MIMEBase

from email import encoders

from reportlab.platypus import Table, TableStyle

from reportlab.lib import colors

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL")

EMAIL_PASSWORD = os.getenv("APP_PASSWORD")

# SEND EMAIL

def send_order_email(

    to_email,

    books,

    total_price,

    order_ids

):

    msg = MIMEMultipart("alternative")

    msg["Subject"] = (
        "Order Confirmed! 📚"
    )

    msg["From"] = EMAIL_ADDRESS

    msg["To"] = to_email

    # BOOK LIST HTML

    books_html = ""

    for book in books:

        books_html += f"""

        <div style="
            display:flex;
            gap:25px;
            margin-bottom:20px;
            padding:15px;
            border:1px solid #eee;
            border-radius:10px;
            align-items:center;
        ">

            <img
                src="{book['image_url']}"
                style="
                    width:90px;
                    border-radius:8px;
                "
            >

            <div>

                <h4 style="
                    margin:0;
                    color:#333;
                ">
                    {book['title']}
                </h4>

                <p style="
                    margin:6px 0;
                    color:#666;
                ">
                    {book['author']}
                </p>

                <strong>
                    ₹{book['price']}
                </strong>

            </div>

        </div>

        """

    html_content = f"""

<html>

<body style="
    font-family:Arial;
    background:#f4f4f4;
    padding:20px;
">

<div style="
    max-width:700px;
    margin:auto;
    background:white;
    padding:30px;
    border-radius:12px;
">

<h2 style="color:#7e22ce;">
     The Cozy Library
</h2>

<hr>

<h3>
    Order Confirmed ✅
</h3>

<p style="color:#666;">
    Date:
    {datetime.now().strftime("%d %B %Y, %I:%M %p")}
</p>

<p>
    Thank you for your purchase.
</p>

<h3>
    Books Ordered
</h3>

{books_html}

<hr>

<h3>
    Total:
    ₹{total_price}
</h3>

<p style="color:#666;">
    Order IDs:
    {", ".join(map(str, order_ids))}
</p>

<p style="
    margin-top:30px;
    color:#777;
">

    Happy Reading 💜

</p>

</div>

</body>

</html>

"""

    msg.attach(
        MIMEText(html_content, "html")
    )

    # PDF ATTACHMENT

    pdf_buffer = generate_invoice(

        books,

        total_price,

        order_ids

    )

    part = MIMEBase(
        "application",
        "octet-stream"
    )

    part.set_payload(
        pdf_buffer.read()
    )

    encoders.encode_base64(part)

    part.add_header(

        "Content-Disposition",

        "attachment; filename=invoice.pdf"

    )

    msg.attach(part)

    # SEND EMAIL

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        EMAIL_ADDRESS,
        EMAIL_PASSWORD
    )

    server.sendmail(
        EMAIL_ADDRESS,
        to_email,
        msg.as_string()
    )

    server.quit()

# GENERATE PDF

def generate_invoice(

    books,

    total_price,

    order_ids

):

    buffer = BytesIO()

    p = canvas.Canvas(
        buffer,
        pagesize=letter
    )

    # LOGO

    logo_path = "assets/logo.png"

    p.drawImage(
        logo_path,
        70,
        730,
        width=120,
        height=60
    )

    # TITLE

    p.setFont(
        "Helvetica-Bold",
        22
    )

    p.drawString(
        70,
        680,
        "Order Invoice"
    )

    # DATE

    p.setFont(
        "Helvetica",
        12
    )

    p.drawString(

        70,

        650,

        f"Date: {datetime.now().strftime('%d %B %Y, %I:%M %p')}"

    )

    # TABLE DATA

    data = [

        [
            "Book",
            "Author",
            "Price"
        ]

    ]

    for book in books:

        data.append([

            book["title"],

            book["author"],

            f"₹{book['price']}"

        ])

    # TOTAL ROW

    data.append([

        "",

        "Total",

        f"₹{total_price}"

    ])

    table = Table(
        data,
        colWidths=[250, 150, 100]
    )

    style = TableStyle([

        (
            "BACKGROUND",
            (0, 0),
            (-1, 0),
            colors.HexColor("#7e22ce")
        ),

        (
            "TEXTCOLOR",
            (0, 0),
            (-1, 0),
            colors.white
        ),

        (
            "GRID",
            (0, 0),
            (-1, -1),
            1,
            colors.black
        ),

        (
            "FONTNAME",
            (0, 0),
            (-1, -1),
            "Helvetica"
        ),

        (
            "BOTTOMPADDING",
            (0, 0),
            (-1, 0),
            12
        ),

    ])

    table.setStyle(style)

    table.wrapOn(p, 400, 200)

    table.drawOn(p, 70, 450)

    # WATERMARK

    p.saveState()

    p.setFont(
        "Helvetica-Bold",
        60
    )

    p.setFillColorRGB(
        0.9,
        0.9,
        0.9
    )

    p.translate(300, 300)

    p.rotate(45)

    p.drawCentredString(
        0,
        0,
        "PAID"
    )

    p.restoreState()

    # FOOTER

    p.drawString(
        70,
        120,
        f"Order IDs: {', '.join(map(str, order_ids))}"
    )

    p.drawString(
        70,
        90,
        "Thank you for shopping with The Cozy Library 💜"
    )

    p.showPage()

    p.save()

    buffer.seek(0)

    return buffer