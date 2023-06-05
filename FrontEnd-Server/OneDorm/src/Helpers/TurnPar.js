export function turnfun(e){
    e=e.replaceAll('<p>', "<p class='text-lg my-1 font-extrabold'>");
    e=e.replaceAll('<br>', "");
    e=e.replaceAll('<h2>', "<h2 class='text-2xl my-2 mt-10 font-extrabold'>")
    e=e.replaceAll('<h3>', "<h3 class='text-xl my-2 mt-3 font-extrabold'>")
    e=e.replaceAll('<pre class="ql-syntax" spellcheck="false">',
         '<div class="mockup-code"> <pre data-prefix=">" class="text-warning"><code>')
         e=e.replaceAll('</pre>',
    '</code></pre> </div>')
    return e;

}