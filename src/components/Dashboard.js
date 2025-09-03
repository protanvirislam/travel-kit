
import "../index.css";

export default function Dashboard({ allItems, setAllItems }) {
  const checkedItem = allItems.filter((i) => i.isChecked === true);

  const getParcent = checkedItem.length * (100 / allItems.length);

  function handleSorting(e) {
    if (e.target.value === "quantity") {
      allItems.sort((a, b) => a.quantity - b.quantity);
    } else if (e.target.value === "name") {
      allItems.sort((a, b) => {
        const nameA = a.item.toUpperCase(); // ignore upper and lowercase
        const nameB = b.item.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }

    localStorage.setItem("items", JSON.stringify(allItems));
    setAllItems(JSON.parse(localStorage.getItem("items")));
  }

  function handleChecked(e) {
    const isChecked = e.target.checked;
    const checkedItem = e.target.parentElement.children[2].textContent.trim();

    allItems.forEach((item) => {
      if (item.item === checkedItem) {
        item.isChecked = isChecked;
      }
    });
    localStorage.setItem("items", JSON.stringify(allItems));
    setAllItems(JSON.parse(localStorage.getItem("items")));
  }

  function handleRemoveItem(e) {
    const removeItem =
      e.target.parentElement.children[0].children[2].textContent.trim();

    const newItems = allItems.filter((item) => item.item !== removeItem);

    localStorage.setItem("items", JSON.stringify(newItems));
    setAllItems(JSON.parse(localStorage.getItem("items")));
  }

  function handleAllClear() {
    localStorage.removeItem("items");
    setAllItems([]);
  }

  return (
    <div>
      <main className="dashboard">
        <ul className="item-list">
          {allItems.map((item) => (
            <li className="item">
              <label className="item-row">
                <input
                  onChange={handleChecked}
                  type="checkbox"
                  className="is-complete"
                  aria-label={`Mark ${item.item} complete`}
                  value={item.item}
                  checked={item.isChecked}
                />
                <span className="qty">{item.quantity}</span>
                <span className={item.isChecked ? "name checked-item" : "name"}>
                  {item.item}
                </span>
              </label>

              <button
                onClick={handleRemoveItem}
                className="close"
                aria-label={`Remove ${item.item}`}
              >
                ⛔
              </button>
            </li>
          ))}
        </ul>

        <div className="filter-btns">
          <div className="sort">
            <select onChange={handleSorting} id="sort-item" name="sort-item">
              <option value="">Sort By Input Order</option>
              <option value="quantity">Quantity</option>
              <option value="name">Name</option>
            </select>
          </div>

          <button onClick={handleAllClear} className="clear-all">
            Clear List
          </button>
        </div>
      </main>

      <footer className="notification">
        <p className="message">
          🧺You have {allItems.length} items on your list, and you already
          packed {checkedItem.length} ({ allItems > 0  && checkedItem > 0 ? Math.floor(getParcent): "0"}%)
        </p>
      </footer>
    </div>
  );
}
