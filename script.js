// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile drawer
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
function closeDrawer(){ mobileDrawer.setAttribute('hidden',''); }
if (hamburgerBtn){
  hamburgerBtn.addEventListener('click', () => {
    const hidden = mobileDrawer.hasAttribute('hidden');
    if (hidden) mobileDrawer.removeAttribute('hidden'); else mobileDrawer.setAttribute('hidden','');
  });
}

// Optional headshot fallback: if assets/headshot.jpg exists, use it instead of the illustration
fetch('assets/headshot.jpg', { method: 'HEAD' }).then(r => {
  if (r.ok) {
    const heroImg = document.getElementById('heroImage');
    if (heroImg) heroImg.src = 'assets/headshot.jpg';
    heroImg.alt = 'Portrait of Winnie Kenneth';
    heroImg.style.borderRadius = '18px';
  }
}).catch(()=>{});

// GitHub metadata (stars, updated)
(async function attachGitHubMeta(){
  const username = window.GITHUB_USERNAME || "Whiney001";
  const cards = document.querySelectorAll('[data-repo]');
  if (!cards.length) return;

  for (const card of cards){
    const slug = card.getAttribute('data-repo');
    const starsEl = card.querySelector('.meta-stars');
    const updatedEl = card.querySelector('.meta-updated');

    try{
      const res = await fetch(`https://api.github.com/repos/${username}/${slug}`);
      if (!res.ok) throw new Error('Not found');
      const json = await res.json();
      const stars = json.stargazers_count ?? 0;
      const updated = json.updated_at ? new Date(json.updated_at).toLocaleDateString() : '—';

      if (starsEl) starsEl.textContent = `★ ${stars}`;
      if (updatedEl) updatedEl.textContent = `Updated ${updated}`;
    }catch(e){
      // leave placeholders
    }
  }
})();
