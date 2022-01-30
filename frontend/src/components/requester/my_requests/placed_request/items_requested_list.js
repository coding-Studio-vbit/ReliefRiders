import React from 'react';
const ItemsRequestedList = ({ list, category,styles }) => {
    return (
      <div className={styles.requested}>
        <span className={styles.irItems}>Items Requested</span>
  
        <div className={styles.category}>
          {category.map((cat) => (
            <span
              className={cat[1] === "E" ? styles.catGreen :cat[1] === "R"?styles.catGray:styles.miscColor}
              key={cat}
            >
              {cat}
            </span>
          ))}
        </div>
        <div className={styles.items}>
          {list.map((item) => (
            <div key={item.itemName}>
            <span style={{
                     
                      textOverflow:'ellipsis',
                      overflow:'hidden',
                      whiteSpace:'nowrap'
                    }} >
              {item.itemName} 
            </span>
            <span>{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default ItemsRequestedList  