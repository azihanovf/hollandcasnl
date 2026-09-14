(()=>{
  const body=document.body;
  const menu=document.querySelector('.menu-btn');
  const nav=document.querySelector('.navlinks');
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const open=body.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Menu sluiten':'Menu openen');
      menu.textContent=open?'×':'☰';
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      body.classList.remove('menu-open');
      menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Menu openen');
      menu.textContent='☰';
    }));
  }

  let lastFocus=null;
  const openModal=id=>{
    const m=document.getElementById(id);
    if(!m)return;
    lastFocus=document.activeElement;
    m.classList.add('show');
    m.setAttribute('aria-hidden','false');
    const focusable=m.querySelector('.modal-close,button,a[href]');
    if(focusable)focusable.focus();
  };
  const closeModal=m=>{
    if(!m)return;
    m.classList.remove('show');
    m.setAttribute('aria-hidden','true');
    if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
  };
  document.querySelectorAll('[data-modal]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openModal(a.dataset.modal)}));
  document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',()=>closeModal(b.closest('.modal'))));
  document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m)}));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      document.querySelectorAll('.modal.show').forEach(closeModal);
      if(body.classList.contains('menu-open')&&menu){body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';}
    }
  });

  const cookie=document.querySelector('.cookie');
  const safeStorage={
    get(k){try{return localStorage.getItem(k)}catch(_){return null}},
    set(k,v){try{localStorage.setItem(k,v)}catch(_){}}
  };
  if(safeStorage.get('hc_cookie_ok')==='1'&&cookie)cookie.classList.add('hide');
  const accept=document.querySelector('#cookieAccept');
  if(accept)accept.addEventListener('click',()=>{safeStorage.set('hc_cookie_ok','1');if(cookie)cookie.classList.add('hide')});

  document.querySelectorAll('.faq-q').forEach(q=>{
    const item=q.closest('.faq-item');
    q.setAttribute('aria-expanded',String(item.classList.contains('open')));
    q.addEventListener('click',()=>{
      const open=item.classList.toggle('open');
      q.setAttribute('aria-expanded',String(open));
    });
  });

  const reveal=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
    reveal.forEach(el=>io.observe(el));
  }else reveal.forEach(el=>el.classList.add('visible'));
})();
