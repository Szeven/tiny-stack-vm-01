import{readdirSync,readFileSync,writeFileSync,mkdirSync}from"node:fs";
import{join}from"node:path";
function run(p:Uint8Array,i:Uint8Array):[Uint8Array,number]{
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
let sp=0,cp=0,pc=0,s=0,ip=0,ol=0;
const T=(c:number):[Uint8Array,number]=>[O.subarray(0,ol),c];
for(;;){
if(s===1e6)return T(10);
if(pc<0||pc>=p.length)return T(9);
const o=p[pc];let im=0;
if(o===1)im=1;else if(o===2)im=4;else if(o>47&&o<52)im=2;
else if(o>7&&!(o>15&&o<31)&&!(o>31&&o<35)&&!(o>47&&o<53)&&!(o>63&&o<66)&&!(o>79&&o<84))return T(5);
if(pc+im>=p.length)return T(9);
s++;const nx=pc+1+im;pc=nx;
if(o<8){
if(o===0)return T(0);
if(o===1){if(sp>255)return T(3);D[sp++]=(p[nx-1]<<24)>>24;}
else if(o===2){if(sp>255)return T(3);D[sp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;}
else if(o===3){if(sp<1)return T(2);sp--;}
else if(o===4){if(sp<1)return T(2);if(sp>255)return T(3);D[sp]=D[sp-1];sp++;}
else if(o===5){if(sp<2)return T(2);const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;}
else if(o===6){if(sp<2)return T(2);if(sp>255)return T(3);D[sp]=D[sp-2];sp++;}
else{if(sp<3)return T(2);const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;}
}else if(o===0x17){if(sp<1)return T(2);D[sp-1]=-D[sp-1]|0;}
else if(o===0x1b){if(sp<1)return T(2);D[sp-1]=~D[sp-1];}
else if(o>=0x10&&o<=0x22){
if(sp<2)return T(2);const b=D[sp-1],a=D[sp-2];let r=0;
if(o===0x10)r=(a+b)|0;
else if(o===0x11)r=(a-b)|0;
else if(o===0x12)r=Math.imul(a,b);
else if(o===0x13){if(b===0)return T(4);r=(a/b)|0;}
else if(o===0x14){if(b===0)return T(4);r=(a%b)|0;}
else if(o===0x15){if(b===0)return T(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(o===0x16){if(b===0)return T(4);r=((a>>>0)%(b>>>0))|0;}
else if(o===0x18)r=a&b;
else if(o===0x19)r=a|b;
else if(o===0x1a)r=a^b;
else if(o===0x1c)r=a<<(b&31);
else if(o===0x1d)r=a>>(b&31);
else if(o===0x1e)r=(a>>>(b&31))|0;
else if(o===0x20)r=a===b?1:0;
else if(o===0x21)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
sp-=2;D[sp++]=r;
}else if(o<0x33){
const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
if(o===0x30)pc=nx+rel;
else{if(sp<1)return T(2);const v=D[--sp];if((o===0x31)===(v===0))pc=nx+rel;}
}else if(o===0x33){if(cp>63)return T(7);C[cp++]=nx;pc=p[nx-2]|p[nx-1]<<8;}
else if(o===0x34){if(cp===0)return T(8);pc=C[--cp];}
else if(o===0x40){if(sp<1)return T(2);const a=D[sp-1];if(a<0||a>255)return T(6);D[sp-1]=M[a];}
else if(o===0x41){if(sp<2)return T(2);const a=D[sp-1];if(a<0||a>255)return T(6);sp-=2;M[a]=D[sp];}
else if(o===0x50){if(sp<1)return T(2);const t=String(D[sp-1]);if(ol+t.length>65536)return T(11);sp--;for(let k=0;k<t.length;k++)O[ol++]=t.charCodeAt(k);}
else if(o===0x51){if(sp<1)return T(2);if(ol>65535)return T(11);O[ol++]=D[--sp]&255;}
else if(o===0x52){if(sp>255)return T(3);D[sp++]=ip<i.length?i[ip++]:-1;}
else{if(sp<1)return T(2);return T(D[--sp]&255);}
}
}
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const id of readdirSync(I).sort()){
const r=run(readFileSync(join(I,id,"program.bin")),readFileSync(join(I,id,"input.bin")));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,"stdout.bin"),r[0]);
writeFileSync(join(O,id,"exit.txt"),r[1]+"\n");
}
