const form=document.querySelector('#resource-form');
const list=document.querySelector('#resources');
const empty=document.querySelector('#empty');
const search=document.querySelector('#search');
let resources=JSON.parse(localStorage.getItem('openstudy-resources')||'[]');
function save(){localStorage.setItem('openstudy-resources',JSON.stringify(resources));render();}
function render(){
 const term=search.value.toLowerCase();
 list.innerHTML='';
 const filtered=resources.filter(r=>(r.title+' '+r.category+' '+r.url).toLowerCase().includes(term));
 empty.style.display=filtered.length?'none':'block';
 filtered.forEach(r=>{
  const row=document.createElement('div');row.className='resource';
  const info=document.createElement('div');
  const title=document.createElement('strong');title.textContent=r.title;
  const link=document.createElement('div');const a=document.createElement('a');a.href=r.url;a.textContent=r.url;a.target='_blank';a.rel='noopener noreferrer';link.append(a);
  const meta=document.createElement('div');meta.className='meta';meta.textContent=r.category||'Uncategorized';
  info.append(title,link,meta);
  const btn=document.createElement('button');btn.className='delete';btn.textContent='Delete';btn.onclick=()=>{resources=resources.filter(x=>x.id!==r.id);save();};
  row.append(info,btn);list.append(row);
 });
}
form.addEventListener('submit',e=>{e.preventDefault();const title=document.querySelector('#title').value.trim(),url=document.querySelector('#url').value.trim(),category=document.querySelector('#category').value.trim();resources.unshift({id:crypto.randomUUID(),title,url,category});form.reset();save();});
search.addEventListener('input',render);render();
