import { html, render } from './lib/htm.mjs';

import PageHeader from './components/header.component.mjs';
import PageNav from './components/navbar.component.mjs';
import PageContent from './components/content.component.mjs';

render(html`
    <${PageHeader}/>
    <${PageNav}/>
    <${PageContent}/>
`, document.getElementById("app"));