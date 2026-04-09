from PIL import Image, ImageDraw
import math

SIZE = 512
BG = (250, 250, 250, 255)        # near-white background
DARK = (10, 10, 10, 255)         # near-black
TEAL = (0, 229, 204, 255)        # accent
TEAL_DIM = (0, 185, 165, 255)    # slightly dimmer teal for middle ring

img = Image.new('RGBA', (SIZE, SIZE), BG)
draw = ImageDraw.Draw(img)

# ── Grid system ──────────────────────────────────────────────────────────────
# The logo is based on a 14x14 grid with 2-unit padding on each side.
# Each cell = SIZE / 14 ≈ 36.57px.  We work in grid units then scale.

UNITS = 14
CELL = SIZE / UNITS
PAD = 1  # 1 unit padding on each side → 12 usable units


def cell(u):
    """Convert grid units to pixel coordinate."""
    return round(u * CELL)


def rect(x0u, y0u, x1u, y1u, fill, radius=0):
    x0, y0, x1, y1 = cell(x0u), cell(y0u), cell(x1u), cell(y1u)
    if radius:
        draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill)
    else:
        draw.rectangle([x0, y0, x1, y1], fill=fill)


# ── Helper: draw one finder pattern ──────────────────────────────────────────
# A QR finder pattern = 7×7 outer dark, 5×5 middle light, 3×3 inner accent.
# origin_u = top-left corner in grid units, size_u = 7 units.

def finder(ox, oy, outer_size=3.6):
    """Draw a stylised finder pattern.
    ox, oy  : top-left in grid units
    outer_size: full size in grid units (default 3.6)
    """
    gap = outer_size / 7          # one "module" width
    inner_start = gap
    inner_size = outer_size - 2 * gap
    core_start = gap * 2
    core_size = outer_size - 4 * gap

    r_outer = round(cell(gap) * 0.55)
    r_inner = round(cell(gap) * 0.35)
    r_core  = round(cell(gap) * 0.25)

    # Outer ring — dark
    rect(ox, oy,
         ox + outer_size, oy + outer_size,
         DARK, radius=r_outer)

    # Middle ring — background (punches hole)
    rect(ox + inner_start, oy + inner_start,
         ox + inner_start + inner_size, oy + inner_start + inner_size,
         BG, radius=r_inner)

    # Core — teal
    rect(ox + core_start, oy + core_start,
         ox + core_start + core_size, oy + core_start + core_size,
         TEAL, radius=r_core)


# ── Three finder patterns ─────────────────────────────────────────────────────
# Classic QR placement: top-left, top-right, bottom-left.
# We use 3.6 units for each finder, with 0.4-unit gap between finders and edge.

F = 3.6   # finder size in units
MARGIN = PAD + 0.4  # = 1.4 units from canvas edge

# Top-left
finder(MARGIN, MARGIN, F)

# Top-right
finder(UNITS - MARGIN - F, MARGIN, F)

# Bottom-left
finder(MARGIN, UNITS - MARGIN - F, F)

# ── Data dots (bottom-right quadrant) ────────────────────────────────────────
# Suggest QR data area with a 4×4 grid of tiny rounded squares,
# varying opacity to look like real data modules.
# Positioned in the area where the 4th finder would be.

import random
random.seed(42)

dot_area_start = UNITS - MARGIN - F + 0.2
dot_area_size = F - 0.4
dot_cols = 5
dot_rows = 5
dot_size = (dot_area_size / dot_cols) * 0.60  # 60% fill factor
dot_gap  = dot_area_size / dot_cols

# Predefined pattern — not random — for a clean, intentional look
pattern = [
    [1, 0, 1, 1, 0],
    [0, 1, 0, 1, 1],
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1],
    [0, 1, 1, 0, 1],
]

for row in range(dot_rows):
    for col in range(dot_cols):
        if pattern[row][col]:
            dx = dot_area_start + col * dot_gap + (dot_gap - dot_size) / 2
            dy = dot_area_start + row * dot_gap + (dot_gap - dot_size) / 2
            # Alternate between dark and teal for the data dots
            color = TEAL if (row + col) % 3 == 0 else DARK
            # Make some dots slightly smaller for rhythm
            sz = dot_size * (0.85 if (row * col) % 2 == 0 else 1.0)
            r_dot = round(cell(sz) * 0.3)
            rect(dx, dy, dx + sz, dy + sz, color, radius=r_dot)

# ── Alignment marker (centre) ────────────────────────────────────────────────
# A small 3-ring alignment mark at grid centre — a refined QR detail.
cx = UNITS / 2
cy = UNITS / 2
align_size = 0.9
a_gap = align_size / 5

rect(cx - align_size/2, cy - align_size/2,
     cx + align_size/2, cy + align_size/2,
     DARK, radius=round(cell(a_gap) * 0.5))

rect(cx - align_size/2 + a_gap, cy - align_size/2 + a_gap,
     cx + align_size/2 - a_gap, cy + align_size/2 - a_gap,
     BG)

rect(cx - align_size/2 + a_gap*2, cy - align_size/2 + a_gap*2,
     cx + align_size/2 - a_gap*2, cy + align_size/2 - a_gap*2,
     TEAL)

# ── Timing strips ─────────────────────────────────────────────────────────────
# Horizontal and vertical timing patterns between finders (QR signature detail).
# Small alternating dark dots between the finder pattern edges.

strip_y = MARGIN + F / 2       # horizontal strip y-centre
strip_x = MARGIN + F / 2       # vertical strip x-centre
strip_start = MARGIN + F + 0.35
strip_end   = UNITS - MARGIN - F - 0.35
timing_dot = 0.22
timing_gap = (strip_end - strip_start) / 5

for i in range(6):
    pos = strip_start + i * timing_gap
    # horizontal
    if i % 2 == 0:
        rect(pos - timing_dot/2, strip_y - timing_dot/2,
             pos + timing_dot/2, strip_y + timing_dot/2,
             DARK, radius=round(cell(timing_dot) * 0.4))
    # vertical
    if i % 2 == 0:
        rect(strip_x - timing_dot/2, pos - timing_dot/2,
             strip_x + timing_dot/2, pos + timing_dot/2,
             DARK, radius=round(cell(timing_dot) * 0.4))

# ── Save ──────────────────────────────────────────────────────────────────────
out_path = "C:/Workspace/QRCodeGenerator/public/logo-new.png"
img.save(out_path, "PNG")
print(f"Saved to {out_path}")

# Also save a dark-background version for preview
img_dark = Image.new('RGBA', (SIZE, SIZE), (10, 10, 10, 255))
draw_dark = ImageDraw.Draw(img_dark)

BG_DARK = (10, 10, 10, 255)
DARK_ON_DARK = (240, 240, 240, 255)

# Redraw on dark background
def rect_d(x0u, y0u, x1u, y1u, fill, radius=0):
    x0, y0, x1, y1 = cell(x0u), cell(y0u), cell(x1u), cell(y1u)
    if radius:
        draw_dark.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill)
    else:
        draw_dark.rectangle([x0, y0, x1, y1], fill=fill)

def finder_dark(ox, oy, outer_size=3.6):
    gap = outer_size / 7
    inner_start = gap
    inner_size = outer_size - 2 * gap
    core_start = gap * 2
    core_size = outer_size - 4 * gap
    r_outer = round(cell(gap) * 0.55)
    r_inner = round(cell(gap) * 0.35)
    r_core  = round(cell(gap) * 0.25)
    rect_d(ox, oy, ox + outer_size, oy + outer_size, DARK_ON_DARK, radius=r_outer)
    rect_d(ox + inner_start, oy + inner_start,
           ox + inner_start + inner_size, oy + inner_start + inner_size,
           BG_DARK, radius=r_inner)
    rect_d(ox + core_start, oy + core_start,
           ox + core_start + core_size, oy + core_start + core_size,
           TEAL, radius=r_core)

finder_dark(MARGIN, MARGIN, F)
finder_dark(UNITS - MARGIN - F, MARGIN, F)
finder_dark(MARGIN, UNITS - MARGIN - F, F)

for row in range(dot_rows):
    for col in range(dot_cols):
        if pattern[row][col]:
            dx = dot_area_start + col * dot_gap + (dot_gap - dot_size) / 2
            dy = dot_area_start + row * dot_gap + (dot_gap - dot_size) / 2
            color = TEAL if (row + col) % 3 == 0 else DARK_ON_DARK
            sz = dot_size * (0.85 if (row * col) % 2 == 0 else 1.0)
            r_dot = round(cell(sz) * 0.3)
            rect_d(dx, dy, dx + sz, dy + sz, color, radius=r_dot)

rect_d(cx - align_size/2, cy - align_size/2, cx + align_size/2, cy + align_size/2,
       DARK_ON_DARK, radius=round(cell(a_gap) * 0.5))
rect_d(cx - align_size/2 + a_gap, cy - align_size/2 + a_gap,
       cx + align_size/2 - a_gap, cy + align_size/2 - a_gap, BG_DARK)
rect_d(cx - align_size/2 + a_gap*2, cy - align_size/2 + a_gap*2,
       cx + align_size/2 - a_gap*2, cy + align_size/2 - a_gap*2, TEAL)

for i in range(6):
    pos = strip_start + i * timing_gap
    if i % 2 == 0:
        rect_d(pos - timing_dot/2, strip_y - timing_dot/2,
               pos + timing_dot/2, strip_y + timing_dot/2,
               DARK_ON_DARK, radius=round(cell(timing_dot) * 0.4))
        rect_d(strip_x - timing_dot/2, pos - timing_dot/2,
               strip_x + timing_dot/2, pos + timing_dot/2,
               DARK_ON_DARK, radius=round(cell(timing_dot) * 0.4))

dark_path = "C:/Workspace/QRCodeGenerator/public/logo-new-dark.png"
img_dark.save(dark_path, "PNG")
print(f"Dark version saved to {dark_path}")
