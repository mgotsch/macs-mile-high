export default function FilterKey() {

  const markerType = ["activity", "bar", "breakfast", "brewery", "coffeeshop", "park", "restaurant", "store", "sweets"]
  
  return (
    <div className="searchContainer">
      <form>
          <label htmlFor="myInput">All</label>
          <input
            id="myInput"
            type="checkbox"
            onClick={() => this.onFilterChange("ALL")}
            checked={activeFilter.length === filterList.length}
          />
          {}
          <label htmlFor="myInput">All</label>
          <input
            id="myInput"
            type="checkbox"
            onClick={() => this.onFilterChange("ALL")}
            checked={activeFilter.length === filterList.length}
          />
        </form>
    </div>
  );
}