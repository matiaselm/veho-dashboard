import React from 'react';

const styles = {
    card: {
        backgroundColor: '#eee',
        margin: 5,
        padding: 10,
        maxWidth: 500,
        flexDirection: 'column',
        elevation: 10,
        borderRadius: 10,
        border: '1px solid black'
    }
}

const Box = ({ image_url, onPressRemove, onPressModify, children, style }) => {
    return <div style={{ ...styles.card, ...style }}>
        { image_url && <img src={image_url} alt={image_url} style={{ maxWidth: 300 }}/>}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 3 }}>{children}</div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {onPressModify && <button onClick={onPressModify}>Modify</button>}               
                {onPressRemove && <button onClick={onPressRemove}>Remove</button>}
            </div>
        </div>
        
    </div>
}

export default Box;