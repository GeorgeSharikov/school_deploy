import './index.css'
import {make} from "./makeElement.js";

const SVG_STAR_ICON = `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t width="36.09px" height="36.09px" viewBox="0 0 36.09 36.09" style="enable-background:new 0 0 36.09 36.09;" xml:space="preserve"
\t>
<g>
\t<path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596
\t\ts-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055
\t\tl8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191
\t\tc0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02
\t\tl-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957
\t\tl2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957
\t\tl-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592
\t\tl9.87,1.002L25.336,21.598z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`
export var activeBlocks = []
export const setActiveBlocks = (sortedArray) => {
    activeBlocks = sortedArray
}
export default class ShowInFeed{
    constructor({ api, data, config, block }) {
        this.api = api;
        this.data = data;
        this.config = config;
        this.block = block;
    }

    static get isTune() {
        return true;
    }

    static get CSS() {
        return {
            toggler: 'cdx-text-variant__toggler',
        };
    }
    checkObjectOnId(id){
        for(let ID of activeBlocks){
            if(ID === id){
                return true
            }
        }
        return false
    }
    render(){
        const isActive = this.checkObjectOnId(this.block.id)
        const tuneWrapper = make('div', 'show-container');
        const toggler = make('div', [isActive ? this.api.styles.settingsButtonActive : this.api.styles.settingsButton, ShowInFeed.CSS.toggler], {
            innerHTML: SVG_STAR_ICON
        });
        toggler.dataset.name = "show";
        this.api.tooltip.onHover(toggler, "Вывести в ленте", {
            placement: 'top',
            hidingDelay: 500,
        });
        tuneWrapper.appendChild(toggler);
        this.api.listeners.on(toggler, 'click', (event) => {
                if(isActive || activeBlocks.length !== 2) {
                    if (isActive) {
                        activeBlocks = activeBlocks.filter(id => id !== this.block.id)
                    } else {
                        activeBlocks.push(this.block.id)
                    }
                    const tune = event.target.closest(`div`);
                    const isEnabled = tune.classList.contains(this.api.styles.settingsButtonActive);
                    tune.classList.toggle(this.api.styles.settingsButtonActive, !isEnabled);
                }
        });
        return tuneWrapper;
    }
    save() {
        this.data = [...activeBlocks]
        return this.data || '';
    }
}


