#!/usr/bin/env python3
"""
Сборка всех иконок сайта из одного исходника.

    pip install pillow cairosvg
    python3 brand/build-icons.py

Главное здесь — app/favicon.ico. Поисковики (и Яндекс, и Google) НЕ читают
<link rel="icon">, а отдельным запросом дёргают /favicon.ico из корня домена,
поэтому нужен многоразмерный .ico: Яндекс берёт кадр 32, Google — 48.

Остальные файлы — для вкладки браузера, домашнего экрана и PWA.
"""

import io
from pathlib import Path

import cairosvg
from PIL import Image

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
SOURCE = HERE / "logo-source.svg"
# Упрощённый знак для кадра 16×16: фирменный «<>» на такой сетке заплывает.
SOURCE_SMALL = HERE / "logo-source-small.svg"

# Мастер-растр: рендерим один раз крупно, все размеры — из него.
MASTER = 1024

# Кадры внутри .ico. 32 показывает Яндекс, 48 — Google, 16 — вкладка браузера.
ICO_SIZES = [(16, 16), (32, 32), (48, 48)]
# До этого размера включительно берём упрощённый знак.
SMALL_UPTO = 16


def render(svg: str, size: int) -> Image.Image:
    """SVG → RGBA-растр заданного размера."""
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert("RGBA")


def sq(img: Image.Image, n: int) -> Image.Image:
    return img.resize((n, n), Image.LANCZOS)


def main() -> None:
    svg = SOURCE.read_text(encoding="utf-8")
    master = render(svg, MASTER)
    master_small = render(SOURCE_SMALL.read_text(encoding="utf-8"), MASTER)

    # Maskable-версия: плашка во весь кадр, без скруглений — Android режет
    # иконку своей маской, и скруглённые углы дали бы двойное скругление.
    master_square = render(svg.replace('rx="16"', 'rx="0"'), MASTER)

    (SITE / "public").mkdir(exist_ok=True)

    # .ico: каждый кадр ресайзим ИЗ МАСТЕРА отдельно. Если отдать Pillow один
    # кадр и список sizes, он пересжимает остальные из него — на 16×16 это мыло.
    frames = [sq(master_small if n <= SMALL_UPTO else master, n) for n, _ in ICO_SIZES]
    frames[-1].save(
        SITE / "src/app/favicon.ico",
        format="ICO",
        sizes=ICO_SIZES,
        append_images=frames[:-1],
    )

    sq(master, 512).save(SITE / "src/app/icon.png", optimize=True)
    sq(master, 180).save(SITE / "src/app/apple-icon.png", optimize=True)
    sq(master, 192).save(SITE / "public/icon-192.png", optimize=True)
    sq(master, 512).save(SITE / "public/icon-512.png", optimize=True)
    sq(master_square, 512).save(SITE / "public/icon-maskable.png", optimize=True)

    print("Готово:")
    for path in sorted(SITE.glob("src/app/favicon.ico")) + sorted(SITE.glob("src/app/*.png")) + sorted(
        SITE.glob("public/icon-*.png")
    ):
        print(f"  {path.relative_to(SITE)}  {path.stat().st_size / 1024:.1f} КБ")


if __name__ == "__main__":
    main()
