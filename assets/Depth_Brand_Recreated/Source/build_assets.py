#!/usr/bin/env python3
"""Depth branded visual assets — consistent vector-generated master assets.
Outputs raster PNG at specified pixel sizes plus editable SVGs.
"""
from pathlib import Path
import html, math, os, subprocess, json, random
from PIL import Image,ImageDraw,ImageFont,ImageOps
ROOT=Path(__file__).resolve().parents[1]
MINT='#00E6B8'; MINT_LIGHT='#6AF8D7'; DEEP='#041C1B'; NIGHT='#020D10'; TEAL='#008C78'; WHITE='#FAFFFF'; MUTED='#A8C7C3'
font_family='Inter'

DEFS='''<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#020D10"/><stop offset="53%" stop-color="#06221F"/><stop offset="100%" stop-color="#001310"/></linearGradient>
  <radialGradient id="glowbg" cx="49%" cy="88%" r="78%"><stop offset="0%" stop-color="#007D65" stop-opacity=".67"/><stop offset="40%" stop-color="#006751" stop-opacity=".13"/><stop offset="100%" stop-color="#001914" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowbg2" cx="88%" cy="7%" r="60%"><stop offset="0%" stop-color="#00C49D" stop-opacity=".27"/><stop offset="100%" stop-color="#00D8AA" stop-opacity="0"/></radialGradient>
  <linearGradient id="mint" x1=".02" y1="0" x2=".9" y2="1"><stop offset="0%" stop-color="#7DFFE0"/><stop offset="40%" stop-color="#2BF3C8"/><stop offset="100%" stop-color="#00B990"/></linearGradient>
  <linearGradient id="mintTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8FFFE5"/><stop offset="55%" stop-color="#31E7BC"/><stop offset="100%" stop-color="#00A982"/></linearGradient>
  <linearGradient id="mintLower" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#00FFD0"/><stop offset="45%" stop-color="#00EDC0"/><stop offset="100%" stop-color="#0C9E84"/></linearGradient>
  <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0CF9C7"/><stop offset="20%" stop-color="#00CDA8"/><stop offset="75%" stop-color="#00675C"/><stop offset="100%" stop-color="#02322C"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00483E" stop-opacity=".9"/><stop offset="45%" stop-color="#04231F" stop-opacity=".87"/><stop offset="100%" stop-color="#001510" stop-opacity=".93"/></linearGradient>
  <linearGradient id="glassedge" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#34F6D1"/><stop offset="60%" stop-color="#9BFFE9"/><stop offset="100%" stop-color="#20C9A4"/></linearGradient>
  <linearGradient id="whitefade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D6F8F2"/></linearGradient>
  <pattern id="grid" width="65" height="65" patternUnits="userSpaceOnUse"><path d="M65 0H0V65" stroke="#13C3A4" stroke-width="1" stroke-opacity=".10" fill="none"/></pattern>
  <pattern id="gridSmall" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="#18D5B0" stroke-width=".8" stroke-opacity=".12" fill="none"/></pattern>
  <filter id="mintGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="18"/></filter>
  <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="drop" x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#00D6AE" flood-opacity=".16"/></filter>
  <clipPath id="circleClip"><circle cx="512" cy="512" r="484"/></clipPath>
</defs>'''

def esc(s):return html.escape(str(s))
def doc(w,h,body,transparent=False):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img">{DEFS}{body}</svg>'

def bg(w,h,grid=True,tech=True):
    s=f'<rect width="{w}" height="{h}" fill="url(#bg)"/><rect width="{w}" height="{h}" fill="url(#glowbg)"/><rect width="{w}" height="{h}" fill="url(#glowbg2)"/>'
    if grid:s+=f'<rect width="{w}" height="{h}" fill="url(#grid)" opacity=".52"/>'
    if tech:
        s+=f'<path d="M0 {h*.81:.0f}H{w} M0 {h*.86:.0f}H{w} M0 {h*.93:.0f}H{w}" stroke="#06A88F" stroke-opacity=".12"/>'
    return s

# Exact mark is an independently redrawn vector interpretation of the image the user selected.
MARK='''<g>
<path d="M67 0 H172 C244 0 290 43 290 103 C290 187 231 248 137 262 H0 L39 155 H168 C196 155 212 140 212 116 C212 99 196 93 172 93 H34 Z" fill="url(#mintTop)"/>
<path d="M39 155 H212 C205 200 177 251 137 262 H0 Z" fill="url(#mintLower)"/>
<path d="M34 93 H78 Q58 106 56 130 Z" fill="#037A68" opacity=".93"/>
<path d="M67 0 H172 C244 0 290 43 290 103" fill="none" stroke="#C8FFED" stroke-width="1.1" stroke-opacity=".46"/>
</g>'''

def mark(x,y,size,mono=False):
    # mark naturally 290x262, occupy square size maintaining proportions
    scale=size/290
    if mono:
        return f'<g transform="translate({x:.1f},{y:.1f}) scale({scale:.5f})"><path d="M67 0 H172 C244 0 290 43 290 103 C290 187 231 248 137 262 H0 L39 155 H168 C196 155 212 140 212 116 C212 99 196 93 172 93 H34 Z" fill="white"/></g>'
    return f'<g transform="translate({x:.1f},{y:.1f}) scale({scale:.5f})">{MARK}</g>'

def wordmark(x,y,size,color='white',weight=750):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-family="Inter, Arial, sans-serif" font-size="{size:.1f}" font-weight="{weight}" letter-spacing="-{size*.055:.2f}" fill="{color}">depth</text>'

def lockup(x,y,icon_size=58,mode='dark'):
    c='#FFFFFF' if mode=='dark' else '#071F20'
    return mark(x,y,icon_size)+wordmark(x+icon_size+15,y+icon_size*.81,icon_size*.69,c)

def txt(x,y,s,size=34,color='white',weight=700,ls=None,opacity=1):
    a=f' letter-spacing="{ls}"' if ls is not None else ''
    return f'<text x="{x}" y="{y}" font-family="Inter,Arial,sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}" opacity="{opacity}"{a}>{esc(s)}</text>'

def lines(x,y,arr,size=56,leading=1.12,color='white',weight=740):
    return ''.join(txt(x,y+i*size*leading,v,size,color,weight,-size*.038) for i,v in enumerate(arr))

def icon_check(x,y,s=28,color=MINT):
    k=s/32; return f'<g transform="translate({x},{y}) scale({k})"><circle cx="16" cy="16" r="14" stroke="{color}" stroke-width="2" fill="none"/><path d="M8 16l6 6L25 10" stroke="{color}" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>'

def icon_layers(x,y,s=30,color=MINT):
    k=s/34;return f'<g transform="translate({x},{y}) scale({k})" stroke="{color}" stroke-width="2" fill="none" stroke-linejoin="round"><path d="M2 12l15-9 15 9-15 9Z"/><path d="M2 18l15 9 15-9M2 24l15 9 15-9"/></g>'

def icon_bolt(x,y,s=28,color=MINT):
    k=s/32;return f'<g transform="translate({x},{y}) scale({k})" stroke="{color}" stroke-width="2.5" fill="none" stroke-linejoin="round"><path d="M18 2L5 19h10l-2 12 14-18H17Z"/></g>'

def icon_target(x,y,s=28,color=MINT):
    k=s/32;return f'<g transform="translate({x},{y}) scale({k})" stroke="{color}" stroke-width="2.1" fill="none"><circle cx="16" cy="16" r="7"/><path d="M3 10V6q0-3 3-3h4m12 0h4q3 0 3 3v4M29 22v4q0 3-3 3h-4M10 29H6q-3 0-3-3v-4"/></g>'

def icon_shield(x,y,s=28,color=MINT):
    k=s/32;return f'<g transform="translate({x},{y}) scale({k})" stroke="{color}" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M16 2 29 8v9q0 8-13 14Q3 25 3 17V8Z"/><path d="m10 16 4 4 8-9"/></g>'

def feature_row(x,y,scale=1):
    fs=23*scale; gap=292*scale
    items=[(icon_check,'Find issues'),(icon_layers,'Verify revisions'),(icon_bolt,'Enforce guidelines')]
    b=''
    for i,(fn,lab) in enumerate(items):
        xx=x+gap*i; b+=fn(xx,y-25*scale,30*scale)+txt(xx+41*scale,y,lab,fs,WHITE,520)
        if i<2:b+=f'<line x1="{xx+255*scale}" y1="{y-24*scale}" x2="{xx+255*scale}" y2="{y+6*scale}" stroke="{MINT}" stroke-opacity=".5"/>'
    return b

def ribbon(w,h,scale=1,dx=0,dy=0,alpha=1):
    # two large abstract folded geometry slabs, like the user-provided sample
    return f'''<g transform="translate({dx},{dy}) scale({scale})" opacity="{alpha}">
    <path d="M0 0 H260 Q290 0 311 26 L480 205 H330 L98 68 Q56 30 0 30 Q-25 20 0 0Z" fill="#00D5AD" opacity=".17" filter="url(#mintGlow)"/>
    <path d="M0 0 H260 Q290 0 311 26 L480 205 H330 L98 68 Q56 30 0 30 Q-25 20 0 0Z" fill="url(#ribbon)" stroke="#00E9C6" stroke-width="2"/>
    <path d="M360 -13 H610 Q645 -13 668 10 L854 208 H699 L490 69 Q450 26 360 20 Q338 6 360 -13Z" fill="url(#ribbon)" stroke="#00ECC2" stroke-width="2"/>
    <path d="M0 0 H260 Q290 0 311 26" fill="none" stroke="#AAFFEB" stroke-opacity=".46" stroke-width="2"/>
    </g>'''

def cad_panel(x,y,w,h,rot=0,opacity=1,show_labels=True):
    # draw full self-contained engineering plate with correct line/dimension geometry
    sx=w/640; sy=h/450
    content=f'''<g transform="translate({x},{y}) rotate({rot}) scale({sx:.5f},{sy:.5f})" opacity="{opacity}">
    <rect x="0" y="0" width="640" height="450" rx="22" fill="url(#glass)" stroke="#31F6CF" stroke-width="2.5" filter="url(#drop)"/>
    <rect x="22" y="22" width="596" height="406" rx="4" stroke="#9EFFEA" stroke-width="1" opacity=".3" fill="url(#gridSmall)"/>
    <g stroke="#D6FFF9" fill="none" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M145 292 L175 176 Q180 168 199 168 H232 Q261 166 271 142 L282 120 Q299 85 337 88 Q370 92 381 121 L390 154 Q395 174 417 174 H498 L505 292 Z"/>
      <circle cx="334" cy="148" r="29"/><circle cx="334" cy="148" r="16" stroke-width="1.4"/>
    </g>
    <g stroke="#9CE9DF" stroke-width="1.15" fill="none" opacity=".92"><path d="M334 76V223" stroke-dasharray="8 7"/><path d="M259 148H407" stroke-dasharray="8 7"/>
      <path d="M145 295V339M505 295V339M145 330H505"/>
      <path d="M145 330l12-4v8Z M505 330l-12-4v8Z" fill="#D2FFF5"/>
      <path d="M145 292H116M175 176H116M124 176V292"/>
      <path d="M124 176l-4 13h8Z M124 292l-4-13h8Z" fill="#D2FFF5"/>
      <path d="M336 115L388 63H420"/><path d="M360 137L493 52"/>
    </g>
    <g font-family="Inter,Arial,sans-serif" fill="#E6FFF9" font-size="19"><text x="298" y="320">50.8</text><text x="110" y="252" transform="rotate(-90 110 252)">25.4</text><text x="391" y="53" font-size="17">Ø10.0</text></g>
    <g transform="translate(471 34)" font-family="Inter,Arial,sans-serif" font-size="16" fill="#F0FFFC" stroke="#C7FFF4" stroke-width="1.5"><rect width="128" height="35" fill="#023A32"/><path d="M42 0V35 M88 0V35"/><text x="13" y="24" fill="white" stroke="none">⊥</text><text x="47" y="24" fill="white" stroke="none">0.1</text><text x="101" y="24" fill="white" stroke="none">A</text></g>
    <g stroke="#2AE9C0" opacity=".42"><path d="M38 373H602M38 398H602"/><path d="M38 374V428M602 374V428"/></g>
    <text x="49" y="392" fill="#9CE2D5" font-family="Inter" font-size="10" letter-spacing="2">DEPTH / ENGINEERING REVIEW</text><text x="49" y="419" fill="#D7FFF7" font-family="Inter" font-size="12" font-weight="650">MOUNTING BRACKET — REV B</text>
    </g>'''
    return content

def cad_markers(x,y,scale=1):
    b=''
    for xx,yy in [(0,0),(160,120)]:
        b+=f'<circle cx="{x+xx*scale}" cy="{y+yy*scale}" r="{28*scale}" fill="#00EEC0" opacity=".2" filter="url(#softGlow)"/><rect x="{x+(xx-17)*scale}" y="{y+(yy-17)*scale}" width="{34*scale}" height="{34*scale}" rx="{9*scale}" fill="{MINT}"/>'
        b+=f'<path d="M{x+(xx-8)*scale} {y+yy*scale} l{7*scale} {7*scale} l{13*scale} {-16*scale}" stroke="#FFF" stroke-width="{4*scale}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    return b

def type_lines(x,y,arr,size=40,color=WHITE,gap=1.15):
    return ''.join(txt(x,y+i*size*gap,s,size,color,760,-size*.04) for i,s in enumerate(arr))

items=[]
def save(folder,name,w,h,body,svg=True,png=True):
    target=ROOT/folder;target.mkdir(parents=True,exist_ok=True)
    path=target/(name+'.svg')
    path.write_text(doc(w,h,body))
    if png:
        out=target/(name+'.png')
        cmd=['inkscape',str(path),'--export-filename='+str(out),'--export-width='+str(w),'--export-height='+str(h)]
        sp=subprocess.run(cmd,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=60)
        if sp.returncode!=0: print('RENDER FAILED',path,sp.stderr.decode()[-500:]);raise RuntimeError('SVG render failed')
    if not svg:path.unlink(missing_ok=True)
    items.append((folder,name,w,h));print('done',folder,name,w,h,flush=True)

# BRAND: primary vector logo/symbol, with transparent background for seamless use
save('Brand','01-depth-mark-gradient',1024,1024,mark(70,110,890))
save('Brand','02-depth-mark-white',1024,1024,mark(70,110,890,mono=True))
save('Brand','03-depth-logo-on-dark',900,230,mark(32,29,190)+wordmark(250,176,143,'#FFFFFF'))
save('Brand','04-depth-logo-on-light',900,230,mark(32,29,190)+wordmark(250,176,143,'#071C1B'))
save('Brand','05-depth-symbol-app-icon',1024,1024,bg(1024,1024)+f'<circle cx="512" cy="512" r="435" fill="#001E19" stroke="#12EFC1" stroke-opacity=".2" stroke-width="3"/><circle cx="512" cy="512" r="420" fill="url(#grid)"/>'+mark(262,280,505))
save('Brand','06-depth-favicon',512,512, f'<rect width="512" height="512" rx="118" fill="#01221D"/>'+mark(106,119,318))
save('Brand','07-logo-horizontal-dark-background',1400,420,bg(1400,420)+mark(130,95,255)+wordmark(430,298,200,'white'))
save('Brand','08-logo-horizontal-light-background',1400,420,'<rect width="1400" height="420" fill="#FFFFFF"/>'+mark(130,95,255)+wordmark(430,298,200,'#061B19'))

# social avatar
save('LinkedIn','01-company-avatar-1024',1024,1024,bg(1024,1024)+f'<circle cx="512" cy="512" r="491" fill="#002923" stroke="{MINT}" stroke-width="3" opacity=".95"/>'+'<rect x="45" y="45" width="934" height="934" rx="465" fill="url(#grid)"/>'+mark(256,280,520))
# circular blank template with empty lower-middle reserved for portrait subject
save('LinkedIn','02-profile-background-template',1024,1024,bg(1024,1024)+f'<circle cx="512" cy="512" r="493" fill="#00352C" stroke="{MINT}" stroke-width="7"/><circle cx="512" cy="512" r="481" fill="url(#glowbg2)"/><g opacity=".17">'+ribbon(1024,1024,.78,160,435)+'</g>'+f'<circle cx="512" cy="512" r="462" fill="none" stroke="#6CFDE1" stroke-opacity=".45" stroke-width="1"/>' )

# Main LinkedIn personal banner: clear safe area bottom left where avatar overlays
W,H=1584,396
b=bg(W,H)+ribbon(W,H,.64,510,90,.50)+f'<rect x="0" y="0" width="440" height="396" fill="#000F10" opacity=".22"/>'
b+=lockup(560,45,75)+lines(560,180,['Building AI for engineering','and manufacturing'],50,1.18)+feature_row(568,345,.72)
save('LinkedIn','03-personal-banner-1584x396',W,H,b)
W,H=1584,396
b=bg(W,H)+ribbon(W,H,.75,580,78,.83)+f'<rect width="{W}" height="{H}" fill="url(#glowbg)" opacity=".4"/>'+lockup(540,55,75)+lines(540,194,['AI drawing review for','engineering teams'],50,1.16)
save('LinkedIn','04-personal-banner-alt-1584x396',W,H,b)
# company banner extremely short height. Keep safe left area for avatar overlay.
W,H=1512,256
b=bg(W,H)+ribbon(W,H,.55,870,35,.61)+lockup(280,32,67)+txt(282,163,'AI drawing review for engineering teams',42,WHITE,760,-1.7)+txt(285,207,'Find issues   •   Verify revisions   •   Enforce guidelines',22,'#BAE3DB',550)
save('LinkedIn','05-company-cover-1512x256',W,H,b)
W,H=1128,191
b=bg(W,H)+ribbon(W,H,.35,650,28,.58)+lockup(214,23,54)+txt(214,126,'AI drawing review for engineering teams',30,WHITE,760,-1)+txt(214,158,'Find issues   •   Verify revisions   •   Enforce guidelines',15,'#B5DFD5',530)
save('LinkedIn','06-company-cover-legacy-1128x191',W,H,b)

# masthead inspired by user composite: text left and CAD tilted on right
W,H=1920,490
b=bg(W,H)+ribbon(W,H,.95,990,20,.8)+cad_panel(1160,60,640,370,-5,.95)
b+=lockup(112,48,80)+lines(114,198,['AI drawing review for','engineering teams'],67,1.08)+feature_row(120,387,1.08)
save('Web','01-master-hero-banner-1920x490',W,H,b)
# website hero art with spacious text left, foreground illustrative details
W,H=1920,1080
b=bg(W,H)+ribbon(W,H,1.55,880,170,.8)+cad_panel(1030,360,750,515,-5,.95)
b+=lockup(128,94,110)+lines(130,330,['Engineering reviews,','made intelligent.'],91,1.13)+txt(134,555,'Analyze drawings. Verify revisions. Ship with confidence.',34,'#A5CEC5',520)+feature_row(132,705,1.10)
save('Web','02-homepage-hero-1920x1080',W,H,b)
W,H=1920,1080
b=bg(W,H)+ribbon(W,H,1.55,870,165,.92)+cad_panel(990,280,840,540,-6,.69)
save('Web','03-hero-background-only-1920x1080',W,H,b)
W,H=1600,900
b=bg(W,H)+ribbon(W,H,1.14,660,100,.7)+cad_panel(640,230,860,590,-5,.97)+cad_markers(1170,460,.85)
save('Web','04-cad-drawing-illustration-1600x900',W,H,b)
W,H=1920,1080
b=bg(W,H)+ribbon(W,H,1.50,1100,30,.69)+cad_panel(1130,380,730,500,-6,.80)+lockup(150,120,100)+lines(150,450,['AI engineering','drawing review'],92,1.14)+txt(154,670,'A new standard for design assurance.',35,'#A5D8CD',550)
save('Web','05-presentation-cover-1920x1080',W,H,b)
W,H=1200,300
b=bg(W,H)+ribbon(W,H,.55,690,60,.78)+lockup(60,51,94)+lines(65,193,['Smarter drawing reviews.'],40,1.12)
save('Web','06-email-signature-banner-1200x300',W,H,b)

# Social Cards
W,H=1080,1080
b=bg(W,H)+ribbon(W,H,1.0,330,664,.84)+lockup(73,66,89)+lines(76,335,['Review 2D drawings','with AI.'],84,1.10)+txt(81,578,'Find issues. Verify revisions. Enforce standards.',31,'#C3EAE2',530)
save('Social','01-product-launch-square-1080',W,H,b)
W,H=1080,1350
b=bg(W,H)+ribbon(W,H,1.07,260,760,.70)+cad_panel(285,755,700,485,-5,.86)+lockup(79,65,87)+lines(80,300,['Review engineering','drawings with AI.'],76,1.12)+txt(85,535,'Find issues before they reach production.',28,'#C0E5DD',530)
save('Social','02-linkedin-portrait-1080x1350',W,H,b)
W,H=1080,1080
b=bg(W,H)+ribbon(W,H,.86,385,460,.65)+cad_panel(410,445,605,465,-5,.95)+lockup(60,52,75)+lines(62,280,['Catch drawing','errors earlier.'],73,1.11)+txt(64,420,'Technical checks. Clear findings. Faster reviews.',26,'#BDE3DA',530)
save('Social','03-engineering-ai-square-1080',W,H,b)
# Carousel three designed separately
for idx,(headline,sub,typ) in enumerate([
 (['Review drawings','faster.'],'AI-assisted checks for engineering teams.','target'),
 (['Catch issues','before release.'],'Find missing dimensions and inconsistent callouts.','check'),
 (['Verify every','revision.'],'Know which review comments were resolved.','layers')],start=1):
 W,H=1080,1080
 b=bg(W,H)+lockup(71,63,82)+lines(73,328,headline,78,1.16)+txt(77,528,sub,25,'#B2DCD2',500)+ribbon(W,H,.89,365,640,.66)
 b+=cad_panel(465,620,525,360,-5,.87) if idx!=3 else cad_panel(468,635,530,362,3,.84)
 if idx==2:b+=cad_markers(610,753,.7)
 b+=txt(74,1025,f'0{idx} / 03',20,'#91F7DE',740,2.4)
 save('Social',f'04-carousel-slide-{idx}-1080',W,H,b)

W,H=1200,630
b=bg(W,H)+ribbon(W,H,.85,650,220,.62)+cad_panel(710,210,440,320,-5,.80)+lockup(80,73,90)+lines(80,286,['AI drawing review','for engineering teams'],65,1.15)+txt(84,517,'depth — engineering intelligence',25,'#B0D5CD',540)
save('Social','05-link-preview-1200x630',W,H,b)
W,H=1500,500
b=bg(W,H)+ribbon(W,H,.90,600,136,.70)+lockup(92,70,93)+lines(92,270,['Engineering intelligence,','from drawing to decision.'],55,1.16)
save('Social','06-social-header-1500x500',W,H,b)
# features visual matrix with clean iconic panels
W,H=1440,900
b=bg(W,H)+lockup(65,50,90)+txt(70,274,'Engineered for precision.',72,WHITE,760,-2.7)
features=[('Drawing review','Find issues',icon_target),('Revision compare','Verify updates',icon_layers),('Guideline checks','Apply standards',icon_shield),('Issue detection','Catch conflicts',icon_bolt)]
for i,(title,subtitle,icon_fn) in enumerate(features):
    xx=70+(i%2)*673;yy=340+(i//2)*241
    b+=f'<rect x="{xx}" y="{yy}" width="624" height="205" rx="27" fill="#052D2A" stroke="#00B994" stroke-opacity=".34" stroke-width="2"/>'
    b+=f'<rect x="{xx+25}" y="{yy+28}" width="104" height="104" rx="23" fill="#043B34" stroke="#27D7B2" stroke-opacity=".22"/>'
    b+=icon_fn(xx+53,yy+57,48)+txt(xx+158,yy+91,title,37,WHITE,730,-1.0)+txt(xx+159,yy+135,subtitle,22,'#A1D6CA',490)
save('Social','07-features-4-up-1440x900',W,H,b)

# Feature icons on transparencies (perfectly scalable)
for idx,(title,fn) in enumerate([('drawing-review',icon_target),('revision-compare',icon_layers),('guideline-checks',icon_shield),('issue-detection',icon_bolt)],start=1):
 W,H=512,512
 b=f'<rect x="36" y="36" width="440" height="440" rx="100" fill="#062D27" stroke="#1BECC2" stroke-opacity=".7" stroke-width="3"/>'+fn(138,138,235)
 save('Icons',f'{idx:02d}-{title}',W,H,b)

# brand colors and typography card
W,H=1440,800
b='<rect width="1440" height="800" fill="#F8FAF9"/>' +mark(76,74,88)+wordmark(185,148,77,'#071B1C')+txt(86,270,'Brand essentials',74,'#091B1A',750,-2)
colors=[('#00E6B8','Mint'),('#60F9D8','Mist'),('#009F83','Teal'),('#05312D','Forest'),('#021417','Ink'),('#FBFFFE','White')]
for i,(col,lab) in enumerate(colors):
 x=84+i*222
 b+=f'<rect x="{x}" y="344" width="193" height="191" rx="24" fill="{col}" stroke="#D9E4E0"/>'+txt(x,576,col,22,'#163733',680)+txt(x,609,lab,21,'#657873',550)
b+=txt(87,731,'Inter / Inter Display    •    Bold headlines    •    Precise engineering visuals',26,'#314946',500)
save('Brand','09-brand-style-guide-1440x800',W,H,b)

# Extra preview/source metadata
palette={
 'name':'Depth','tagline':'AI drawing review for engineering teams',
 'colors':{'mint':'#00E6B8','mist':'#60F9D8','teal':'#009F83','forest':'#05312D','ink':'#021417','white':'#FBFFFE'},
 'fonts':['Inter','Inter Display'],
 'logo_description':'Original vector recreation of the folded geometric D from the supplied reference aesthetic.'
}
(ROOT/'Brand'/'palette.json').write_text(json.dumps(palette,indent=2))
(ROOT/'Source'/'manifest.json').write_text(json.dumps([{'folder':f,'name':n,'width':w,'height':h} for f,n,w,h in items],indent=2))
print(f'OUTPUT_ASSETS {len(items)}')
