import React, { useState } from "react";
import searchTree from "./utils.js/search";
import styles from "./multi-level.module.scss";

const Select = ({ item, checkList, onChange, lang }) => {
  return (
    <>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            onChange(item.id, e.target.checked);
          }}
          checked={checkList && checkList[item.id]}
          tabIndex={-1}
        />
        <span>{item[lang] ? item[lang] : ""}</span>
      </label>
    </>
  );
};
const MultiLevel = ({
  item,
  subCategories,
  lang,
  nodesProp,
  checkList,
  onChange
}) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState(item);
  const cloneOldData = item;
  const [oldData, setOlData] = useState([]);
  const oldDataChange = (data) => {
    setOlData([...oldData, data]);
  };
  const headerSelect = async (e, key) => {
    if (oldData.length !== key + 1) {
      await setData({ [nodesProp]: [e] });
      await setOlData(oldData.filter((item, filterKey) => key >= filterKey));
    }
  };

  return (
    <>
      <div
        className={styles.multiLevelHeader}
        onClick={() => setActive(!active)}
        role="presentation"
      >
        Select Categori
      </div>
      {active && (
        <>
          <input
            onChange={(e) => {
              const search = searchTree(
                cloneOldData[nodesProp],
                nodesProp,
                "name",
                e.target.value
              );
              search !== null
                ? setData({ [nodesProp]: [search] })
                : setData(cloneOldData);
            }}
          />
          {oldData.length > 0 && (
            <ul className={styles.headerList}>
              <li
                onClick={async () => {
                  await setData(cloneOldData);
                  await setOlData([]);
                }}
                role="presentation"
              >
                All
              </li>
              {oldData?.map((e, key) => {
                return (
                  <li
                    onClick={() => {
                      headerSelect(e, key);
                    }}
                    role="presentation"
                  >
                    {e[lang] ? e[lang] : ""}
                  </li>
                );
              })}
            </ul>
          )}
          <MultiLevelItem
            item={data}
            setData={setData}
            lang={lang}
            subCategories={subCategories}
            onChange={onChange}
            checkList={checkList}
            oldData={oldDataChange}
            nodesProp={nodesProp}
          />
        </>
      )}
    </>
  );
};

export function MultiLevelItem({
  item,
  activeLevel,
  setData,
  oldData,
  lang,
  checkList,
  onChange,
  nodesProp
}) {
  const getBranch = (item) => {
    return item.map((item) => {
      return (
        <>
          <li key={item.categoryId} className={item.categoryId}>
            <Select
              item={item}
              lang={lang}
              onChange={onChange}
              checkList={checkList}
            />
            {item[nodesProp]?.length ? (
              <div
                onClick={() => {
                  setData({ [nodesProp]: item[nodesProp] });
                  oldData(item);
                }}
                role="presentation"
              >
                >
              </div>
            ) : (
              ""
            )}
          </li>

          {item[nodesProp] && (
            <MultiLevelItem
              item={item}
              lang={lang}
              setData={setData}
              activeLevel={activeLevel}
              onChange={onChange}
              checkList={checkList}
              oldData={oldData}
              nodesProp={nodesProp}
            />
          )}
        </>
      );
    });
  };

  const getNav = (item) => {
    return (
      <>
        <ul className={styles.multiLevel}>{getBranch(item[nodesProp])}</ul>
      </>
    );
  };

  // return <div>{JSON.stringify(item)}</div>;

  return <>{getNav(item)}</>;
}
export default MultiLevel;
