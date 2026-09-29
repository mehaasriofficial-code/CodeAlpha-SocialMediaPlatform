const API='/api';
function token(){return localStorage.getItem('token')}
function headers(){return token()?{'Content-Type':'application/json','Authorization':'Bearer '+token()}: {'Content-Type':'application/json'}}
function saveAuth(data){localStorage.setItem('token',data.token);localStorage.setItem('user',JSON.stringify(data.user));}
function currentUser(){try{return JSON.parse(localStorage.getItem('user'))}catch{return null}}

function setupNav(){
 const nav=document.getElementById('nav'); if(!nav)return;
 const u=currentUser();
 nav.innerHTML=u?`<a href="/">Home</a><a href="profile.html?id=${u.id}">@${u.username}</a><a href="#" onclick="logout()">Logout</a>`:`<a href="login.html">Login</a><a href="register.html">Register</a>`;
 const c=document.getElementById('composer'), a=document.getElementById('authPanel');
 if(c)c.classList.toggle('hidden',!u); if(a)a.classList.toggle('hidden',!!u);
}
function logout(){localStorage.clear();location.href='/'}

async function loadPosts(){
 const box=document.getElementById('posts'); if(!box)return;
 try{
  const r=await fetch(API+'/posts'); const posts=await r.json();
  box.innerHTML=posts.map(p=>`<article class="card"><div class="postHead"><div class="avatar">${(p.author.username||'?')[0].toUpperCase()}</div><div><a class="username" href="profile.html?id=${p.author._id}">@${p.author.username}</a><small class="time">${new Date(p.createdAt).toLocaleString()}</small></div></div><p class="postText">${escapeHtml(p.content)}</p><div class="actions"><button onclick="likePost('${p._id}')">♥ ${p.likes.length}</button><a href="#" onclick="commentPost('${p._id}')">💬 Comment</a></div></article>`).join('')||'<div class="card auth">No posts yet.</div>';
 }catch(e){box.innerHTML='<div class="card">Start the server and connect MongoDB to load posts.</div>'}
}
async function createPost(){const content=document.getElementById('postContent').value.trim();if(!content)return alert('Write something first');const r=await fetch(API+'/posts',{method:'POST',headers:headers(),body:JSON.stringify({content})});if(r.ok){document.getElementById('postContent').value='';loadPosts()}else alert((await r.json()).message)}
async function likePost(id){if(!token())return alert('Please login first');await fetch(API+'/posts/'+id+'/like',{method:'POST',headers:headers()});loadPosts()}
async function commentPost(id){if(!token())return alert('Please login first');const text=prompt('Write your comment:');if(!text)return;await fetch(API+'/comments/post/'+id,{method:'POST',headers:headers(),body:JSON.stringify({text})});alert('Comment added. Open the API/post detail for full comments.')}
async function login(e){e.preventDefault();const msg=document.getElementById('msg');const r=await fetch(API+'/auth/login',{method:'POST',headers:headers(),body:JSON.stringify({email:email.value,password:password.value})});const d=await r.json();if(r.ok){saveAuth(d);location.href='/'}else msg.textContent=d.message}
async function register(e){e.preventDefault();const msg=document.getElementById('msg');const r=await fetch(API+'/auth/register',{method:'POST',headers:headers(),body:JSON.stringify({username:username.value,email:email.value,password:password.value})});const d=await r.json();if(r.ok){saveAuth(d);location.href='/'}else msg.textContent=d.message}
async function loadProfile(){const id=new URLSearchParams(location.search).get('id');const box=document.getElementById('profile');if(!id)return;const r=await fetch(API+'/users/'+id);const u=await r.json();box.innerHTML=`<div class="bigavatar">${u.username[0].toUpperCase()}</div><h1>@${u.username}</h1><p>${escapeHtml(u.bio||'No bio yet.')}</p><div class="stats"><span><b>${u.followers.length}</b>Followers</span><span><b>${u.following.length}</b>Following</span></div>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]})}
setupNav();loadPosts();
