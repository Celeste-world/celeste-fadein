(function(){
  function renderSiteHeader(){
    const mount = document.getElementById("siteHeader");

    if(!mount){
      return;
    }

    mount.innerHTML = `
      <header class="site-header">
        <a class="brand" href="/">Celeste Harbor</a>

        <nav class="nav" aria-label="メインナビゲーション">
          <button class="nav-parent" type="button" data-menu="log">航海記録</button>
          <button class="nav-parent" type="button" data-menu="items">漂着物</button>
          <button class="nav-parent" type="button" data-menu="map">海図</button>
          <button class="nav-parent" type="button" data-menu="letter">便り</button>
          <button class="nav-parent" type="button" data-menu="help">はじめての方へ</button>
          <button class="nav-parent" type="button" data-menu="account">アカウント</button>
        </nav>

        <div class="subnav" id="subnav" hidden>
          <div class="subnav-panel" data-panel="log">
            <a href="/log/">日々の記録</a>
            <a href="/timeline/">航海年表</a>
            <a href="/voyage-archive/">航海の保管庫</a>
            <a href="/harbor-status/">現在地</a>
          </div>

          <div class="subnav-panel" data-panel="items">
            <a href="/items/">漂着物</a>
            <a href="/vessels/">船</a>
            <a href="/tickets/">切符</a>
          </div>

          <div class="subnav-panel" data-panel="map">
            <a href="/map/">海図</a>
          </div>

          <div class="subnav-panel" data-panel="letter">
            <a href="/harbor-letter/" class="nav-letter-link">便り</a>
          </div>

          <div class="subnav-panel" data-panel="help">
            <a href="/help/">はじめての方へ</a>
            <a href="/help/faq/">よくある質問</a>
            <a href="/help/#login">ログインできないとき</a>
            <a href="/help/#in-app-browser">アプリ内ブラウザについて</a>
          </div>

          <div class="subnav-panel" data-panel="account">
            <a href="/account/">アカウント</a>
            <a href="/billing/">お支払い</a>
            <a href="/pricing/">Harbor Store</a>
            <a href="/legal/">法務情報</a>
            <a href="/legal/terms/">利用規約</a>
            <a href="/legal/privacy/">プライバシーポリシー</a>
            <a href="/legal/commercial-transaction/">特定商取引法に基づく表記</a>
            <a href="#" class="logout-link" id="logoutLink">ログアウト</a>
          </div>
        </div>
      </header>
    `;
  }

  function setupHarborNavigation(){
    const header = document.querySelector(".site-header");
    const subnav = document.getElementById("subnav");
    const parents = document.querySelectorAll(".nav-parent");
    const panels = document.querySelectorAll(".subnav-panel");

    if(!header || !subnav || parents.length === 0){
      return;
    }

    let openMenu = null;

    function closeSubnav(){
      openMenu = null;
      subnav.hidden = true;
      subnav.style.left = "";

      panels.forEach((panel) => {
        panel.style.display = "none";
      });

      parents.forEach((button) => {
        button.classList.remove("is-active");
        button.setAttribute("aria-expanded", "false");
      });
    }

    function positionSubnav(button){
      const headerRect = header.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const viewportPadding = 16;

      // 表示中のパネル幅を実測する
      const activePanel = document.querySelector(
        '.subnav-panel[data-panel="' + button.dataset.menu + '"]'
      );

      // いったん左へ置いて、幅を測れる状態にする
      subnav.style.left = "0px";

      const panelRect = activePanel
        ? activePanel.getBoundingClientRect()
        : subnav.getBoundingClientRect();

      const panelWidth = panelRect.width || 240;

      let left = buttonRect.left - headerRect.left;

      // アカウントメニューだけ右端基準にする
      if(button.dataset.menu === "account"){
        left = buttonRect.right - headerRect.left - panelWidth;
      }

      // 画面左にはみ出さない
      const minLeft = viewportPadding - headerRect.left;

      // 画面右にはみ出さない
      const maxLeft =
        window.innerWidth - viewportPadding - headerRect.left - panelWidth;

      left = Math.max(minLeft, Math.min(left, maxLeft));

      subnav.style.left = left + "px";
    }

    function openSubnav(menuName, button){
      openMenu = menuName;
      subnav.hidden = false;

      panels.forEach((panel) => {
        panel.style.display =
          panel.dataset.panel === menuName ? "flex" : "none";
      });

      parents.forEach((parentButton) => {
        const isActive = parentButton.dataset.menu === menuName;
        parentButton.classList.toggle("is-active", isActive);
        parentButton.setAttribute("aria-expanded", String(isActive));
      });

      positionSubnav(button);
    }

    parents.forEach((button) => {
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("click", (event) => {
        event.stopPropagation();

        const menuName = button.dataset.menu;

        if(openMenu === menuName){
          closeSubnav();
        }else{
          openSubnav(menuName, button);
        }
      });
    });

    subnav.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", () => {
      closeSubnav();
    });

    document.addEventListener("keydown", (event) => {
      if(event.key === "Escape"){
        closeSubnav();
      }
    });

    window.addEventListener("resize", () => {
      closeSubnav();
    });

    closeSubnav();
  }

  async function setupCommonLogout(){
    const logoutLink = document.getElementById("logoutLink");
  
    if(!logoutLink){
      return;
    }
  
    if(window.disableCommonLogout === true){
      return;
    }
  
    logoutLink.addEventListener("click", async (event) => {
      event.preventDefault();
  
      try{
        if(window.client && window.client.auth){
          await window.client.auth.signOut();
        }
  
        location.href = "/";
      }catch(error){
        console.error("logout failed:", error);
        location.href = "/";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderSiteHeader();
    setupHarborNavigation();
    setupCommonLogout();
  });
})();
