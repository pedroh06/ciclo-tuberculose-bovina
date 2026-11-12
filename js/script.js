(function(){
  "use strict";
  const SVGNS = "http://www.w3.org/2000/svg";
  const DUR = 60000;
  const anims = [];
  const $ = id => document.getElementById(id);

  function A(el, kf, opt){
    const a = el.animate(kf, Object.assign({fill:"both", easing:"ease-in-out"}, opt));
    a.pause();
    anims.push(a);
    return a;
  }
  function mk(parent, x, y, s, href){
    const outer = document.createElementNS(SVGNS, "g");
    outer.setAttribute("transform", `translate(${x},${y}) scale(${s})`);
    const inner = document.createElementNS(SVGNS, "g");
    inner.setAttribute("class","an");
    inner.setAttribute("opacity","0");
    const u = document.createElementNS(SVGNS, "use");
    u.setAttribute("href", href || "#bac");
    inner.appendChild(u);
    outer.appendChild(inner);
    parent.appendChild(outer);
    return inner;
  }

  // ------- cenas: visibilidade -------
  const SCENES = [
    {id:"s1", t0:0,     t1:6000,  nome:"Abertura"},
    {id:"s2", t0:6000,  t1:17000, nome:"Chegada ao rebanho"},
    {id:"s3", t0:17000, t1:28000, nome:"Dentro do bovino"},
    {id:"s4", t0:28000, t1:39000, nome:"Saída da bactéria"},
    {id:"s5", t0:39000, t1:51000, nome:"Chegada ao ser humano"},
    {id:"s6", t0:51000, t1:60000, nome:"Como interromper"}
  ];
  SCENES.forEach((s,i)=>{
    const el = $(s.id), d = s.t1 - s.t0;
    const kf = [
      {opacity: i===0 ? 1 : 0},
      {opacity:1, offset: Math.min(400/d, .08)},
      {opacity:1, offset: 1 - Math.min(400/d, .08)},
      {opacity: i===SCENES.length-1 ? 1 : 0}
    ];
    A(el, kf, {delay:s.t0, duration:d, easing:"linear"});
  });

  // ------- legendas -------
  const CUES = [
    [0,     6000,  "A tuberculose bovina é causada pela bactéria <i>Mycobacterium bovis</i>."],
    [6000,  11500, "Tudo começa quando um animal infectado entra no rebanho."],
    [11500, 17000, "Pela tosse, pelo ar e pela água compartilhada, a bactéria passa para outros bovinos."],
    [17000, 22500, "No animal, os bacilos se alojam nos pulmões e nos linfonodos."],
    [22500, 28000, "Ali formam granulomas — os “tubérculos” que dão nome à doença."],
    [28000, 33500, "A bactéria sai do bovino principalmente pela tosse e pelas secreções respiratórias…"],
    [33500, 39000, "…e também pelo leite, quando o úbere está infectado."],
    [39000, 44500, "No ser humano, a infecção chega pelo ar, no contato próximo com animais infectados…"],
    [44500, 51000, "…e pelo leite cru e seus derivados não pasteurizados — queijos, principalmente."],
    [51000, 60000, "Pasteurizar o leite, testar o rebanho (PNCEBT) e inspecionar a carne interrompem o ciclo."]
  ];

  // ------- cena 1 -------
  A($("s1title"), [{opacity:0, transform:"scale(.96)"},{opacity:1, transform:"scale(1)"}], {delay:300, duration:900});
  A($("s1bac"),  [{opacity:0, transform:"scale(.3) rotate(-80deg)"},{opacity:1, transform:"scale(1) rotate(0deg)"}], {delay:1500, duration:1000});
  A($("s1bac"),  [{transform:"translateY(0)"},{transform:"translateY(-7px)"},{transform:"translateY(0)"}], {delay:2600, duration:1600, iterations:2, composite:"add"});
  A($("s1name"), [{opacity:0},{opacity:1}], {delay:2100, duration:700});

  // ------- cena 2 -------
  A($("s2walker"), [
    {transform:"translateX(1120px)"},
    {transform:"translateX(698px) translateY(0px)", offset:.96},
    {transform:"translateX(698px)"}
  ], {delay:6400, duration:3800, easing:"ease-out"});

  const puffs = $("s2puffs");
  [[10600,-158,14],[11100,-176,4],[11600,-150,22],[12600,-168,10],[13100,-182,18],[13600,-154,2]].forEach(p=>{
    const g = mk(puffs, 598, 360, .5);
    A(g, [
      {opacity:0, transform:"translate(0,0)"},
      {opacity:1, transform:`translate(${p[1]*0.35}px, ${p[2]*0.3}px)`, offset:.25},
      {opacity:0, transform:`translate(${p[1]}px, ${p[2]}px)`}
    ], {delay:p[0], duration:1700, easing:"ease-out"});
  });
  const drop = mk(puffs, 598, 360, .5);
  A(drop, [
    {opacity:0, transform:"translate(0,0)"},
    {opacity:1, transform:"translate(-34px,20px)", offset:.3},
    {opacity:0, transform:"translate(-70px,76px)"}
  ], {delay:14100, duration:1500, easing:"ease-in"});
  A($("s2water"), [{opacity:0},{opacity:.4},{opacity:.28}], {delay:15300, duration:1400});

  // ------- cena 3 -------
  A($("s3link"),   [{opacity:0},{opacity:1}], {delay:17600, duration:600});
  A($("s3circle"), [{opacity:0, transform:"scale(.85)"},{opacity:1, transform:"scale(1)"}], {delay:17900, duration:800});
  const s3bacs = $("s3bacs");
  [[18800,[676,152],[648,236]],[19500,[676,152],[706,232]],[20200,[676,152],[664,268]]].forEach(b=>{
    const g = mk(s3bacs, b[1][0], b[1][1], .55);
    A(g, [
      {opacity:0, transform:"translate(0,0) rotate(90deg)"},
      {opacity:1, transform:"translate(0,14px) rotate(90deg)", offset:.2},
      {opacity:1, transform:`translate(${b[2][0]-b[1][0]}px, ${b[2][1]-b[1][1]}px) rotate(20deg)`}
    ], {delay:b[0], duration:1800, easing:"ease-in-out"});
  });
  const s3gran = $("s3gran");
  [[21800,642,228,9],[22600,712,226,10],[23400,650,272,8],[24200,704,274,9],[25000,676,296,7]].forEach(gr=>{
    const outer = document.createElementNS(SVGNS,"g");
    outer.setAttribute("transform",`translate(${gr[1]},${gr[2]})`);
    const inner = document.createElementNS(SVGNS,"g");
    inner.setAttribute("class","an"); inner.setAttribute("opacity","0");
    const c1 = document.createElementNS(SVGNS,"circle");
    c1.setAttribute("r",gr[3]); c1.setAttribute("fill","#E9B44C");
    c1.setAttribute("stroke","#B07F1F"); c1.setAttribute("stroke-width","2.5");
    inner.appendChild(c1); outer.appendChild(inner); s3gran.appendChild(outer);
    A(inner, [{opacity:0, transform:"scale(.2)"},{opacity:1, transform:"scale(1.18)", offset:.7},{opacity:1, transform:"scale(1)"}], {delay:gr[0], duration:900, easing:"ease-out"});
  });

  // ------- cena 4 -------
  const s4air = $("s4air");
  [[29000,250,-128],[29700,268,-152],[30400,236,-108],[31100,262,-170],[31800,246,-140]].forEach(p=>{
    const g = mk(s4air, 352, 356, .6);
    A(g, [
      {opacity:0, transform:"translate(0,0) rotate(-10deg)"},
      {opacity:1, transform:`translate(${p[1]*0.3}px, ${p[2]*0.3}px) rotate(10deg)`, offset:.25},
      {opacity:.95, transform:`translate(${p[1]}px, ${p[2]}px) rotate(-6deg)`, offset:.85},
      {opacity:0, transform:`translate(${p[1]+26}px, ${p[2]-14}px) rotate(-6deg)`}
    ], {delay:p[0], duration:2600, easing:"ease-out"});
  });
  A($("s4lblAr"), [{opacity:0},{opacity:1}], {delay:30200, duration:700});
  const s4drops = $("s4drops");
  [[33200],[33900],[34600]].forEach(d=>{
    const outer = document.createElementNS(SVGNS,"g");
    outer.setAttribute("transform","translate(214,436)");
    const inner = document.createElementNS(SVGNS,"g");
    inner.setAttribute("class","an"); inner.setAttribute("opacity","0");
    const c = document.createElementNS(SVGNS,"circle");
    c.setAttribute("r","5.5"); c.setAttribute("fill","#FFFFFF");
    inner.appendChild(c); outer.appendChild(inner); s4drops.appendChild(outer);
    A(inner, [{opacity:0, transform:"translateY(0)"},{opacity:1, transform:"translateY(8px)", offset:.3},{opacity:0, transform:"translateY(28px)"}], {delay:d[0], duration:800, easing:"ease-in"});
  });
  A($("s4bmilk"), [{opacity:0},{opacity:1}], {delay:34200, duration:600});
  A($("s4ride"), [
    {opacity:0, transform:"translate(214px,440px)"},
    {opacity:1, transform:"translate(214px,432px)", offset:.12},
    {opacity:1, transform:"translate(430px,380px)", offset:.6},
    {opacity:1, transform:"translate(648px,414px)", offset:.94},
    {opacity:0, transform:"translate(650px,420px)"}
  ], {delay:35000, duration:2400, easing:"ease-in-out"});
  A($("s4lblLeite"), [{opacity:0},{opacity:1}], {delay:35600, duration:700});

  // ------- cena 5 -------
  const s5air = $("s5air");
  [[40200,110,-24],[40900,122,-16],[41600,104,-30]].forEach(p=>{
    const g = mk(s5air, 238, 398, .45);
    A(g, [
      {opacity:0, transform:"translate(0,0)"},
      {opacity:1, transform:`translate(${p[1]*0.35}px, ${p[2]*0.4}px)`, offset:.3},
      {opacity:0, transform:`translate(${p[1]}px, ${p[2]}px)`}
    ], {delay:p[0], duration:1600, easing:"ease-out"});
  });
  A($("s5lblAr"), [{opacity:0},{opacity:1}], {delay:41200, duration:700});
  A($("s5sip"), [
    {opacity:0, transform:"translate(684px,396px)"},
    {opacity:1, transform:"translate(692px,384px)", offset:.4},
    {opacity:0, transform:"translate(716px,372px)"}
  ], {delay:45200, duration:1500, easing:"ease-in-out"});
  A($("s5lblLeite"), [{opacity:0},{opacity:1}], {delay:45800, duration:700});
  A($("s5human"), [{opacity:0, transform:"scale(.9)"},{opacity:1, transform:"scale(1)"}], {delay:46800, duration:800});
  A($("s5land"), [{opacity:0, transform:"translateY(-26px)"},{opacity:1, transform:"translateY(0)"}], {delay:47800, duration:900, easing:"ease-in"});
  A($("s5pulse"), [
    {opacity:0, transform:"scale(.4)"},
    {opacity:.9, transform:"scale(1)", offset:.3},
    {opacity:0, transform:"scale(1.9)"}
  ], {delay:48800, duration:1300, iterations:2, easing:"ease-out"});

  // ------- cena 6 -------
  A($("s6a"), [{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0)"}], {delay:51500, duration:700});
  A($("s6b"), [{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0)"}], {delay:52600, duration:700});
  A($("s6c"), [{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0)"}], {delay:53700, duration:700});
  const steam = $("s6steam");
  [[-14],[0],[14]].forEach((sx,i)=>{
    const outer = document.createElementNS(SVGNS,"g");
    outer.setAttribute("transform",`translate(${sx[0]},-20)`);
    const inner = document.createElementNS(SVGNS,"g");
    inner.setAttribute("class","an"); inner.setAttribute("opacity","0");
    const path = document.createElementNS(SVGNS,"path");
    path.setAttribute("d","M0,0 q5,-7 0,-14 q-5,-7 0,-14");
    path.setAttribute("stroke","#DCE9EF"); path.setAttribute("stroke-width","4.5");
    path.setAttribute("fill","none"); path.setAttribute("stroke-linecap","round");
    inner.appendChild(path); outer.appendChild(inner); steam.appendChild(outer);
    A(inner, [
      {opacity:0, transform:"translateY(6px)"},
      {opacity:.95, transform:"translateY(-4px)", offset:.4},
      {opacity:0, transform:"translateY(-16px)"}
    ], {delay:52200 + i*220, duration:1700, iterations:4, easing:"ease-in-out"});
  });
  A($("s6end"), [{opacity:0, transform:"scale(.94)"},{opacity:1, transform:"scale(1)"}], {delay:56600, duration:900});

  // ------- relógio-mestre e controles -------
  const refEl = document.createElement("span");
  document.body.appendChild(refEl);
  const ref = A(refEl, [{opacity:0},{opacity:0}], {duration:DUR, easing:"linear"});

  const cap = $("cap"), seek = $("seek"), timeLbl = $("timeLbl");
  const btnPlay = $("btnPlay"), btnRestart = $("btnRestart");
  const poster = $("poster"), posterLbl = $("posterLbl");
  const chaptersBox = $("chapters");
  let playing = false, raf = null;

  const chapBtns = SCENES.map((s,i)=>{
    const b = document.createElement("button");
    b.type = "button"; b.className = "chap";
    b.textContent = (i+1) + ". " + s.nome;
    b.addEventListener("click", ()=>{ seekTo(s.t0 + 10); if(!playing) play(); });
    chaptersBox.appendChild(b);
    return b;
  });

  function fmt(ms){
    const s = Math.min(60, Math.round(ms/1000));
    return "0:" + String(s).padStart(2,"0");
  }
  function updateUI(t){
    seek.value = Math.round(t);
    timeLbl.textContent = fmt(t) + " / 1:00";
    let txt = "";
    for(const c of CUES){ if(t >= c[0] && t < c[1]) { txt = c[2]; break; } }
    if(t >= DUR) txt = CUES[CUES.length-1][2];
    if(cap.dataset.txt !== txt){
      cap.dataset.txt = txt;
      cap.innerHTML = txt;
      cap.classList.toggle("on", !!txt);
    }
    chapBtns.forEach((b,i)=>{
      b.classList.toggle("on", t >= SCENES[i].t0 && (i === SCENES.length-1 ? t <= DUR : t < SCENES[i].t1));
    });
  }
  function tick(){
    const t = Number(ref.currentTime) || 0;
    updateUI(t);
    if(t >= DUR - 16){ finish(); return; }
    if(playing) raf = requestAnimationFrame(tick);
  }
  function play(){
    let t = Number(ref.currentTime) || 0;
    if(t >= DUR) seekTo(0);
    anims.forEach(a=>a.play());
    playing = true;
    btnPlay.textContent = "Pausar";
    poster.hidden = true;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }
  function pause(){
    anims.forEach(a=>a.pause());
    playing = false;
    btnPlay.textContent = "Reproduzir";
    cancelAnimationFrame(raf);
  }
  function finish(){
    anims.forEach(a=>{ a.pause(); a.currentTime = DUR; });
    playing = false;
    btnPlay.textContent = "Reproduzir";
    posterLbl.textContent = "Assistir novamente";
    poster.hidden = false;
    updateUI(DUR);
    cancelAnimationFrame(raf);
  }
  function seekTo(t){
    t = Math.max(0, Math.min(DUR, t));
    anims.forEach(a=>{ a.currentTime = t; });
    if(t < DUR) poster.hidden = playing || t > 0 ? true : poster.hidden;
    updateUI(t);
  }

  btnPlay.addEventListener("click", ()=> playing ? pause() : play());
  btnRestart.addEventListener("click", ()=>{ seekTo(0); play(); });
  poster.addEventListener("click", ()=>{ if((Number(ref.currentTime)||0) >= DUR) seekTo(0); play(); });
  seek.addEventListener("input", ()=>{ poster.hidden = true; seekTo(Number(seek.value)); });
  document.addEventListener("keydown", e=>{
    if(e.target === seek) return;
    if(e.code === "Space"){ e.preventDefault(); playing ? pause() : play(); }
    if(e.code === "ArrowRight"){ seekTo((Number(ref.currentTime)||0) + 5000); }
    if(e.code === "ArrowLeft"){ seekTo((Number(ref.currentTime)||0) - 5000); }
  });

  seekTo(0);
  updateUI(0);
})();
