import React, { Component, PropTypes } from 'react';

import styles from './styles.scss';


export class FileInput extends Component {

    constructor( props ) {
        super( props );
    }

    openFileInput() {
        this.refs.fileInput.click();
    }

    inputFileChanged() {
        
        var oFReader = new FileReader();
        oFReader.readAsDataURL(this.refs.fileInput.files[0]);
        oFReader.addEventListener("load",  (oFREvent) => {
            
            this.props.srcUpdated( oFREvent.target.result );

        }, false);
    }


    render () {

        let src = this.props.src;
        return (
            <div className="file-input-wrapper">
                <input 
                type="file" 
                className="file-input" 
                accept="image/*" 
                ref="fileInput" 
                placeholder="avatar" 
                aria-describedby="file-addon" 
                onChange={ this.inputFileChanged.bind( this )}
                />

                <div className="file-input-preview" 
                    onClick={this.openFileInput.bind(this)}>
                    <img ref="fileInputPreview" 
                    src={src} 
                    title="Browse File" 
                    />
                </div>
                
                <div className="help-text" 
                onClick={this.openFileInput.bind(this)}>
                    Browse...
                </div>
            </div>  
        )  
    }
    
}