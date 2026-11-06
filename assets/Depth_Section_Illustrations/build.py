from pathlib import Path
import math, html, json, textwrap
from PIL import Image, ImageDraw, ImageFont
import cairosvg
ROOT=Path('/mnt/data/Depth_Section_Illustrations')
W,H=1200,800
THEMES={
 'dark': dict(bg='#0B1011', bg2='#0E1617', surface='#131B1C', surface2='#182324', raised='#1B2929', line='#30413F', bright='#E9F7F3', muted='#8EA6A0', subdued='#607873', accent='#16E3BA', accent2='#68FFE0', teal='#087A69', soft='#163F38', paper='#152021', ink='#E5EEE9', gold='#E7AA5F', goldbg='#3A2B1B', edge='#334945', white='#FFFFFF'),
 'light':dict(bg='#F6F9F8', bg2='#ECF5F1', surface='#FFFFFF', surface2='#F5FAF7', raised='#EEF7F3', line='#C9DCD6', bright='#19382F', muted='#647E76', subdued='#8BA29A', accent='#009D82', accent2='#16CDA7', teal='#0D7767', soft='#DFF6EC', paper='#FFFFFF', ink='#26493E', gold='#C48D40', goldbg='#FFF2DC', edge='#BED7CB', white='#FFFFFF')}

def esc(s): return html.escape(str(s))
def rect(x,y,w,h,fill='none',r=0,stroke='none',sw=1,extra=''):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'
def circle(x,y,r,fill='none',stroke='none',sw=1,extra=''):
 return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'
def line(x1,y1,x2,y2,stroke,sw=2,extra=''):
 return f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" {extra}/>'
def path(d,stroke='none',sw=2,fill='none',extra=''):
 return f'<path d="{d}" stroke="{stroke}" stroke-width="{sw}" fill="{fill}" stroke-linejoin="round" stroke-linecap="round" {extra}/>'
def txt(x,y,s,sz=20,c='#fff',weight=500,spacing=0,mono=False,other=''):
 font='DejaVu Sans Mono' if mono else 'Inter'
 return f'<text x="{x}" y="{y}" fill="{c}" font-family="{font},sans-serif" font-size="{sz}" font-weight="{weight}" letter-spacing="{spacing}" {other}>{esc(s)}</text>'
def group(x,y,inner,transform=''):
 return f'<g transform="translate({x} {y}) {transform}">{inner}</g>'
def panel(x,y,w,h,t,fill=None,r=22,shadow=True):
 return rect(x,y,w,h,fill or t['surface'],r,t['line'],1.3, 'filter="url(#softShadow)"' if shadow else '')
def check(x,y,t,rad=17,warning=False):
 if warning:
  return circle(x,y,rad,t['goldbg'],t['gold'],2)+txt(x-4.9,y+8,'!',rad*1.3,t['gold'],760)
 return circle(x,y,rad,t['soft'],t['accent'],1.5)+path(f'M{x-rad*.43} {y}l{rad*.28} {rad*.31} {rad*.6} -{rad*.67}',t['accent'],3.4)
def plus(x,y,t,r=15):
 return circle(x,y,r,t['soft'],t['accent'],1.5)+line(x-7,y,x+7,y,t['accent'],2.4)+line(x,y-7,x,y+7,t['accent'],2.4)
def dot(x,y,t,r=5):return circle(x,y,r,t['accent'])
def pill(x,y,w,h,s,t,col=None):
 col=col or t['accent']
 return rect(x,y,w,h,t['soft'],h/2,'none')+txt(x+15,y+h/2+5,s,14,col,670)
def micro_lines(x,y,widths,t,dy=27,sz=9):
 s=''
 for i,w in enumerate(widths): s+=rect(x,y+i*dy,w,sz,t['edge'] if i%2==0 else t['line'],sz/2)
 return s

def defs(t):
 return f'''<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{t['bg']}"/><stop offset="1" stop-color="{t['bg2']}"/></linearGradient>
  <linearGradient id="accentFill" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{t['accent2']}"/><stop offset="1" stop-color="{t['teal']}"/></linearGradient>
  <linearGradient id="surfaceFill" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{t['surface2']}"/><stop offset="1" stop-color="{t['surface']}"/></linearGradient>
  <radialGradient id="glow"><stop stop-color="{t['accent']}" stop-opacity=".15"/><stop offset="1" stop-color="{t['accent']}" stop-opacity="0"/></radialGradient>
  <linearGradient id="fadeGrad"><stop stop-color="{t['accent2']}" stop-opacity=".32"/><stop offset="1" stop-color="{t['accent']}" stop-opacity=".02"/></linearGradient>
  <filter id="softShadow" x="-30%" y="-50%" width="160%" height="220%"><feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="#000000" flood-opacity=".16"/></filter>
  <filter id="glowFx" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="18"/></filter>
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="{t['line']}" stroke-opacity=".24" stroke-width="1"/></pattern>
  <marker id="arr" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="{t['muted']}"/></marker>
  <clipPath id="clip"><rect x="1" y="1" width="1198" height="798" rx="32"/></clipPath>
 </defs>'''

def base(t,scene):
 g=rect(0,0,W,H,'url(#bg)',32)
 g+=f'<g clip-path="url(#clip)">{circle(835,300,500,"url(#glow)")}'
 # low contrast fine grid floating back only
 g+=f'<g opacity=".48">{rect(0,0,W,H,"url(#grid)")}</g>'
 g+=scene+'</g>'
 g+=rect(.8,.8,1198.4,798.4,'none',32,t['line'],1.6)
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img">{defs(t)}{g}</svg>'

def bracket(t,x,y,scale=1,light=False):
 # line based CAD part bracket orthographic drawing
 ink=t['bright'] if not light else t['ink']; soft=t['muted']
 b=path('M25 196L25 92Q25 81 37 81H139Q153 81 163 69L217 16Q226 8 238 8H293Q304 8 312 20L362 73Q370 82 386 82H480Q491 82 491 94V196Z',ink,3.4)
 b+=circle(262,79,37,'none',ink,3)+circle(262,79,17,'none',ink,2)
 for hx,hy in [(73,140),(442,140)]:
  b+=circle(hx,hy,20,'none',ink,2.4)+circle(hx,hy,3,t['accent'])
  b+=line(hx-32,hy,hx+32,hy,soft,1,'stroke-dasharray="5 5"')+line(hx,hy-32,hx,hy+32,soft,1,'stroke-dasharray="5 5"')
 b+=line(262,0,262,208,soft,1.1,'stroke-dasharray="7 6"')
 b+=line(25,223,491,223,t['muted'],1.4,'marker-start="url(#arr)" marker-end="url(#arr)"')
 b+=line(25,199,25,235,t['muted'],1)+line(491,199,491,235,t['muted'],1)
 b+=txt(228,214,'50.8',16,t['muted'],520,0,True)
 b+=line(8,92,8,196,t['muted'],1.2,'marker-start="url(#arr)" marker-end="url(#arr)"')
 b+=txt(-40,143,'25.4',14,t['muted'],520,0,True, 'transform="rotate(-90 -40 143)"')
 b+=path('M280 48L330 -3H400',t['muted'],1.1)+txt(343,-12,'Ø10.0',13,t['bright'],520,0,True)
 return group(x,y,b,f'scale({scale})')

def mini_bracket(x,y,t,s=.22):
 return group(x,y,bracket(t,0,0,1),f'scale({s})')

def minipart(kind,x,y,t):
 ink=t['muted']
 if kind==0:
  return rect(x+5,y+11,73,49,'none',4,ink,1.5)+circle(x+25,y+28,8,'none',ink,1.3)+circle(x+58,y+46,8,'none',ink,1.3)
 if kind==1:
  return rect(x+3,y+28,78,13,'none',2,ink,1.4)+rect(x+25,y+18,29,33,t['surface2'],1,ink,1.4)+line(x+3,y+34,x+81,y+34,t['accent'],1,'stroke-dasharray="6 4"')
 if kind==2:
  return circle(x+45,y+35,27,'none',ink,1.3)+circle(x+45,y+35,13,'none',ink,1.4)+circle(x+45,y+12,3,t['accent'])
 return rect(x+6,y+14,66,43,'none',2,ink,1.4)+line(x+17,y+20,x+17,y+49,ink,1.5)+line(x+53,y+20,x+53,y+49,ink,1.5)

def sheet(t,x,y,w,h,rev='C',active=False,inner=True):
 bg=t['paper'] if active else t['surface2']; c=t['bright'] if active else t['muted']
 v=rect(x,y,w,h,bg,14,t['accent'] if active else t['line'],2.2 if active else 1.5)
 v+=rect(x+22,y+20,w-44,h-40,'none',1,t['edge'],.9)
 v+=line(x+22,y+h-83,x+w-22,y+h-83,t['edge'],1)
 v+=rect(x+w-214,y+h-83,192,62,t['surface2'],0,t['edge'],1)
 v+=line(x+w-214,y+h-57,x+w-22,y+h-57,t['edge'],1)
 v+=line(x+w-70,y+h-57,x+w-70,y+h-21,t['edge'],1)
 v+=txt(x+w-195,y+h-63,'DEPTH / DRAWING',10,t['muted'],690,1.0,True)
 v+=txt(x+w-196,y+h-35,'MB-2047',11,c,650,.2,True)
 v+=txt(x+w-60,y+h-35,'REV '+rev,10,t['accent'],740,0,True)
 if inner:
  scale=min((w-115)/520,(h-132)/240)
  v+=bracket(t,x+55,y+75,scale)
 return v

def asset_review_queue(t):
 s=panel(124,94,954,611,t,r=30)
 s+=rect(124,94,954,67,t['surface2'],28)+rect(124,139,954,22,t['surface2'])+line(124,161,1078,161,t['line'],1.2)
 s+=circle(167,128,8,t['accent'])+txt(190,135,'Review workspace',18,t['bright'],680)
 s+=rect(912,111,126,37,t['soft'],18)+txt(932,134,'4 drawings',13,t['accent'],700)
 rows=[('MB-2047',0,'REV C','IN REVIEW'),('SHF-1180',1,'REV B','APPROVED'),('CVR-0904',2,'REV A','CHANGES'),('PLT-3312',3,'REV D','WAITING')]
 for i,(id,k,rev,stat) in enumerate(rows):
  y=190+i*119
  s+=rect(158,y,883,99,t['surface2'] if i==0 else t['surface'],14,t['accent'] if i==0 else t['line'],1.5)
  s+=rect(179,y+14,103,72,t['bg'],9,t['line'],1.0)+minipart(k,186,y+20,t)
  s+=txt(304,y+39,id,19,t['bright'],680)+txt(304,y+66,'Mechanical drawing  /  '+rev,13,t['muted'],500)
  if i==0: s+=pill(862,y+31,151,38,'In review',t)
  elif i==1:s+=pill(862,y+31,151,38,'Approved',t)
  elif i==2:
   s+=rect(862,y+31,151,38,t['goldbg'],19)+txt(880,y+56,'Changes',14,t['gold'],680)
  else:
   s+=rect(862,y+31,151,38,t['raised'],19)+txt(889,y+56,'Awaiting',14,t['muted'],680)
  s+=txt(730,y+59,rev,13,t['muted'],560,0,True)
 # floating accent badge
 s+=group(1030,547,rect(0,0,92,91,t['surface2'],20,t['accent'],2)+check(46,45,t,22),'rotate(7)')
 return s

def asset_drawing_details(t):
 s=panel(93,68,1014,657,t,r=26)
 s+=rect(93,68,1014,55,t['surface2'],26)+rect(93,108,1014,15,t['surface2'])+line(93,122,1107,122,t['line'],1)
 s+=circle(129,96,6,t['accent'])+txt(147,102,'MB-2047  /  REV C',14,t['muted'],650,1.2,True)
 s+=sheet(t,143,160,915,514,rev='C',active=True,inner=False)
 # large front-view orthographic at center
 s+=group(240,252,bracket(t,0,0,1), 'scale(1.16)')
 # section detail to the right (w 180)
 s+=txt(789,241,'SECTION A–A',12,t['muted'],670,1,True)
 s+=rect(810,274,158,107,'none',0,t['bright'],2)
 s+=rect(810,280,158,14,t['edge'],1)+rect(810,365,158,15,t['edge'],1)
 s+=rect(870,274,36,107,t['paper'],0,t['bright'],1.5)
 s+=line(888,265,888,391,t['muted'],1,'stroke-dasharray="5 5"')
 s+=line(810,408,968,408,t['muted'],1.1,'marker-start="url(#arr)" marker-end="url(#arr)"')
 s+=txt(873,430,'18.0',12,t['muted'],540,0,True)
 s+=circle(718,310,11,t['accent'])+circle(718,310,4,t['white'])
 s+=path('M729 312L780 300',t['accent'],1.5)
 s+=group(735,313,rect(0,0,134,34,t['soft'],14,t['accent'],1)+txt(14,22,'Checked',13,t['accent'],700))
 return s

def asset_reviewers(t):
 s=panel(139,87,925,613,t,r=30)
 s+=txt(190,157,'ASSIGNED REVIEWERS',16,t['muted'],670,2,True)
 cols=[('AS','Design engineer','In review'),('MO','Checker','Awaiting'),('LC','Manufacturing','Awaiting')]
 for i,(initial,role,state) in enumerate(cols):
  y=200+i*145
  s+=rect(179,y,840,116,t['surface2'],18,t['line'],1.2)
  c=t['soft'] if i==0 else t['raised']
  s+=circle(248,y+58,32,c,t['accent'] if i==0 else t['line'],1.6)+txt(230,y+65,initial,19,t['accent'] if i==0 else t['bright'],700)
  s+=txt(305,y+52,role,21,t['bright'],680)+micro_lines(305,y+72,[235,157],t,15,6)
  if i==0:
   s+=check(904,y+56,t,20)+txt(832,y+63,'Reviewing',14,t['accent'],620)
  else:
   s+=circle(904,y+56,19,t['surface'],t['line'],1.4)+circle(904,y+56,5,t['muted'])+txt(809,y+63,'Waiting',14,t['muted'],600)
 s+=line(249,261,249,490,t['accent'],1.8,'stroke-dasharray="3 12" opacity=".6"')
 return s

def asset_revisions(t):
 s=''
 for idx,(x,y,rev) in enumerate([(163,159,'A'),(240,132,'B'),(320,114,'C')]):
  active=idx==2
  s+=sheet(t,x,y,652,497,rev,active=active,inner=idx==2)
 # right-side floating vertical timeline
 s+=panel(884,238,241,357,t,r=21)
 s+=txt(917,288,'REVISION',14,t['muted'],660,1.5,True)
 s+=line(938,340,938,534,t['edge'],2)
 for i,(label,y) in enumerate([('C',347),('B',426),('A',505)]):
  s+=circle(938,y,10,t['accent'] if i==0 else t['surface2'],t['accent'] if i==0 else t['muted'],2)
  s+=txt(973,y+7,'Rev '+label,18,t['bright'] if i==0 else t['muted'],710 if i==0 else 560)
  s+=micro_lines(973,y+18,[80],t,18,5)
 return s

def asset_status(t):
 s=panel(145,92,905,598,t,r=29)
 s+=txt(200,154,'Review overview',21,t['bright'],700)
 s+=line(197,179,998,179,t['line'],1.2)
 # graph arc with segments; dasharray
 s+=circle(403,405,139,'none',t['line'],31)
 s+=circle(403,405,139,'none',t['accent'],31,'stroke-dasharray="474 874" transform="rotate(-90 403 405)"')
 s+=circle(403,405,139,'none',t['gold'],31,'stroke-dasharray="210 874" stroke-dashoffset="-487" transform="rotate(-90 403 405)"')
 s+=txt(357,410,'4 / 5',39,t['bright'],760)+txt(366,441,'reviewed',15,t['muted'],560)
 labels=[('In review','02',t['accent']),('Approved','01',t['accent']),('Changes requested','01',t['gold']),('Awaiting review','01',t['muted'])]
 for i,(label,count,col) in enumerate(labels):
  y=241+i*101
  s+=rect(623,y,345,81,t['surface2'],14,t['line'],1)
  s+=circle(649,y+40,6,col)+txt(676,y+47,label,17,t['bright'],590)+txt(907,y+47,count,19,col,730,0,True)
 return s

def server_icon(x,y,t):
 return rect(x,y,110,52,t['surface2'],11,t['line'],1.4)+line(x+17,y+19,x+93,y+19,t['muted'],2)+circle(x+21,y+36,4,t['accent'])+circle(x+36,y+36,4,t['muted'])

def shield_icon(x,y,t,s=1):
 d=f'M{x} {y-50*s}L{x+43*s} {y-31*s}V{y+2*s}Q{x+40*s} {y+30*s} {x} {y+53*s}Q{x-40*s} {y+30*s} {x-43*s} {y+2*s}V{y-31*s}Z'
 return path(d,t['accent'],2.5,t['soft'])+path(f'M{x-18*s} {y+2*s}l{12*s} {12*s} {29*s} -{30*s}',t['accent'],4*s)

def asset_deployment(t):
 s=panel(90,71,1020,658,t,r=30)
 s+=rect(142,126,916,555,'none',22,t['accent'] if t['bg']=='#0B1011' else t['line'],2,'stroke-dasharray="10 10"')
 s+=txt(172,175,'CUSTOMER ENVIRONMENT',17,t['muted'],640,1.8,True)
 s+=rect(168,219,214,324,t['surface2'],23,t['line'],1.5)
 s+=rect(493,219,214,324,t['surface2'],23,t['line'],1.5)
 s+=rect(819,219,214,324,t['surface2'],23,t['line'],1.5)
 s+=path('M384 382H491M707 382H817',t['accent'],2.4,extra='stroke-dasharray="6 8"')
 s+=circle(437,382,7,t['accent'])+circle(764,382,7,t['accent'])
 # users icon left
 s+=circle(275,316,29,'none',t['bright'],2)
 s+=circle(275,307,9,t['muted'])+path('M258 332Q275 315 292 332',t['muted'],2.4)
 s+=txt(220,409,'Reviewers',20,t['bright'],680)+micro_lines(207,447,[141,97],t,20,7)
 # depth core middle
 s+=rect(540,292,121,112,'url(#accentFill)',28,'none')
 s+=path('M567 322H618Q641 322 635 341Q631 354 616 354H567ZM567 359H613Q631 359 625 374Q619 387 605 387H567',t['bg'],0,'none') if False else path('M560 326H617Q647 326 639 346Q632 359 612 359H560ZM560 364H605Q622 364 612 380Q602 393 585 393H560Z','none',0,t['bg'])
 s+=txt(556,448,'Depth',22,t['bright'],740)+micro_lines(532,476,[143],t,20,7)
 # drawing store icon
 s+=rect(883,293,86,83,'none',8,t['muted'],2)+line(893,311,959,311,t['muted'],2)+bracket(t,888,325,.14)
 s+=txt(847,409,'Drawings',21,t['bright'],690)+micro_lines(853,447,[133,103],t,20,7)
 s+=group(520,571,shield_icon(67,46,t,.66))
 s+=txt(624,621,'Private by design',16,t['accent'],620)
 return s

def asset_ai_review(t):
 # designed as an illustration only; overlay on technical drawing
 s=''
 s+=sheet(t,119,105,900,589,rev='B',active=True,inner=False)
 s+=group(219,257,bracket(t,0,0,1.03))
 s+=rect(125,110,888,575,'url(#fadeGrad)',16,'none',extra='opacity=".16"')
 # scan line
 s+=rect(171,390,790,3,t['accent'],1,extra='opacity=".65"')
 s+=rect(171,392,790,62,'url(#fadeGrad)',1,extra='opacity=".25"')
 # issue callout
 s+=path('M610 359L746 276H834',t['accent'],2.2)
 s+=circle(610,359,8,t['accent'])
 s+=panel(751,221,357,116,t,r=17)
 s+=check(782,279,t,19)+txt(817,270,'Dimension',16,t['bright'],680)+txt(817,296,'verified',15,t['muted'],530)
 s+=path('M543 498L725 563H801',t['gold'],2)
 s+=circle(543,498,8,t['gold'])
 s+=panel(768,526,352,109,t,r=17)
 s+=check(803,582,t,19,True)+txt(837,576,'Tolerance',16,t['bright'],670)+txt(837,603,'needs review',14,t['muted'],530)
 return s

def cube(x,y,t):
 # iso part with base and central extrusion, dimension guides
 s=path(f'M{x} {y}l145 -77 156 88 -145 80Z',t['bright'],2.2,t['raised'])
 s+=path(f'M{x} {y}v118l156 90V{y+91}Z',t['bright'],2.2,t['soft'])
 s+=path(f'M{x+301} {y+11}v116l-145 81V{y+91}Z',t['bright'],2.2,t['surface'])
 s+=path(f'M{x+85} {y-45}v-63l70-38 70 40v62l-70 38Z',t['accent'],2.2,t['surface2'])
 s+=path(f'M{x+85} {y-108}l70 -38 70 40 -70 37Z',t['accent'],2.2,t['soft'])
 s+=path(f'M{x+155} {y-69}v63',t['accent'],1.8)
 s+=circle(x+148,y+10,24,'none',t['accent'],1.7)
 s+=line(x-25,y+130,x+151,y+231,t['muted'],1,'stroke-dasharray="5 5"')
 return s

def asset_3d2d(t):
 s=panel(78,114,481,574,t,r=24)
 s+=panel(642,114,481,574,t,r=24)
 s+=txt(126,169,'3D MODEL',14,t['muted'],660,1.5,True)
 s+=txt(687,169,'2D DRAWING',14,t['muted'],660,1.5,True)
 s+=cube(155,358,t)
 s+=sheet(t,667,241,427,347,rev='A',active=True,inner=False)
 s+=bracket(t,724,310,.63)
 # central handoff connection arrow
 s+=line(546,399,633,399,t['accent'],4)
 s+=path('M613 382L634 399L613 416',t['accent'],3)
 s+=circle(589,400,25,t['surface'],t['accent'],2)
 s+=path('M579 400h19m-7-7 7 7-7 7',t['accent'],2.6)
 return s

def asset_secure_storage(t):
 s=panel(95,78,1010,642,t,r=28)
 # outer container
 s+=rect(158,146,889,504,'none',26,t['accent'],1.8,'stroke-dasharray="9 10"')
 s+=txt(197,196,'PRIVATE WORKSPACE',15,t['muted'],670,1.5,True)
 # 3 secure files with visible layered tabs
 for i,(x,y) in enumerate([(230,320),(325,279),(420,239)]):
  s+=rect(x,y,345,279,t['surface2'],18,t['line'],1.5)
  s+=rect(x+27,y+24,290,15,t['edge'],5)
  s+=mini_bracket(x+53,y+73,t,.42)
  s+=micro_lines(x+188,y+103,[99,121,74],t,31,9)
 s+=circle(854,381,115,t['soft'],t['accent'],2)
 s+=shield_icon(854,383,t,1.4)
 s+=path('M767 552H944',t['accent'],2,extra='stroke-dasharray="6 8"')
 s+=circle(766,553,6,t['accent'])+circle(945,553,6,t['accent'])
 return s

ASSETS=[
 ('01-drawing-review-queue','Drawing Review Queue',asset_review_queue,'Queue section; use as illustration above or beside your product text.'),
 ('02-drawing-details','Drawing Details',asset_drawing_details,'Detailed mechanical CAD sheet for the Drawing Details section.'),
 ('03-reviewer-workflow','Who Can Review',asset_reviewers,'Assigned reviewers and review state artwork.'),
 ('04-revision-history','Revision History',asset_revisions,'Stacked revisions and revision timeline artwork.'),
 ('05-review-status','Review Status',asset_status,'Review states and progress visualization.'),
 ('06-private-deployment','Deployment & Data Control',asset_deployment,'Customer-controlled environment boundary with local components.'),
 ('07-ai-drawing-review','AI Drawing Review',asset_ai_review,'Illustrative future AI-assisted issue detection and verification.'),
 ('08-3d-to-2d','3D-to-2D Drawing',asset_3d2d,'Illustrative planned 3D model to 2D drawing workflow.'),
 ('09-private-drawing-storage','Private Drawing Storage',asset_secure_storage,'Optional IP protection and secure file storage illustration.')
]

manifest=[]
for slug,name,func,usage in ASSETS:
 item={'name':name,'slug':slug,'usage':usage,'size':[1200,800],'variants':{}}
 for theme in THEMES:
  t=THEMES[theme]
  svg=base(t,func(t))
  pathsvg=ROOT/'svg'/theme/(slug+'.svg'); pathpng=ROOT/'png'/theme/(slug+'.png')
  pathsvg.write_text(svg)
  cairosvg.svg2png(bytestring=svg.encode(),write_to=str(pathpng),output_width=2400,output_height=1600)
  item['variants'][theme]={'svg':str(pathsvg.relative_to(ROOT)),'png':str(pathpng.relative_to(ROOT))}
  print(name,theme,pathpng.stat().st_size,flush=True)
 manifest.append(item)
(ROOT/'manifest.json').write_text(json.dumps(manifest,indent=2))

# overview: 2 columns for each theme
thumb_w=410; thumb_h=273
out=Image.new('RGB',(1050,9*319+190),'#F4F8F6'); dr=ImageDraw.Draw(out)
try:
 font=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-SemiBold.otf',24)
 small=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Medium.otf',17)
 big=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Bold.otf',35)
except:font=small=big=ImageFont.load_default()
dr.text((54,35),'DEPTH / SECTION ILLUSTRATIONS',font=big,fill='#152E28')
dr.text((54,93),'Mintlify-inspired visual restraint. Individual SVG + PNG assets. No page copy baked into illustrations.',font=small,fill='#69827B')
dr.text((60,143),'DARK MODE',font=font,fill='#225E50'); dr.text((555,143),'LIGHT MODE',font=font,fill='#225E50')
for i,(slug,name,fn,usage) in enumerate(ASSETS):
 y=180+i*319
 for j,theme in enumerate(['dark','light']):
  im=Image.open(ROOT/'png'/theme/(slug+'.png')).convert('RGB').resize((thumb_w,thumb_h),Image.Resampling.LANCZOS)
  x=56+j*493
  out.paste(im,(x,y+3));
  dr.rounded_rectangle((x-2,y+1,x+thumb_w+2,y+thumb_h+5),radius=10,outline='#BDD2CA',width=2)
 dr.text((56,y+279),name,font=font,fill='#122F27')
 dr.text((555,y+279),slug,font=small,fill='#41685D')
rootprev=ROOT/'preview'/'Depth_Section_Illustrations_Overview.png'; out.save(rootprev,optimize=True)

readme='''# Depth — Website Section Illustrations

This package contains *section illustrations only*, not a redesign of the Depth marketing page. The assets are inspired by Mintlify's restrained product-marketing art direction and adapted for mechanical engineering, drawing workflows, and customer-controlled deployment. All imagery is original to Depth.

## Files

- `svg/dark/` — editable vector illustrations on dark matching background (1200 × 800 viewBox)
- `svg/light/` — editable vector illustrations on light matching background (1200 × 800 viewBox)
- `png/dark/` and `png/light/` — high-resolution 2400 × 1600 PNG exports
- `preview/` — overview sheet of all 9 illustrated sections
- `manifest.json` — file names, mapping, and descriptions
- `extras/` — optional high-resolution transparent AI-rendered floating CAD plate artwork

Each illustration is designed to sit beside or above HTML copy, rather than containing your page headlines. The SVG is the recommended format for websites.

## Section mapping
'''
for slug,name,fn,usage in ASSETS:
 readme+=f'- **{name}:** `{slug}.svg` — {usage}\n'
readme+='''
## Drop into Cursor / React

1. Copy `svg/` to your website's `public/illustrations/` folder.
2. Use your existing section components, text, spacing, and typography. Only replace the illustration artwork.
3. Use the dark or light SVG based on your theme. Example JSX:

```jsx
<picture>
  <source media="(prefers-color-scheme: dark)" srcSet="/illustrations/dark/06-private-deployment.svg" />
  <img src="/illustrations/light/06-private-deployment.svg"
       alt="Diagram of Depth inside a customer-controlled environment"
       width="1200" height="800" loading="lazy"
       style={{width: '100%', height: 'auto', borderRadius: 20}} />
</picture>
```

If your site has a manual theme toggle, choose a file path using the same theme state rather than `prefers-color-scheme`.

## Content and security accuracy

These visuals are **illustrative concepts**, not proof of shipped product capabilities. The review queue is the pilot focus; AI checking and 3D-to-2D generation are planned. The private-deployment illustration expresses the intended architecture, not a completed compliance certification or verified no-egress guarantee. Keep corresponding copy qualified until product implementation and customer tests confirm it.

## Design system

- Accent: mint-teal (#16E3BA dark; #009D82 light)
- Backgrounds: #0B1011 dark, #F6F9F8 light
- Thin engineering linework, restrained gradients, no embedded marketing headlines
- Inter for tiny illustrative UI labels, DejaVu Sans Mono for drawing annotations

Source generator: `build.py`; can be rerun with Python + cairosvg + Pillow.
'''
(ROOT/'README.md').write_text(readme)
print('DONE',rootprev)
