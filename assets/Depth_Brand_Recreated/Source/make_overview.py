from PIL import Image,ImageDraw,ImageFont,ImageFilter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'Previews'
out.mkdir(exist_ok=True)
S=1
W,H=2500,2160
canvas=Image.new('RGB',(W,H),'#F4F6F5')
d=ImageDraw.Draw(canvas)
FONTREG='/usr/share/fonts/opentype/inter/Inter-Regular.otf'
FONTBOLD='/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf'
def font(n,bold=False):return ImageFont.truetype(FONTBOLD if bold else FONTREG,n)
def add(path, rect, radius=22, crop=True):
    source=Image.open(ROOT/path).convert('RGB');x,y,w,h=rect
    ratio=max(w/source.width,h/source.height) if crop else min(w/source.width,h/source.height)
    im=source.resize((round(source.width*ratio),round(source.height*ratio)),Image.Resampling.LANCZOS)
    x0=(im.width-w)//2;y0=(im.height-h)//2
    image=im.crop((x0,y0,x0+w,y0+h))
    mask=Image.new('L',(w,h),0);ImageDraw.Draw(mask).rounded_rectangle((0,0,w-1,h-1),radius=radius,fill=255)
    canvas.paste(image,(x,y),mask)
def label(x,y,text):d.text((x,y),text,font=font(25,True),fill='#2B413D')
def card(x,y,w,h):
    d.rounded_rectangle((x,y,x+w,y+h),radius=26,fill='#FFFFFF',outline='#E0E7E4',width=2)
# top title
label(65,30,'DEPTH  /  BRAND & MARKETING SYSTEM')
d.text((65,70),'Folded-D Identity  •  AI Engineering Drawing Review',font=font(23),fill='#7C8F8A')
add('Web/01-master-hero-banner-1920x490.png',(60,128,2380,606),30)
label(66,753,'01  •  LinkedIn & personal branding')
add('LinkedIn/03-personal-banner-1584x396.png',(65,797,1468,367),21)
add('LinkedIn/01-company-avatar-1024.png',(1566,797,378,378),36)
add('LinkedIn/07-branded-profile-photo-1024.png',(1971,797,378,378),200)
label(1566,1191,'Company avatar')
label(1971,1191,'Branded profile')
label(66,1178,'Personal banner  /  1584 × 396')
label(66,1257,'02  •  Product storytelling')
add('Social/01-product-launch-square-1080.png',(65,1300,705,705),24)
add('Social/04-carousel-slide-1-1080.png',(800,1300,520,520),24)
add('Social/04-carousel-slide-2-1080.png',(1350,1300,520,520),24)
add('Social/04-carousel-slide-3-1080.png',(1900,1300,520,520),24)
label(805,1837,'Review faster')
label(1355,1837,'Catch issues')
label(1905,1837,'Verify revisions')
label(65,2040,'Editable SVGs + production-resolution PNGs  •  Inter typography  •  Mint / teal / dark forest')
canvas.save(out/'Depth_Brand_Kit_Overview.png',quality=98)
# Logo variants preview with clean on-white and on-black comparison
W,H=1600,890
im=Image.new('RGB',(W,H),'#EDF3F1');g=ImageDraw.Draw(im)
for path,xy in [('Brand/08-logo-horizontal-light-background.png',(50,50)),('Brand/07-logo-horizontal-dark-background.png',(50,485))]:
    p=Image.open(ROOT/path).convert('RGB').resize((1500,450),Image.Resampling.LANCZOS)
    im.paste(p,xy)
im.save(out/'Depth_Logos_Light_Dark.png')
print('previews created')
