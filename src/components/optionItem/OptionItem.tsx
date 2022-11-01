import React, { FC } from "react";
import styles from "./optionItem.module.scss";

type OptionItemProps = {
  type: "employment" | "benefit";
  text: string;
};

const OptionItem: FC<OptionItemProps> = ({ text, type }) => {
  return (
    <div
      style={{
        backgroundColor:
          type === "employment"
            ? "rgba(161, 177, 219, 0.317343)"
            : "rgba(255, 207, 0, 0.15)",
        border:
          type === "employment"
            ? "1px solid rgba(85, 105, 158, 0.3)"
            : "1px solid #FFCF00",
        color: type === "employment" ? "#55699E" : "#988B49",
      }}
      className={styles.option}
    >
      {text}
    </div>
  );
};

export default OptionItem;
