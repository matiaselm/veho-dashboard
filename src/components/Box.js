import React, { useState, useEffect } from 'react';

const styles = {
    card: {
        backgroundColor: '#ddd',
        margin: 5,
        padding: 10,
        maxWidth: 500,
        flexDirection: 'column'
    }
}

const Box = ({ image_url, onPressRemove, onPressModify, children, style }) => {
    return <div style={{ ...styles.card, ...style }}>
        { image_url && <img src={image_url} alt="image" style={{ maxWidth: 300 }}/>}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 3 }}>{children}</div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <button onClick={onPressModify}>Modify</button>                
                <button onClick={onPressRemove}>Remove</button>
            </div>
        </div>
        
    </div>
}

export default Box;