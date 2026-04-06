#!/usr/bin/env python3
"""
Remove backgrounds from 3D book cover images, crop tight, and save as 750x1000 cover.png
"""
from rembg import remove
from PIL import Image
import io, os

BASE = os.path.dirname(os.path.abspath(__file__))

BOOKS = [
    ("book 01.jpg", "book-01-heartbeat"),
    ("book 02.jpg", "book-02-procrastination"),
    ("book 03.jpg", "book-03-half-island-life"),
    ("book 04.jpg", "book-04-half-the-distance"),
    ("book 05.jpg", "book-05-dog-training"),
]

TARGET_W, TARGET_H = 750, 1000

for filename, folder in BOOKS:
    src = os.path.join(BASE, "3D book covers", filename)
    dst = os.path.join(BASE, "sites", folder, "cover.png")

    print(f"Processing {filename} …")

    # 1. Remove background
    with open(src, "rb") as f:
        raw = f.read()
    result = remove(raw)
    img = Image.open(io.BytesIO(result)).convert("RGBA")

    # 2. Auto-crop: remove fully transparent border rows/cols
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # 3. Fit into 750x1000 canvas (maintain aspect ratio, pad with transparent)
    img.thumbnail((TARGET_W, TARGET_H), Image.LANCZOS)
    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    offset_x = (TARGET_W - img.width) // 2
    offset_y = (TARGET_H - img.height) // 2
    canvas.paste(img, (offset_x, offset_y), img)

    canvas.save(dst, "PNG")
    print(f"  Saved → {dst}")

print("\nAll covers processed.")
