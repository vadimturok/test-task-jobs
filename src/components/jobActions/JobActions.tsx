import React, { FC } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import styles from "./jobActions.module.scss";

const JobActions = () => {
  return (
    <div className={styles.jobDetailsActions}>
      <div className={styles.jobActions}>
        <BookmarkBorderIcon className={styles.actionIcon} />
        <span>Save to my list</span>
      </div>
      <div className={styles.jobActions}>
        <ShareIcon className={styles.actionIcon} />
        <span>Share</span>
      </div>
    </div>
  );
};

export default JobActions;
