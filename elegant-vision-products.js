/* ============================================================
   ELEGANT VISION · Catálogo central (fonte única de verdade)
   ------------------------------------------------------------
   COMO OPERAR A LOJA (enquanto não há painel admin):

   1. PREÇO / NOME / DESCRIÇÃO → edite o produto abaixo.
   2. ESTOQUE → ajuste os números em `stock`. 0 = esgotado
      (o tamanho aparece riscado e desabilitado na loja).
   3. FOTOS → crie a pasta `img/` ao lado dos HTML e salve:
         img/1-1.jpg  img/1-2.jpg  img/1-3.jpg  img/1-4.jpg
      (padrão: ID-posição.jpg · proporção 3:4 · ~1200×1600px
       · WebP/JPEG < 200KB · fundo neutro claro)
      Sem foto, a loja usa o placeholder gradiente automaticamente.
   4. VARIAÇÃO DE COR (opcional) → adicione `colors` ao produto:
         colors:{Noir:'img/1-noir.webp', Champagne:'img/1-champagne.webp'}
      Os botões de cor na página do produto trocam a foto principal
      pela cor escolhida; a primeira cor listada é a foto padrão nas
      vitrines. Sem `colors`, o produto usa só as fotos por posição e
      o seletor de cor não aparece na página do produto.
      Para o tom do botão (swatch), cadastre o nome em SWATCH_COLORS
      abaixo; nomes sem entrada usam um tom neutro padrão.
   5. PRODUTO NOVO → copie um bloco, use um `id` inédito.
   6. DESTAQUE DA HOME → featured: true (máx. 4 exibidos).
   ============================================================ */
window.EV = (() => {

  const PRODUCTS = [
    {id:1, name:'Vestido Midi Aurore', category:'Vestidos', price:289.90,
     tag:'Novo', isNew:true, featured:true,
     ph:'linear-gradient(160deg,#EFE3DD,#F5EFE4 55%,#EAE0CC)',
     colors:{Noir:'img/1-noir.webp', Champagne:'img/1-champagne.webp', 'Off-White':'img/1-off-white.webp'},
     desc:'Vestido midi de modelagem evasê com decote canoa e manga 3/4. Caimento fluido que valoriza a silhueta sem marcar. Peça-chave para transitar do escritório ao jantar.',
     stock:{PP:2, P:5, M:8, G:4, GG:0}},

    {id:2, name:'Blazer Alfaiataria Noir', category:'Alfaiataria', price:349.90,
     tag:null, isNew:false, featured:true,
     ph:'linear-gradient(200deg,#EAE4D8,#F3EEE3 50%,#E6DCC8)',
     desc:'Blazer estruturado de ombros marcados e abotoamento simples, com forro acetinado champagne. Corte clássico que atravessa estações.',
     stock:{PP:1, P:3, M:6, G:5, GG:2}},

    {id:3, name:'Saia Plissada Champagne', category:'Saias', price:219.90,
     tag:'Mais vendido', isNew:false, featured:true,
     ph:'linear-gradient(140deg,#F1E8D6,#F6F1E8 60%,#E9E4D6)',
     desc:'Saia midi plissada em tecido com leve brilho acetinado. Cós alto e movimento elegante a cada passo.',
     stock:{PP:4, P:0, M:7, G:3, GG:2}},

    {id:4, name:'Blusa Seda Éclat', category:'Blusas', price:189.90,
     tag:null, isNew:false, featured:true,
     ph:'linear-gradient(185deg,#ECE6DC,#F4EFE5 55%,#E8E0D0)',
     desc:'Blusa de toque sedoso com gola degagê e punhos abotoados. Sofisticação discreta para compor looks clássicos.',
     stock:{PP:3, P:6, M:9, G:5, GG:3}},

    {id:5, name:'Vestido Longo Lumière', category:'Vestidos', price:429.90,
     tag:'Novo', isNew:true, featured:false,
     ph:'linear-gradient(170deg,#F0E4E0,#F6F0E6 60%,#EADFC9)',
     desc:'Vestido longo de alças finas com saia em viés e fenda discreta. Presença absoluta para ocasiões especiais.',
     stock:{PP:1, P:2, M:4, G:2, GG:1}},

    {id:6, name:'Calça Pantalona Rive', category:'Alfaiataria', price:279.90,
     tag:null, isNew:false, featured:false,
     ph:'linear-gradient(150deg,#EAE6DC,#F4F0E7 55%,#EBE2CE)',
     desc:'Pantalona de cintura alta com pregas frontais e caimento reto impecável. Alonga a silhueta com conforto.',
     stock:{PP:2, P:4, M:6, G:4, GG:2}},

    {id:7, name:'Saia Lápis Minuit', category:'Saias', price:199.90,
     tag:null, isNew:false, featured:false,
     ph:'linear-gradient(195deg,#EFE7D9,#F5F0E7 60%,#E7E3D8)',
     desc:'Saia lápis de comprimento midi com fenda posterior e cós anatômico. Clássico absoluto do guarda-roupa elegante.',
     stock:{PP:3, P:5, M:5, G:3, GG:0}},

    {id:8, name:'Blusa Gola Laço Perle', category:'Blusas', price:169.90,
     tag:'Novo', isNew:true, featured:false,
     ph:'linear-gradient(165deg,#EDE7DF,#F3EDE0 55%,#E9E3D3)',
     desc:'Blusa com gola laço removível e mangas amplas com punho. Romântica na medida, formal quando necessário.',
     stock:{PP:4, P:7, M:8, G:6, GG:4}},

    {id:9, name:'Camisa Alfaiataria Homme', category:'Homme', price:229.90,
     tag:null, isNew:false, featured:false,
     ph:'linear-gradient(175deg,#E8E6E0,#F2F0EA 70%)',
     desc:'Camisa de alfaiataria com colarinho firme e corte regular. Essencial masculino com acabamento superior.',
     stock:{PP:0, P:5, M:8, G:7, GG:5}},

    {id:10, name:'Blazer Estruturado Homme', category:'Homme', price:389.90,
     tag:'Novo', isNew:true, featured:false,
     ph:'linear-gradient(155deg,#E9E7E1,#F1EFE9 70%)',
     desc:'Blazer masculino de dois botões com lapela clássica e forro completo. Presença e rigor de acabamento.',
     stock:{PP:0, P:2, M:5, G:4, GG:3}},

    {id:11, name:'Vestido Tubinho Icône', category:'Vestidos', price:319.90,
     tag:null, isNew:false, featured:false,
     ph:'linear-gradient(145deg,#F0E5DE,#F5EFE6 60%,#EAE1CB)',
     desc:'Tubinho de modelagem anatômica com decote quadrado. O pretinho clássico reinterpretado pela EV.',
     stock:{PP:2, P:4, M:6, G:2, GG:1}},

    {id:12, name:'Colete Alfaiataria Or', category:'Alfaiataria', price:249.90,
     tag:'Mais vendido', isNew:false, featured:false,
     ph:'linear-gradient(190deg,#EFE8D8,#F4F0E7 55%,#E9E5DB)',
     desc:'Colete de alfaiataria com botões dourados e recortes de acinturamento. Versátil para sobreposições elegantes.',
     stock:{PP:3, P:5, M:7, G:4, GG:2}}
  ];

  const SIZES = ['PP','P','M','G','GG'];
  const BRL = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const img = (id, pos=1) => `img/${id}-${pos}.jpg`;
  const byId = id => PRODUCTS.find(p => p.id === Number(id));

  /* Tom de cada swatch na página do produto. Nomes ausentes caem no tom neutro. */
  const SWATCH_COLORS = {Noir:'#141216', Champagne:'#D6BC8A', 'Off-White':'#EDE8DE'};
  const swatchColor = name => SWATCH_COLORS[name] || '#C9C2B4';

  /* HTML de foto com fallback automático para o placeholder gradiente.
     Produtos com `colors` usam a foto da primeira cor como imagem padrão. */
  const photoHtml = (p, cls, label='fotografia da peça') => {
    const src = p.colors ? Object.values(p.colors)[0] : img(p.id,1);
    return `<img class="${cls}" src="${src}" alt="${p.name}" loading="lazy"
       style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"
       onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
     <div class="${cls}" style="position:absolute;inset:0;place-items:center;background:${p.ph};display:none">${label}</div>`;
  };

  /* Carrinho persistente (localStorage) compartilhado entre as páginas */
  const CART_KEY = 'ev_cart';
  const cart = {
    get(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || [] }catch{ return [] } },
    set(c){ try{ localStorage.setItem(CART_KEY, JSON.stringify(c)) }catch{} },
    add(item){
      const c = cart.get();
      const product = byId(item.id);
      const maxQty = Math.min(10, (product && product.stock && product.stock[item.size]) || 10);
      const same = c.find(i => i.id===item.id && i.color===item.color && i.size===item.size);
      if(same) same.qty = Math.min(maxQty, same.qty + item.qty);
      else c.push({...item, qty: Math.min(maxQty, item.qty)});
      cart.set(c);
      return cart.count();
    },
    count(){ return cart.get().reduce((s,i)=>s+i.qty,0) }
  };

  /* Liga o botão da sacola no header: contador real + navegação */
  function initHeaderCart(){
    const btn = document.querySelector('.cart-button');
    const count = document.getElementById('cartCount');
    if(!btn || !count) return;
    const n = cart.count();
    count.textContent = n;
    btn.setAttribute('aria-label', `Sacola de compras, ${n} ${n===1?'item':'itens'}`);
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => location.href = 'elegant-vision-sacola.html');
  }

  return { PRODUCTS, SIZES, BRL, img, byId, photoHtml, swatchColor, cart, initHeaderCart };
})();
