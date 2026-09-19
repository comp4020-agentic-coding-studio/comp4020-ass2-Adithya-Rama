"""Read-only PNG pixel analysis for the paused-scene acceptance trace."""
import struct,zlib,pathlib,json
root=pathlib.Path(__file__).resolve().parents[1]
def png(data):
 pos=8;parts=[]
 while pos<len(data):
  n=struct.unpack('>I',data[pos:pos+4])[0];kind=data[pos+4:pos+8];chunk=data[pos+8:pos+8+n];pos+=12+n
  if kind==b'IHDR': w,h,depth,colour,_,_,interlace=struct.unpack('>IIBBBBB',chunk)
  if kind==b'IDAT':parts.append(chunk)
 assert depth==8 and colour in (2,6) and not interlace,(depth,colour,interlace)
 bpp=3 if colour==2 else 4;stride=w*bpp;raw=zlib.decompress(b''.join(parts));out=bytearray(w*h*bpp)
 for y in range(h):
  kind=raw[y*(stride+1)];line=raw[y*(stride+1)+1:(y+1)*(stride+1)];offset=y*stride
  for x,value in enumerate(line):
   left=out[offset+x-bpp] if x>=bpp else 0;above=out[offset+x-stride] if y else 0;corner=out[offset+x-stride-bpp] if y and x>=bpp else 0
   if kind==1:value+=left
   elif kind==2:value+=above
   elif kind==3:value+=(left+above)//2
   elif kind==4:
    p=left+above-corner;a,b,c=abs(p-left),abs(p-above),abs(p-corner)
    value+=left if a<=b and a<=c else above if b<=c else corner
   out[offset+x]=value&255
 return w,h,bpp,out
frames=[(root/f'docs/evidence/paused-{i}.png').read_bytes() for i in range(2)]
w,h,bpp,a=png(frames[0]);w2,h2,bpp2,b=png(frames[1]);assert (w,h,bpp)==(w2,h2,bpp2)
diffs=[]
for y in range(h):
 for x in range(w):
  i=(y*w+x)*bpp
  if a[i:i+bpp]!=b[i:i+bpp]:diffs.append((x,y,list(a[i:i+bpp]),list(b[i:i+bpp])))
print(json.dumps({'width':w,'height':h,'differentPixels':len(diffs),'bbox':[min(p[0] for p in diffs),min(p[1] for p in diffs),max(p[0] for p in diffs),max(p[1] for p in diffs)] if diffs else None,'samples':diffs[:20]},indent=2))

print(json.dumps({'maxChannelDifference':max((max(abs(x-y) for x,y in zip(p[2],p[3])) for p in diffs),default=0),'rows':{str(y):sum(1 for p in diffs if p[1]==y) for y in sorted(set(p[1] for p in diffs))}},indent=2))
