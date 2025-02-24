import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const CategoryFilter = () => {
    const { dispatch } = useContext(GlobalContext);

    const handleCategoryChange = (category: string) => {
        dispatch({ type: "FILTER_BY_CATEGORY", payload: category });
    };

    return (
        <div>
            <h5>Filter by Category</h5>
            <select onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
