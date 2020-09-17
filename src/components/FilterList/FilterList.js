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
            <h3>Select an effect:</h3>
            <ul className="FilterList-menu">
                {filters.map((filter) => {
                    const selected = filter === activeFilter;
                    return (
                        <li key={filter}>
                            <input
                                type="radio"
                                id={filter}
                                name={filter}
                                value={filter}
                                onChange={changeFilter}
                                checked={selected}
                            />
                            <label for={filter}>{filter}</label>
                        </li>
                    );
                })}
            </ul>
            <h3>Increase/Decrease effect:</h3>
            <div className="FilterList-value">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={changeValue}
                />
                <span>{value}%</span>
            </div>
        </div>
    );
};

export default FilterList;
