essa é o codigo de um exemplo da pagina Home da aplicação:

```html
<!DOCTYPE html>

<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&amp;family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&amp;family=Geist:wght@100..900&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-tint":"#e9c349","outline-variant":"#4d4635","inverse-primary":"#735c00","on-error-container":"#ffdad6","primary":"#f2ca50","surface-container-high":"#282a2e","on-secondary-fixed-variant":"#3c475a","background":"#111317","on-primary-container":"#554300","secondary-fixed":"#d7e3fa","on-secondary":"#253142","surface-container-lowest":"#0c0e12","on-secondary-container":"#aab6cb","on-tertiary-fixed-variant":"#44474d","on-primary-fixed-variant":"#574500","on-primary-fixed":"#241a00","surface":"#111317","surface-container":"#1e2024","on-secondary-fixed":"#101c2c","tertiary":"#cdced7","surface-bright":"#37393e","surface-variant":"#333539","inverse-on-surface":"#2f3035","surface-container-low":"#1a1c20","error-container":"#93000a","on-surface-variant":"#d0c5af","tertiary-fixed":"#e1e2ea","primary-container":"#d4af37","tertiary-container":"#b1b3bb","primary-fixed-dim":"#e9c349","surface-container-highest":"#333539","error":"#ffb4ab","on-error":"#690005","on-tertiary-container":"#42454c","surface-dim":"#111317","secondary-container":"#3c475a","secondary":"#bbc7dd","secondary-fixed-dim":"#bbc7dd","on-tertiary":"#2d3037","on-primary":"#3c2f00","primary-fixed":"#ffe088","on-tertiary-fixed":"#191c22","tertiary-fixed-dim":"#c4c6ce","on-surface":"#e2e2e8","outline":"#99907c","inverse-surface":"#e2e2e8","on-background":"#e2e2e8"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"spacing":{"container-max":"1440px","xl":"80px","sidebar-width":"320px","base":"4px","lg":"48px","md":"24px","xs":"8px","sm":"16px"},"fontFamily":{"headline-md":["\"Source Serif 4\""],"display-lg-mobile":["\"Source Serif 4\""],"label-caps":["JetBrains Mono"],"headline-sm":["Geist"],"card-title":["\"Source Serif 4\""],"body-md":["Geist"],"display-lg":["\"Source Serif 4\""],"body-lg":["Geist"]},"fontSize":{"headline-md":["24px",{"lineHeight":"32px","fontWeight":"600"}],"display-lg-mobile":["32px",{"lineHeight":"38px","fontWeight":"700"}],"label-caps":["12px",{"lineHeight":"16px","letterSpacing":"0.1em","fontWeight":"500"}],"headline-sm":["18px",{"lineHeight":"24px","letterSpacing":"0.05em","fontWeight":"600"}],"card-title":["14px",{"lineHeight":"18px","fontWeight":"600"}],"body-md":["14px",{"lineHeight":"20px","fontWeight":"400"}],"display-lg":["40px",{"lineHeight":"48px","letterSpacing":"-0.02em","fontWeight":"700"}],"body-lg":["16px",{"lineHeight":"24px","fontWeight":"400"}]}}}}</script></head><body class="bg-background font-body-md text-on-background"><aside class="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container border-r border-outline-variant/10 z-50 flex flex-col pt-md"><div class="px-md mb-lg"><h1 class="font-display-lg text-primary text-display-lg tracking-tighter">Proxy Forge</h1><p class="font-label-caps text-on-surface-variant text-label-caps mt-base">Arcane Toolset</p></div><nav class="flex-1 px-sm flex flex-col gap-xs" data-active-classes="bg-primary-container text-on-primary-container font-bold"><a class="flex items-center gap-sm px-sm py-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="card-search" href="#"><span class="material-symbols-outlined">search</span><span class="font-headline-sm text-headline-sm">Busca de Cartas</span></a><a class="flex items-center gap-sm px-sm py-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="my-lists" href="#"><span class="material-symbols-outlined">auto_stories</span><span class="font-headline-sm text-headline-sm">Minhas Listas</span></a><a aria-current="page" class="flex items-center gap-sm px-sm py-xs rounded-xl transition-all bg-primary-container text-on-primary-container font-bold" data-path="print-tools" href="#"><span class="material-symbols-outlined">print</span><span class="font-headline-sm text-headline-sm">Ferramentas de Impressão</span></a><a class="flex items-center gap-sm px-sm py-xs rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="settings" href="#"><span class="material-symbols-outlined">settings</span><span class="font-headline-sm text-headline-sm">Configurações</span></a></nav><div class="p-md border-t border-outline-variant/10"><div class="bg-surface-container-high p-sm rounded-xl flex items-center justify-between"><span class="font-label-caps text-primary text-label-caps">9/9 CARDS</span><span class="material-symbols-outlined text-primary">bolt</span></div></div></aside><div class="pl-sidebar-width"><header class="fixed top-0 left-sidebar-width right-0 h-16 bg-background/80 backdrop-blur-xl z-40 flex items-center justify-end px-xl"><div class="flex items-center gap-md"><div class="text-right hidden sm:block"><p class="font-card-title text-on-surface text-card-title">Planeswalker</p><p class="font-label-caps text-on-surface-variant text-label-caps">Spark Active</p></div><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main class="relative pt-16 min-h-screen bg-background"><div class="flex flex-col w-full h-full relative overflow-hidden bg-background">
<!-- Main Content Area -->
<div class="flex flex-1 w-full h-full overflow-hidden">
<!-- Print Canvas Workspace -->
<div class="flex-1 h-full overflow-y-auto relative flex items-center justify-center p-xl">
<!-- Background Decoration (Subtle glow behind paper) -->
<div class="absolute inset-0 pointer-events-none overflow-hidden">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1000px] bg-primary/5 rounded-full blur-[120px]"></div>
</div>
<!-- The A4 Paper Prototype -->
<div class="relative bg-white shadow-2xl transition-all duration-300 ease-in-out" id="print-canvas" style="width: 210mm; height: 297mm; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
<!-- Cut Lines Layer (Toggled via JS) -->
<div class="absolute inset-0 pointer-events-none opacity-50 z-10 transition-opacity duration-300" id="cut-lines-layer">
<!-- Horizontal Cut Lines -->
<div class="absolute w-full h-px border-t border-dashed border-gray-400 top-[15mm]"></div>
<div class="absolute w-full h-px border-t border-dashed border-gray-400 top-[103mm]"></div>
<div class="absolute w-full h-px border-t border-dashed border-gray-400 top-[191mm]"></div>
<div class="absolute w-full h-px border-t border-dashed border-gray-400 top-[279mm]"></div>
<!-- Vertical Cut Lines -->
<div class="absolute h-full w-px border-l border-dashed border-gray-400 left-[15mm]"></div>
<div class="absolute h-full w-px border-l border-dashed border-gray-400 left-[75mm]"></div>
<div class="absolute h-full w-px border-l border-dashed border-gray-400 left-[135mm]"></div>
<div class="absolute h-full w-px border-l border-dashed border-gray-400 left-[195mm]"></div>
</div>
<!-- Card Grid Container -->
<div class="absolute inset-0 p-[15mm] grid grid-cols-3 grid-rows-3 gap-[2mm] z-0">
<!-- Proxies (9 per page max in this layout) -->
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a classic Magic the Gathering artifact card, dark intricate mechanical design with glowing amber accents, set against a pristine white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAMe1ZLjnmGkRnI776dMxmluU6mEM1qI_BAJ1g8Vss5eU367aBBYyK2h6ETAt15qhALaUZtM5Z28Xc7KZ5i0wnLohPAz7G_beubJLwXFPCF7YQE1ZZIJtGKIYS4LSd7Y-wY-p3NJCqrQsxdbkFCXw9bHrieR0_witMBhyGNFfqN1a-swOMiJk5gF4uDVcKNs6lkMbLT6WcE8TtPjO511caFh5t13dhsVR1lruorPKARXU1PL8pV7hb"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a blue spell card, swirling ethereal magic effects in azure and deep sea colors, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbuXml5pR82ftjXWpIqADpSoCvFyOC-_sELy1-U8q-x66jOQWZz7vmJyUI4uuujIAjjTHfZUgEC3IALFeVur8PJkSNjcWxAebz6mrUV_6O8Ka6s-92QPDUtzgxm539geXdP-SnxgQw79qfnvXyqQbuN6be40JUR06d_G_nHAElNHMUkaUZlACpB8RkNn3HFSXaV6k2X55Xv3QuhEWoeKISeJPF1meemDtV5wrkGiiFbFVu6Fy1RS6s"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a green creature card, fierce beast emerging from a lush dark forest, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjtShpyfWAYiondAwSEbxsItJQwUqQVkQ14CA1Q0cxO5l1lwtDP_rg5Q7kYzzfAEmEPLOgnL5HR5S7hSbYVzGA9B6lp-X4hwg6e5O5VNb1FAhjzPAjBEHNxR8IoAr3o6khXY3ks5l5fI5nzXvIC4nHHfHfJP5EgX0ZAyx2rpW-WxZRpWV05CxgpxBsRgtq8g0Y89ag6wYiwFjZYhXgp0zw53XISbLKv1ls1hnOQrUW_z0oAYVGszFh"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a red enchantment card, volcanic fire and molten lava textures, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx4fikGBh3zo2Hc-bqZkahQAdJ04PtBthl1W2kZVyY3GggIdT2XwmbysCL0mwPeeVERe1Ghrw9lTmnx2LwI1Sw5H4usvXqRuOfBF_S4eMT6FguM14srFLolzGI4WIC-_jezG3oSjCMsN987hB03qRJxJ5KPgifDomdO0Pn7DVvLRNhz3PFfIDYSfDLXuyiMqImMkgh12GQicm2Ct_c8-6j8hPrzbvaAsZ2YmuHyyoXmxOgrWeqcll3"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a black sorcery card, necromantic shadows and skull motifs, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPFkBqcB-eDhN6MdKh5w0kNgOCSwQ4-e2QAzX1wTjLPCPQ2bqwzXWxr3SQnF_iv21Z7eEl-uRr-O-ceYw66rvfOC8yc81jj4nwTR7LJW57HV2vb5SDUwoV2lPif8lyXXWdG9Qb1vQTYBcgoigsMfZJ-FrIlwGzOw-8YHnktO48h9n3BlWVn45VAlmSsy9vGZmUYNY36aasxCiFGl7op_d4MqOnPpIQQpp3Z7XMwHkaVMASRd6NSfBK"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a white planeswalker card, radiant light and holy armor, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXlu6_aPi003vAcGRL801oXi_vlrM5J73lPdIc2I0haYpW8a4Fp73x975eG8eQTHFIW2W2Jp7r8V194uYQ8S7QSPKo0Cfr4uvxCmuhdeUJM1NvjUKFyEAyCZAU6tSE38MYIonv4C4wNJhead-w9j4Xxe76qN_SAsnL822uLRyMxmC9FYA0RuyUNR0akk99hSgiLqNt0S5JGyo9bwPowdZOju_Y-WC_PpPfhMBzwdrtB4kb_384fnxy"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a rare land card, sprawling ancient ruin landscape, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXC7a7zFb7sHF2BCBR6TPIgnvHZWJlpQKM_pazhHqYWi2n4q-SZL_ldi54u7ACyEejcMaoh9dgqGNfMAmrbaMKQJgmSQyOgB4jQtBcb11RQbI4DQ8Hm-Us24s5uavkmn73Ib_2IScDProIPFxPsi55EtyGeu7xJeXxQg7IYNLkEFL6X7x8c_QkJE-Dxhu2Ux9GAY8x0IUVeeH1B5PQ-fOvCn76EImvEqq0rmP5G6ZOoFsLuO2S2Abb"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative">
<img class="w-full h-full object-cover" data-alt="High resolution scan of a legendary creature card, majestic dragon in flight over jagged peaks, white border." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZM64aFcSoWv_xF1g71mRZCt62szMe4FfTs2r1q8BrFj94A3tjzRWK-We0-O52HGVyB2f37KuPqDBeELTyYE2XsiX_yebfDjWEqRfcB9WKOqYa2TQHMIeozbLfNmBqFVXQJ2rnYUGB4NoJUPNBeX58XqUmCqo9AnedDDEEXDn4RjZ1O5CfQBXYmW_NhkVc2rtiEBM-lI9ParklTB5vG7G4aILtI0JwTa_0lByiWaq5CPUnuxBf_pbo"/>
</div>
<div class="w-[63mm] h-[88mm] bg-gray-200 overflow-hidden relative flex items-center justify-center bg-gray-100">
<!-- Empty slot visualization -->
<div class="text-gray-400 flex flex-col items-center opacity-50">
<span class="material-symbols-outlined text-[32px] mb-xs">add_box</span>
<span class="font-label-caps text-[10px] tracking-widest text-gray-500">SLOT VAZIO</span>
</div>
</div>
</div>
</div>
</div>
<!-- Floating Control Panel (Right Side) -->
<div class="absolute right-md top-md bottom-md w-[320px] bg-surface-container/90 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col pointer-events-auto border border-outline-variant/20 z-20">
<!-- Header -->
<div class="p-md border-b border-outline-variant/20">
<h2 class="font-headline-sm text-headline-sm text-on-surface">Configuração de Impressão</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-xs">Ajuste os parâmetros antes de exportar o documento final.</p>
</div>
<!-- Scrollable Controls -->
<div class="flex-1 overflow-y-auto p-md flex flex-col gap-lg">
<!-- Format Selection -->
<div class="flex flex-col gap-sm">
<label class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Formato do Papel</label>
<div class="grid grid-cols-2 gap-xs">
<button class="bg-primary/10 text-primary font-card-title text-card-title py-sm rounded-lg border border-primary/30 hover:bg-primary/20 transition-colors flex flex-col items-center justify-center gap-xs">
<span class="material-symbols-outlined text-[24px]">description</span>
<span>A4</span>
</button>
<button class="bg-surface-variant text-on-surface-variant font-card-title text-card-title py-sm rounded-lg hover:bg-surface-bright transition-colors flex flex-col items-center justify-center gap-xs">
<span class="material-symbols-outlined text-[24px]">insert_page_break</span>
<span>Letter</span>
</button>
</div>
</div>
<!-- Toggles -->
<div class="flex flex-col gap-md">
<label class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Guias Visuais</label>
<div class="flex items-center justify-between p-sm bg-surface-variant rounded-lg">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-on-surface-variant">content_cut</span>
<span class="font-body-md text-body-md text-on-surface">Linhas de Corte</span>
</div>
<button class="w-12 h-6 bg-primary rounded-full relative transition-colors duration-300 focus:outline-none" id="toggle-cutlines">
<div class="absolute left-[2px] top-[2px] w-5 h-5 bg-on-primary rounded-full transform translate-x-6 transition-transform duration-300 shadow-sm" id="toggle-thumb"></div>
</button>
</div>
<div class="flex items-center justify-between p-sm bg-surface-variant rounded-lg">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-on-surface-variant">margin</span>
<span class="font-body-md text-body-md text-on-surface">Forçar Margem Segura</span>
</div>
<button class="w-12 h-6 bg-surface-container-highest rounded-full relative transition-colors duration-300 focus:outline-none">
<div class="absolute left-[2px] top-[2px] w-5 h-5 bg-on-surface-variant rounded-full transition-transform duration-300 shadow-sm"></div>
</button>
</div>
</div>
<!-- Margins Slider -->
<div class="flex flex-col gap-sm">
<div class="flex justify-between items-end">
<label class="font-label-caps text-label-caps text-primary tracking-widest uppercase">Espaçamento Entre Cartas</label>
<span class="font-label-caps text-label-caps text-on-surface-variant">2mm</span>
</div>
<input class="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" max="5" min="0" type="range" value="2"/>
</div>
<!-- Info Box -->
<div class="bg-surface-container-lowest p-sm rounded-lg flex gap-sm items-start border border-outline-variant/10">
<span class="material-symbols-outlined text-primary text-[20px] mt-[2px]">info</span>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">
                         As imagens serão redimensionadas para o padrão oficial (63x88mm) a 300 DPI.
                     </p>
</div>
</div>
<!-- Footer / Action -->
<div class="p-md bg-surface-container border-t border-outline-variant/20">
<button class="w-full bg-primary text-on-primary font-headline-sm text-headline-sm py-sm px-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-sm shadow-lg shadow-primary/20">
<span class="material-symbols-outlined">picture_as_pdf</span>
                    Exportar PDF (9 Cartas)
                </button>
</div>
</div>
</div>
</div>
<script>
    // Simple toggle logic for cut lines
    document.addEventListener('DOMContentLoaded', () => {
        const toggleBtn = document.getElementById('toggle-cutlines');
        const toggleThumb = document.getElementById('toggle-thumb');
        const cutLinesLayer = document.getElementById('cut-lines-layer');
        let isCutLinesEnabled = true;

        if(toggleBtn && toggleThumb && cutLinesLayer) {
            toggleBtn.addEventListener('click', () => {
                isCutLinesEnabled = !isCutLinesEnabled;
                
                if(isCutLinesEnabled) {
                    toggleBtn.classList.replace('bg-surface-container-highest', 'bg-primary');
                    toggleThumb.classList.replace('bg-on-surface-variant', 'bg-on-primary');
                    toggleThumb.classList.add('translate-x-6');
                    cutLinesLayer.classList.remove('opacity-0');
                    cutLinesLayer.classList.add('opacity-50');
                } else {
                    toggleBtn.classList.replace('bg-primary', 'bg-surface-container-highest');
                    toggleThumb.classList.replace('bg-on-primary', 'bg-on-surface-variant');
                    toggleThumb.classList.remove('translate-x-6');
                    cutLinesLayer.classList.remove('opacity-50');
                    cutLinesLayer.classList.add('opacity-0');
                }
            });
        }
    });
</script></main></div></body></html>

```

o padrão de cores e fontes usados na impressão do documento podem ser encontrados em: `specs/DESIGN.md`
