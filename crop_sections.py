from PIL import Image

im = Image.open('screenshots/01_full_page.png')
w, h = im.size

# Crop sections based on page layout
sections = {
    '02_hero_section.png': (0, 0, w, 750),
    '03_propuesta_valor.png': (0, 750, w, 1530),
    '04_champions_sessions.png': (0, 1530, w, 2180),
    '05_calendario_operativo.png': (0, 2180, w, 2800),
    '06_formulario_postulacion.png': (0, 2800, w, 3350)
}

for name, box in sections.items():
    cropped = im.crop(box)
    cropped.save(f'screenshots/{name}')
    print(f'Saved {name} with size {cropped.size}')
