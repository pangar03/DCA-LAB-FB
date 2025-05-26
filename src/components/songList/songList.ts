import Song, {SongAttribute} from '../song/song';
import '../song/song';
import Storage from '../../utils/storage';
import styles from './songList.css'

class SongList extends HTMLElement {
    songList: any;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.songList = Storage.get('songs', []);
        console.log('SongList', this.songList);
        
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="header-info">
                    <h2>Title</h2>
                    <h2>Album</h2>
                    <h2>Date Added</h2>
                    <h2>Duration</h2>
                </div>
                <div class="song-list"></div>
            `;
            const container = this.shadowRoot.querySelector('.song-list');
            this.songList.songs.forEach((song: any) => {
                const songInstance = this.ownerDocument.createElement('song-item') as Song;
                songInstance.setAttribute(SongAttribute.songtitle, song.songtitle);
                songInstance.setAttribute(SongAttribute.autor, song.autor);
                songInstance.setAttribute(SongAttribute.album, song.album);
                songInstance.setAttribute(SongAttribute.dateadded, song.dateadded);
                songInstance.setAttribute(SongAttribute.duration, song.duration);
                songInstance.setAttribute(SongAttribute.image, song.image);

                container?.appendChild(songInstance);
            });
        }

        const cssSongList = this.ownerDocument.createElement('style');
        cssSongList.innerHTML = styles;
        this.shadowRoot?.appendChild(cssSongList);
    }
};

customElements.define('song-list', SongList);
export default SongList;