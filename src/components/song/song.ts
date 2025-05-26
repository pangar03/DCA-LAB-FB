import style from './song.css';

export enum SongAttribute {
    'songtitle' = 'songtitle',
    'autor' = 'autor',
    'dateadded' = 'dateadded',
    'image' = 'image',
    'album' = 'album',
    'duration' = 'duration',
}

class Song extends HTMLElement {
    songtitle?: string;
    autor?: string;
    dateadded?: string;
    image?: string;
    album?: string;
    duration?: string;

    static get observedAttributes() {
        return Object.keys(SongAttribute);
    }

    attributeChangedCallback(propName: SongAttribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName) {
            default: 
                this[propName] = newValue ? newValue : undefined;
                break;
        }
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="song-container">
                    <img src="${this.image}" alt="${this.songtitle}">
                    <div class="song__info">
                        <div class="info__title-artist">
                            <h3>${this.songtitle}</h3>
                            <h4>${this.autor}</h4>
                        </div>
                        <h2>${this.album}</h2>
                        <h2>${this.dateadded}</h2>
                        <h2>${this.duration}</h2>
                    </div>
                </div>
            `;
        }

        const cssSong = this.ownerDocument.createElement('style');
        cssSong.innerHTML = style;
        this.shadowRoot?.appendChild(cssSong);
    }
};

customElements.define('song-item', Song);
export default Song;