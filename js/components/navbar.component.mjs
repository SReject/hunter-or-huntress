import { html } from '../lib/htm.mjs';

const NavLink = (({ children, type, href, icon, cssClass }) => {
    const attrs = { href, 'class': cssClass };
    if (type === 'external') {
        attrs.target = "_blank";
        attrs.rel = "noopener noreferrer"
    }
    return html`
        <a ...${attrs}>
            <div class="icon"><i class="${icon}"></i></div>
            <div class="title">${children}</div>
        </a>
    `;
});

const NavMenu = (({icon, title, children}) => html`
    <div class="menu">
        <div class="heading">
            <div class="icon"><i class="${icon}"></i></div>
            <div class="title">${title}</div>
        </div>
        <ul>
            ${ children.map(child => html`<li>${child}</li>`) }
        </ul>
    </div>
`);

export default (() => html`
    <div class="main-navbar">
        <div class="wrapper">
            <${NavMenu} icon="fa-solid fa-book" title="Works">
                <${NavLink} href="#main-story" type="local" icon="fa-solid fa-book-open">Main Story<//>
                <${NavLink} href="#side-stories" type="local" icon="fa-solid fa-file-lines">Side Stories<//>
                <${NavLink} href="#fan-fictions" type="local" icon="fa-solid fa-file-pen">Fan Fictions<//>
                <${NavLink} href="#fan-art" type="local" icon="fa-solid fa-photo-film">Fan Art<//>
            <//>
            <${NavMenu} icon="fa-solid fa-comment" title="Social">
                <${NavLink} href="https://www.reddit.com/r/Hunter_or_Huntress/" type="external" icon="fa-brands fa-reddit">Reddit<//>
                <${NavLink} href="https://discord.gg/36Rswfztnu" type="external" icon="fa-brands fa-discord">Discord<//>
            <//>
            <${NavLink} href="https://drive.google.com/drive/folders/1sqP9B7Mqh2D1tpboFHqpk6f0284wX-HE" type="external" icon="fa-solid fa-lightbulb" cssClass="heading">Info<//>
            <${NavMenu} icon="fa-solid fa-dollar-sign" title="Donate">
                <${NavLink} href="https://www.patreon.com/HunterOrHuntress" type="external" icon="fa-brands fa-patreon">Patreon<//>
                <${NavLink} href="https://ko-fi.com/tigra" type="external" icon="fa-solid fa-mug-saucer">Ko-fi<//>
            <//>
            <${NavLink} href="#settings" type="local" icon="fa-solid fa-gear" cssClass="heading">Settings<//>
        </div>
    </div>
`);