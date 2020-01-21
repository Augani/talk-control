// Import the LitElement base class and html helper function
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import bulmaStyle from '@granite-elements/granite-lit-bulma/granite-lit-bulma';
import { LitElement, html, css } from 'lit-element';

// Extend the LitElement base class
class SlideView extends LitElement {
    static get properties() {
        return {
            url: { type: String, reflect: true, attribute: true },
            delta: { type: String, reflect: true, attribute: true }
        };
    }

    static get styles() {
        return [
            bulmaStyle,
            css`
                iframe,
                section {
                    width: 100%;
                    height: 100%;
                }
            `
        ];
    }

    constructor() {
        super();
        this.url = '';
        this.delta = '0';
    }

    attributeChangedCallback(name, oldval, newval) {
        // For debug purposes - called each time a property value changes
        console.log('attribute change: ', name, newval);
        super.attributeChangedCallback(name, oldval, newval);

        if (newval && (name === 'url' || (this.url && name === 'delta'))) {
            const iframe = this.shadowRoot.querySelector('iframe');
            let src = `${this.url}#delta=${this.delta}`;
            if (this.focus) {
                src += '&focus';
            }
            iframe.src = src;
            iframe.classList.remove('is-hidden');
        }
    }

    render() {
        return html`
            <section>
                <iframe>Current slide</iframe>
            </section>
        `;
    }
}
// Register the new element with the browser.
customElements.define('tc-slide', SlideView);
