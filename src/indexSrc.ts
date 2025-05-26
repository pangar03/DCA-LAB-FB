import styles from './indexSrc.css';

import SongList from "./components/songList/songList";
import './components/songList/songList';

import Storage from "./utils/storage";

import { addSong, getSongs } from "./utils/firebase";

const songData = {
	songtitle: '',
    autor: '',
    dateadded: '',
    image: '',
    album: '',
    duration: '',
}

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
	}

	async connectedCallback() {
		const songs = await getSongs();
		console.log('Songs from Constructor',songs);
		Storage.set('songs', {songs});
		this.render();
	}

	changeTitle(e: any) {
		songData.songtitle = e.target.value;
	}

	changeAutor(e: any){
		songData.autor = e.target.value;
	}

	changeAlbum(e: any){
		songData.album = e.target.value;
	}

	changeImage(e: any){
		songData.image = e.target.value;
	}

	changeDuration(e: any){
		const duration = Number(e.target.value);
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		songData.duration = `${minutes}:${seconds}`;
	}

	async submitForm() {
		songData.dateadded = new Date().toISOString();
		addSong(songData);
		const newSongs = await getSongs();
		console.log('New Songs from submitform', newSongs);
		Storage.set('songs',{newSongs});
	}

	render(){
		if(this.shadowRoot) {
			const title = this.ownerDocument.createElement('h1');
			title.textContent = 'My Playlist';
			this.shadowRoot.appendChild(title);

			// Forms for saving songs
			const formContainer = this.ownerDocument.createElement('section');

			const sName = this.ownerDocument.createElement('input');
			sName.placeholder = "Title";
			sName.addEventListener('change', this.changeTitle);
			formContainer.appendChild(sName);
			
			const sAutor = this.ownerDocument.createElement('input');
			sAutor.placeholder = "Author";
			sAutor.addEventListener('change', this.changeAutor);
			formContainer.appendChild(sAutor);
			
			const sAlbum = this.ownerDocument.createElement('input');
			sAlbum.placeholder = "Album";
			sAlbum.addEventListener('change', this.changeAlbum);
			formContainer.appendChild(sAlbum);

			const sDuration = this.ownerDocument.createElement('input');
			sDuration.placeholder = "Duration (in seconds)";
			sDuration.type = "number";
			sDuration.min = "0";
			sDuration.addEventListener('change', this.changeDuration);
			formContainer.appendChild(sDuration);
			
			const sImage = this.ownerDocument.createElement('input');
			sImage.placeholder = "Image URL";
			sImage.addEventListener('change', this.changeImage);
			formContainer.appendChild(sImage);

			const save = this.ownerDocument.createElement('button');
			save.textContent = "Save Song";
			save.addEventListener('click', this.submitForm);
			formContainer.appendChild(save);

			this.shadowRoot.appendChild(formContainer);

			// Song List Component
			const songList = this.ownerDocument.createElement('song-list') as SongList;
			this.shadowRoot.appendChild(songList);

			// Styles
			const css = this.ownerDocument.createElement('style');
			css.innerHTML = styles;
			this.shadowRoot.appendChild(css);
		}
	}
}

customElements.define('app-container', AppContainer);