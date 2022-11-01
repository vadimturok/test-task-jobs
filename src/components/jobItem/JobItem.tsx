import React, { FC } from "react";
import { JobType } from "../../types/job-type";
import styles from "./jobItem.module.scss";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import moment from "moment";
import { useRouter } from "next/router";

const JobItem: FC<{ job: JobType }> = ({ job }) => {
  const router = useRouter();

  return (
    <div className={styles.jobItem}>
      <div className={styles.jobInfo}>
        <div className={styles.jobWrapper}>
          <div>
            <Image
              className={styles.image}
              width={85}
              height={85}
              alt={job.title}
              src={job.pictures[0]}
            />
          </div>
          <div className={styles.jobDescription}>
            <div
              onClick={() => router.push(`/job/${job.id}`)}
              className={styles.jobTitle}
            >
              {job.title}
            </div>
            <div className={styles.jobAddress}>{job.address}</div>
            <div className={styles.city}>
              <LocationOnIcon />
              <span>Vienna, Austria</span>
            </div>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <BookmarkBorderIcon className={styles.saveIcon} />
          <div className={styles.postedDate}>
            Posted {moment(job.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
