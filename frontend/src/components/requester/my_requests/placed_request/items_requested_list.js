import React from 'react';
const ItemsRequestedList = ({ list, category,styles }) => {
    return (
      <div className={styles.requested}>
        <span className={styles.irItems}>Items Requested</span>
  
        <div className={styles.category}>
          {category.map((cat) => (
            <span
              className={cat[1] === "E" ? styles.catGreen : styles.catGray}
              key={cat}
            >
              {cat}
            </span>
          ))}
        </div>
        <div className={styles.items}>
          {list.map((item) => (
            <span key={item.itemName}>
              {item.itemName} - {item.quantity}
            </span>
          ))}
        </div>
      </div>
    );
  };
export default ItemsRequestedList  