import React from "react";
import Select from "react-select";
import { DEFAULT_FIELD_LABEL, DEFAULT_FIELD_VALUE } from "../../data";
import { getDocumentTypeNames } from "../../functions";
import styles from "../../index.css";
import { Tooltip } from "react-tippy";

function QuestionIcon() {
  return (
    <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" fill="#999">
      <path d="M50 94.45C25.49 94.45 5.55 74.51 5.55 50S25.49 5.55 50 5.55 94.45 25.49 94.45 50 74.51 94.45 50 94.45zm0-84.9C27.696 9.55 9.55 27.696 9.55 50S27.696 90.45 50 90.45 90.45 72.304 90.45 50 72.304 9.55 50 9.55z" />
      <path d="M49.891 60.037a2.65 2.65 0 01-2.65-2.65v-.274c0-1.259.259-2.391.776-3.396a13.5 13.5 0 011.965-2.833 33.174 33.174 0 012.544-2.543 33.352 33.352 0 002.543-2.544 13.31 13.31 0 001.965-2.848c.518-1.015.777-2.152.777-3.412 0-1.056-.152-2.056-.457-3s-.777-1.761-1.417-2.452c-.639-.69-1.442-1.239-2.406-1.645-.965-.406-2.097-.609-3.396-.609-1.198 0-2.295.244-3.29.731a7.938 7.938 0 00-2.589 2.026c-.731.863-1.31 1.904-1.736 3.122a12.848 12.848 0 00-.569 2.319c-.151.99-1.037 1.702-2.039 1.702a2.08 2.08 0 01-2.05-2.42 16.04 16.04 0 01.835-3.094c.64-1.665 1.513-3.092 2.62-4.28a11.604 11.604 0 013.899-2.757c1.492-.65 3.132-.975 4.919-.975 2.173 0 4.021.325 5.544.975 1.523.65 2.767 1.503 3.732 2.559a9.735 9.735 0 012.102 3.625c.436 1.361.655 2.752.655 4.173 0 1.32-.239 2.513-.716 3.579a14.805 14.805 0 01-1.782 2.986 28.33 28.33 0 01-2.315 2.65 35.839 35.839 0 00-2.315 2.574 14.41 14.41 0 00-1.782 2.772c-.477.975-.716 2.061-.716 3.259v.031a2.651 2.651 0 01-2.651 2.649zm2.65 9.016v.092a2.65 2.65 0 11-5.3 0v-.092a2.65 2.65 0 015.3 0z" />
    </svg>
  );
}
class TypeSection extends React.Component {
  render() {
    const { documents, type, field, fields, handleChange, handleFieldChange } = this.props;

    if (!documents) {
      return (
        <div className={styles.list}>
          <Spinner message="Loading..." center />
        </div>
      );
    }

    const types = getDocumentTypeNames();
    const uniqueTypes = types.map(({ name, title }) => ({
      value: name,
      label: title
    }));

    const chosenType = types.find(({ name }) => name === type.value);

    const uniqueFields = (chosenType ? chosenType.fields : []).map(({ name, title }) => ({
      value: name,
      label: title
    }));

    const showFields =
      uniqueFields.length > 1 && uniqueFields.findIndex(field => field.value === "order") !== -1;

    return (
      <>
        <div className={styles.flexSpaceBetween}>
          <div>
            <h2 className={styles.noTopMargin}>Order Documents</h2>
            <p>Order your documents via drag-and-drop.</p>
          </div>
          <div className={styles.flexEnd}>
            {showFields ? (
              <div className={styles.selectWrapper}>
                <Select
                  className={styles.fieldsSelect}
                  options={uniqueFields}
                  isSearchable
                  onChange={handleFieldChange}
                  defaultValue={{ value: DEFAULT_FIELD_VALUE, label: DEFAULT_FIELD_LABEL }}
                />
                <div>
                  <Tooltip
                    html={
                      <p style={{ margin: "0.75rem", maxWidth: "16rem" }}>
                        Use a custom field to order your attributes. Fields must be hidden and have
                        type "number" to be listed here.
                      </p>
                    }
                    position="right-start"
                    trigger="mouseenter"
                  >
                    <div className={styles.tooltip}>
                      <QuestionIcon />
                    </div>
                  </Tooltip>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <hr />
        <p>
          <strong>Step 1: Choose a Type</strong>
        </p>
        <Select options={uniqueTypes} isSearchable onChange={handleChange} value={type} />
      </>
    );
  }
}

export default TypeSection;
