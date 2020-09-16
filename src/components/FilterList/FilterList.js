import React, { useState } from "react";
import "./FilterList.scss";

const FilterList = (props) => {
    const filters = [
        "grayscale",
        "sepia",
        "saturate",
        "invert",
        "brightness",
        "contrast",
    ];

    const [activeFilter, setActiveFilter] = useState(filters[0]);
    const [value, setValue] = useState(50);

    const changeFilter = (event) => {
        setActiveFilter(event.target.value);
        props.setFilter(event.target.value);
    };

    const changeValue = (event) => {
        setValue(event.target.value);
        props.setFilterValue(event.target.value);
    };

    return (
        <div className="FilterList">
            <h2>Select an effect to apply to photo: </h2>
            <ul className="FilterList-menu">
                {filters.map((filter) => {
                    const selected = filter === activeFilter;
                    return (
                        <li key={filter}>
                            <label>
                                <input
                                    type="radio"
                                    value={filter}
                                    onChange={changeFilter}
                                    checked={selected}
                                />
                                {filter}
                            </label>
                        </li>
                    );
                })}
            </ul>
            <div className="FilterList-value">
                <input type="range" min="0" max="100" value={value} onChange={changeValue} />
                <span>{value}%</span>
            </div>
        </div>
    );
};

export default FilterList;
