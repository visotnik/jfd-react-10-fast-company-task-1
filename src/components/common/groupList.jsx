import React from "react";
import PropTypes from "prop-types";

const GroupList = (props) => {
    const {
        items,
        onItemSelect,
        valueProperty,
        contentProperty,
        selectedItem
    } = props;
    // items - может принимать значение array или object
    console.log("items isArray =", Array.isArray(items));
    console.log(Object.keys(items));
    console.log("selectedProf=", selectedItem);
    if (!Array.isArray(items)) {
        const itemsKeys = Object.keys(items);
        return (
            <ul className="list-group">
                {itemsKeys.map((item) => {
                    return (
                        <li
                            key={items[item][valueProperty]}
                            className={
                                "list-group-item" +
                                (items[item] === selectedItem ? " active" : "")
                            }
                            // передаем по onClick объект items[item] целеком
                            // для универсальности
                            onClick={() => onItemSelect(items[item])}
                            role="button"
                        >
                            {items[item][contentProperty]}
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return (
            <ul className="list-group">
                {items.map((item) => {
                    return (
                        <li
                            key={item[valueProperty]}
                            className={
                                "list-group-item" +
                                (item === selectedItem ? " active" : "")
                            }
                            // передаем по onClick объект items[item] целеком
                            // для универсальности
                            onClick={() => onItemSelect(item)}
                            role="button"
                        >
                            {item[contentProperty]}
                        </li>
                    );
                })}
            </ul>
        );
    }
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
